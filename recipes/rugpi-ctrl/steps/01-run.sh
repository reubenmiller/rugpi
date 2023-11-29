#!/bin/bash

set -euo pipefail

cp -rp "/usr/share/rugpi/binaries/${RUGPI_ARCH}/"* "${RUGPI_ROOT_DIR}/usr/bin"
cat >"${RUGPI_ROOT_DIR}/etc/fstab" <<EOF
proc                 /proc           proc    defaults          0       0
EOF
