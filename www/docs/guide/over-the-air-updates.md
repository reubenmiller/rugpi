---
sidebar_position: 3
---

# Over-the-Air Updates

Rugpi supports robust *over-the-air* (OTA) updates with rollback support to the previous version.
OTA updates comprise the full system including firmware files and the boot configuration.
Rugpi uses an A/B approach ensuring that a working copy of the previous version is always kept.
This approach drastically reduces the likelihood of bricking devices in the field due to corrupted software caused by a failed or incomplete update, thereby reducing any related support effort.
In addition, it has the following advantages:

- OTA updates can almost completely run in the background, without adversely affecting any users of a device.
The only service interruption is caused, when the device reboots into the new version.
Rebooting to finalize an update can happen at the discretion of users and, if all goes well, does not take longer than any normal reboot, minimizing any inconveniences.
- As the previous version is kept, a rollback to the old version is possible if users experience any problems with the new version.[^1]

[^1]: This requires application support.


### A/B Update Scheme

The A/B update scheme uses two sets of system and boot partitions, the A set and the B set.
We call the currently booted set *hot set* and to the other *cold set*.
The usual partition layout of a Rugpi installation comprises seven partitions:

- Partition 1: Contains the [`autoboot.txt`](https://www.raspberrypi.com/documentation/computers/config_txt.html#autoboot-txt) for switching between the A and B set.
- Partition 2: The `/boot` partition of the A set.
- Partition 3: The `/boot` partition of the B set.
- Partition 4: The extended MBR for the additional partitions.
- Partition 5: The root partition of the A set.
- Partition 6: The root partition of the B set.
- Partition 7: Contains any persistent state (see [State Management](./state-management)).

The `autoboot.txt` specifies the default set of partitions.
We call the other, non-default set, the *spare set*.
An update is only possible if the hot set is also the default set.
That way, if anything goes wrong while installing the update, the system will boot into the previous known-good version by default.
The Rugpi update mechanism installs the update to the cold spare set of partitions.
After installing the update, it uses the `tryboot` mechanism of the Raspberry Pi firmware to try booting into the newly installed version, crucially without changing the default set.
Hence, if anything goes wrong, the system automatically reboots into the previous version by default.
Only after booting successfully into the newly installed system, by which the set of partitions with the new version becomes the hot set, and verifying that everything is in working order, the update is made permanent by making the hot set the default set.

## Updating a System

To update a system, first a `.rugpi-system` artifact needs to be [build using Rugpi Bakery](./building-artifacts).
Further, this artifact needs to find its way[^2] onto the Raspberry Pi running Rugpi.
The artifact is then installed to the cold spare set of partitions with:

```shell
rugpi-ctrl update install <path to the artifact>
```

This command will also automatically try rebooting into the new version after it has been installed.
To prevent this from happening, use the `--no-reboot` command line flag.
Note that this command will not make the update permanent in any way.

When using the `--no-reboot` flag, a reboot to the cold spare can later be triggered with:

```shell
rugpi-ctrl system reboot --spare
```

[^2]: How this happens is outside the scope of Rugpi's core functionality.

### Committing an Update

After rebooting into the new version and verifying that everything is in working order, the update is made permanent with:

```shell
rugpi-ctrl system commit
```

Note that this command always makes the hot set of partitions, i.e., the currently booted system, the default set.
Hence, it must be run from within the updated version.
To prevent breaking the system, it is impossible to make the cold set the default set.[^3]

Committing an update is up to the concrete update workflow of the application.
If you want to automatically commit the hot set during the boot process, you may enable the `rugpi-auto-commit` recipe.
Note that this recipe installs an equally named Systemd service which will also commit an old version if booted into with the rollback feature (see bellow).

[^3]: Using the `rugpi-ctrl` command line tool.

### Performing a Rollback

Like updating, performing a rollback is a two-step process.
A full rollback consists of first rebooting into the spare set (containing the previous version) and then committing the rollback after verifying that it is in proper working order.

To boot into the spare set, run:

```shell
rugpi-ctrl system reboot --spare
```

Then, after rebooting, commit the rollback with:

```shell
rugpi-ctrl system commit
```
