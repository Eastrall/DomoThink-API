#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API uninstall script
#

# remove tools

sudo apt-get purge -y git
sudo apt-get purge -y debconf-utils
sudo apt-get purge -y libstdc++-4.9-dev
sudo apt-get purge -y libssl-dev

# remove domothink service

sudo service domothink stop
sudo forever-service delete domothink

# Uninstall Node.js

npm uninstall forever -g
npm uninstall forever-service -g
rm -rf /var/run/forever
sudo apt-get purge -y nodejs

# Uninstall mysql-server and mysql-client

sudo apt-get purge -y mysql-server mysql-client

# clean all
sudo apt-get autoremove -y
