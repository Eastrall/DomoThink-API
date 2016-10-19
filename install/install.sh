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

sudo mysql -u "root" "-ppassword_root" < ./database/mysql_create_users.sql

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
sudo mysql -u "root" "-ppassword_root" < ./database/mysql_database.sql

# Configure API
sudo npm install
sudo npm run-script prestart # compile the API using the prestart script.

# Create daemon service

npm install forever -g
npm install forever-service -g

# this line creates the daemon service
sudo forever-service install domothink --script dist/server.js -f " --sourceDir=/var/domothink/"

## CLEAN ALL ##

sudo apt-get update
sudo apt-get upgrade
sudo apt-get autoremove -y

## START DOMOTHINK SERVICE ##

sudo service domothink start

## END ##

echo "DomoThink has been installed with success!"
