#!/bin/bash

#
# Author: Guillaume MUNSCH <guillaume@zap.lu>
# DomoThink API update script
#

##############
# MAIN POINT #
##############

cd /var/domothink
sudo service domothink stop
sudo git pull >> update.log
sudo npm i >> update.log
sudo npm run prestart >> update.log
sudo service domothink start >> update.log
echo "Done"
