#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API update script
#

# define some variables
GREEN='\033[0;32m'
NC='\033[0m' # No Color

#
# Log function
#
function log {
  log_type=$1
  message=$2

  echo -e "${GREEN}${log_type}${NC}: ${message}"
}

function main {
  log "info" "updating DomoThink API..."

  sudo /usr/sbin/service domothink stop

  cd /var/domothink
  git pull origin master # pull from stable release
  cd /var/domothink/api
  sudo npm install # try to update node packages
  sudo npm run-script prestart # compile API

  sudo /usr/sbin/service domothink start

  log "info" "DomoThink API up to date!"
}

##############
# MAIN POINT #
##############

main
