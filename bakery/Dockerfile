FROM debian:bookworm

ARG TARGETPLATFORM

RUN apt-get -y update \
    && apt-get -y install \
        btrfs-progs \
        curl \
        dosfstools \
        fdisk \
        file \
        git \
        gpg \
        mmdebstrap \
        mtools \
        proot \
        python3 \
        python3-venv \
        qemu-system-arm \
        qemu-system-x86 \
        qemu-utils \
        squashfs-tools \
        wget \
        xdelta3 \
        xz-utils \
        zip \
        zsh \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/* \
    && wget -O /etc/zsh/zshrc https://git.grml.org/f/grml-etc-core/etc/zsh/zshrc \
    && touch /root/.zshrc

# Tools required to run build Yocto images with Rugix.
RUN apt-get -y update \
    && apt-get -y install \
        build-essential \
        chrpath \
        cpio \
        debianutils \
        diffstat \
        file \
        gawk \
        gcc \
        git \
        iputils-ping \
        libacl1 \
        libarchive-dev \
        liblz4-tool \
        locales \
        python3 \
        python3-git \
        python3-jinja2 \
        python3-pexpect \
        python3-pip \
        python3-subunit \
        socat \
        texinfo \
        unzip \
        wget \
        xz-utils \
        zstd \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*

RUN cd /tmp \
    && wget https://git.kernel.org/pub/scm/fs/ext2/e2fsprogs.git/snapshot/e2fsprogs-1.47.2.tar.gz \
    && tar -xf e2fsprogs-1.47.2.tar.gz \
    && cd e2fsprogs-1.47.2 \
    && ./configure \
    && make \
    && make install \
    && cd .. \
    && rm -rf e2fsprogs-1.47.2*

RUN curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin

# Add a `build` user for unprivileged builds.
RUN useradd -ms /usr/bin/zsh build
USER build
RUN touch ~/.zshrc
USER root

RUN mkdir -p /usr/share/rugix \
    && cd /usr/share/rugix \
    && wget -O rpi-eeprom-master.zip https://github.com/raspberrypi/rpi-eeprom/archive/refs/heads/master.zip \
    && unzip rpi-eeprom-master.zip \
    && mv rpi-eeprom-master rpi-eeprom \
    && rm -f rpi-eeprom-master.zip

RUN mkdir -p /usr/share/rugix/pi \
    && cd /usr/share/rugix/pi \
    && wget -O rpi-firmware.zip https://github.com/raspberrypi/firmware/archive/refs/heads/stable.zip \
    && unzip rpi-firmware.zip \
    && mv firmware-stable/boot firmware \
    && rm -rf firmware-stable \
    && rm -f firmware/kernel*.img \
    && stat /usr/share/rugix/rpi-eeprom/firmware-2711/old/stable/pieeprom-2023-05-11.bin \
    && stat /usr/share/rugix/rpi-eeprom/firmware-2711/stable/vl805-000138c0.bin \
    && stat /usr/share/rugix/rpi-eeprom/firmware-2712/old/default/pieeprom-2023-10-30.bin

# Properly set up locale, required by some tools.
RUN locale-gen en_US.UTF-8 \
    && sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen \
    && locale-gen

ENV LANGUAGE=en_US.UTF-8 LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

COPY boot /usr/share/rugix/boot
COPY bakery/repositories /usr/share/rugix/repositories
COPY bakery/templates /usr/share/rugix/templates

COPY build/binaries /usr/share/rugix/binaries

WORKDIR /project

RUN if [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
        cp /usr/share/rugix/binaries/x86_64-unknown-linux-musl/rugix-bakery /usr/local/bin; \
        cp /usr/share/rugix/binaries/x86_64-unknown-linux-musl/rugix-bundler /usr/local/bin; \
    elif [ "$TARGETPLATFORM" = "linux/arm64" ] || [ "$TARGETPLATFORM" = "linux/arm64/v8" ]; then \
        cp /usr/share/rugix/binaries/aarch64-unknown-linux-musl/rugix-bakery /usr/local/bin; \
        cp /usr/share/rugix/binaries/aarch64-unknown-linux-musl/rugix-bundler /usr/local/bin; \
    else  \
        echo "Unsupported platform ${TARGETPLATFORM}."; \
        exit 1; \
    fi

ENTRYPOINT ["/usr/local/bin/rugix-bakery"]