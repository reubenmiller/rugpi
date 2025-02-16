#!/bin/bash

set -euo pipefail

gpg --dearmor \
    < "${RECIPE_DIR}/files/raspberrypi.gpg.key" \
    > "${RUGIX_ROOT_DIR}/etc/apt/trusted.gpg.d/raspberrypi-archive-stable.gpg"

chmod 644 "${RUGIX_ROOT_DIR}/etc/apt/trusted.gpg.d/raspberrypi-archive-stable.gpg"
