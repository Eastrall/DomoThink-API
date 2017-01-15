#!/bin/bash

#
# Author: Guillaume MUNSCH <guillaume@zap.lu>
# DomoThink API update script
#

##############
# MAIN POINT #
##############

sudo service domothink stop
cd /var/domothink
sudo git pull
sudo npm i
sudo npm run prestart
sudo service domothink start
echo "Done"
