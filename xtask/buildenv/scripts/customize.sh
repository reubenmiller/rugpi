#!/bin/bash

root_dir=$1;

# We remove those files as they are not needed and would cause the build to be non-deterministic.
rm "${root_dir}/etc/hostname"

# Avoid deleting resolv.conf if it is symlink as this is an indication that another
# service like systemd-resolved is managing it
if [ ! -L "${root_dir}/etc/resolv.conf" ]; then
    rm "${root_dir}/etc/resolv.conf"
fi
