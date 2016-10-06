#!bin/sh

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API setup script
#

echo "## DomoThink ##"
echo "Starting installation..."

## UPDATE / UPGRADE PACKAGES ##

sudo apt-get update -y
sudo apt-get upgrade -y

## INSTALL TOOLS ##

echo "Installing tools..."
sudo apt-get install -y emacs git
echo "Tools installed!"

## INSTALL NODE.JS ##

echo "Installing node.js..."
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
echo "Node.js installed!"

## INSTALL AND CONFIGURE MYSQL SERVER ##

echo "Installing mysql-server and mysql-client..."

# prepare root user
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password password_root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password password_root'

# install mysql server and client
sudo apt-get install -y mysql-server mysql-client
sudo /etc/init.d/mysql stop # stop the service
sudo mysql --bind-address="0.0.0.0"
sudo /etc/init.d/mysql start # start the service

echo "mysql-server and mysql-client installed!"
echo "Creating MySQL users..."

sudo mysql -e CREATE USER 'domo'@'localhost' IDENTIFIED BY 'default_password';
sudo mysql -e CREATE USER 'domo'@'%' IDENTIFIED BY 'default_password';

# execute SQL script for database creation
sudo mysql -u root -p root_password < database.sql

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

sudo npm install
sudo npm start

# Configure API

# Create daemon service

## END ##
echo "DomoThink has been installed with success!"