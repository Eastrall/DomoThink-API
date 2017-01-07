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

#
# Update and upgrade the packages.
#
function update_packages {
  sudo apt-get update && apt-get upgrade -y
}

#
# Install the essential tools for the production environment.
#
function install_tools {
  log "info" "Installing tools..."
  sudo apt-get install -y emacs git debconf-utils htop
  log "done" "Tools are now installed!"
}

#
# Install Node.js.
#
function install_node_js {
  log "info" "Installing node.js..."
  sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo apt-get install -y build-essential
  sudo apt-get install -y nodejs
  log "info" "Node.js installed!"
}

#
# Install MySQL server.
#
function install_mysql_server {
  log "info" "Installing MySQL server..."

  # prepare root user
  export DEBIAN_FRONTEND="noninteractive"
  sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password password_root"
  sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password password_root"

  # install mysql server and client
  sudo apt-get install -y mysql-server mysql-client
  sudo /etc/init.d/mysql stop # stop the service
  sudo mysql -u "root" "-ppassword_root" --bind-address="0.0.0.0"
  sudo /etc/init.d/mysql start # start the service

  log "done" "MySQL installed!"
}

#
# Install PostegreSQL server.
#
function install_postegresql_server {
  log "info" "Installing PostegreSQL server..."
  # TODO
  log "done" "PostegreSQL installed!"
}

#
# Setup the DomoThink API.
#
function setup_api {
  cd /var
  sudo git clone https://github.com/Eastrall/DomoThink-API
  sudo mv DomoThink-API domothink

  # Compile app with babel
  cd /var/domothink/api

  # Create users and database
  sudo mysql -u "root" "-ppassword_root" < ./database/mysql_create_users.sql
  sudo mysql -u "root" "-ppassword_root" < ./database/mysql_database.sql

  # Configure API
  sudo npm install
  sudo npm run-script prestart # compile the API using the prestart script.

  # Create daemon service

  npm install forever -g
  npm install forever-service -g

  # this line creates the daemon service
  sudo forever-service install domothink --script dist/server.js -f " --sourceDir=/var/domothink/"

}

#
# Clean the unused packages.
#
function clean_all {
  sudo apt-get update -y
  sudo apt-get upgrade
  sudo apt-get autoremove -y
}

function start_service {
  sudo service domothink start
}

##############
# MAIN POINT #
##############

log "info" "Starting DomoThink installation..."

update_packages
install_tools
install_node_js
install_mysql_server
install_postegresql_server
setup_api
clean_all
start_service

log "done" "DomoThink API has been installed!"
