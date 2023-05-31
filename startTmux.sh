#! /usr/bin/bash

sudo -u pi tmux new -d -s timeTracker

sudo -u pi tmux send-keys -t timeTracker:0 cd Space /home/pi/time-tracker/ C-m
sudo -u pi tmux send-keys -t timeTracker:0 sudo Space ./startTracker.sh C-m
echo "started tmux"