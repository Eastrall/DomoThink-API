#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API setup script
#

function log {
  log_type=$1
  message=$2

  echo "\e[32m$log_type: \e[39m$message"
}

function update_packages {
  sudo apt-get update && apt-get upgrade -y
}

function install_tools {

}

log "info" "Starting"

update_packages
install_tools
