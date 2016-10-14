#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API setup script
#

echo "## DomoThink ##"
echo "Starting installation..."

## UPDATE / UPGRADE PACKAGES ##

sudo apt-get update && apt-get upgrade

## INSTALL TOOLS ##

echo "Installing tools..."
sudo apt-get install -y emacs git debconf-utils htop libssl-dev
echo "Tools installed!"

## INSTALL NODE.JS ##

echo "Installing node.js..."
sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
sudo apt-get install -y nodejs
echo "Node.js installed!"

## INSTALL AND CONFIGURE MYSQL SERVER ##

echo "Installing mysql-server and mysql-client..."

# prepare root user
export DEBIAN_FRONTEND="noninteractive"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password password_root"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password password_root"

# install mysql server and client
sudo apt-get install -y mysql-server mysql-client
sudo /etc/init.d/mysql stop # stop the service
sudo mysql -u "root" "-ppassword_root" --bind-address="0.0.0.0"
sudo /etc/init.d/mysql start # start the service

echo "mysql-server and mysql-client installed!"
echo "Creating MySQL users..."

sudo mysql -u "root" "-ppassword_root" -e CREATE USER 'domo'@'localhost' IDENTIFIED BY 'default_password';
sudo mysql -u "root" "-ppassword_root" -e CREATE USER 'domo'@'%' IDENTIFIED BY 'default_password';

echo "MySQL is now configured!"

## INSTALL POSTGRESQL ##

# TODO

## INSTALL API ##

# Clone app from github

cd /var
sudo git clone https://github.com/Eastrall/DomoThink-Test-API
sudo mv DomoThink-Test-API domothink

# Compile app with babel
cd /var/domothink

# Create database
sudo mysql -u "root" "-ppassword_root" < database.sql

# Configure API
sudo npm install
sudo npm run-script prestart # compile the API using the prestart script.

# Create daemon service

npm install forever -g
sudo mkdir /var/run/forever

echo '#!/bin/sh

export PATH=$PATH:/usr/local/bin
export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules

case "$1" in
  start)
  exec forever --spinSleepTime 10000 --sourceDir=/var/domothink -p /var/run/forever start dist/server.js
  ;;

  stop)
  exec forever stop --sourceDir=/var/domothink dist/server.js
  ;;

  status)

  ;;

  default)
  ;;
esac

exit 0' > /etc/init.d/domothink

sudo chmod a+x /etc/init.d/domothink
sudo update-rc.d domothink defaults
systemctl daemon-reload

## CLEAN ALL ##

sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove -y


## END ##
echo "DomoThink has been installed with success!"
