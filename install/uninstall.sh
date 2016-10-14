#!/bin/bash

#
# Author: Filipe GOMES PEIXOTO <gomespeixoto.filipe@gmail.com>
# DomoThink API uninstall script
#

sudo apt-get purge -y git
sudo apt-get purge -y debconf-utils
sudo apt-get purge -y libstdc++-4.9-dev
sudo apt-get purge -y libssl-dev

# Uninstall Node.js

npm uninstall forever -g
rm -rf /var/run/forever
sudo apt-get purge -y nodejs

# Uninstall mysql-server and mysql-client

sudo apt-get purge -y mysql-server mysql-client

# Remove domothink

sudo rm -rf /var/domothink
sudo rm -rf /etc/init.d/domothink
sudo rm -rf /etc/init.d/mysql
systemctl daemon-reload

# clean all
sudo apt-get autoremove -y
