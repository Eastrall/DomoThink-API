#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API setup script
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

function remove_domothink_service {
  log "info" "Removing DomoThink service..."
  sudo service domothink stop
  sudo forever-service delete domothink
  log "info" "DomoThink service deleted!"
}

function remove_node_js {
  log "info" "Remove Node.js..."
  npm uninstall forever -g
  npm uninstall forever-service -g
  rm -rf /var/run/forever
  sudo apt-get purge -y nodejs
  log "info" "Node.js deleted!"
}

function remove_tools {
  log "info" "Remove tools..."
  sudo apt-get purge -y git
  sudo apt-get purge -y debconf-utils
  sudo apt-get purge -y libstdc++-4.9-dev
  sudo apt-get purge -y libssl-dev
  log "info" "Tools removed!"
}

function remove_mysql_server {
  log "info" "Remove MySQL server..."
  sudo apt-get purge -y mysql-server mysql-client
  log "info" "MySQL server deleted!"
}

function remove_postgresql_server {
  log "info" "Remove PostgreSQL server..."
  log "info" "PostgreSQL server deleted!"
}

function clean_all {
  sudo apt-get autoremove -y
}

log "info" "Uninstalling DomoThink API"

remove_domothink_service
remove_node_js
remove_tools
remove_mysql_server
remove_postgresql_server
clean_all

log "info" "DomoThink API uninstalled!"
