#! /usr/bin/bash

sudo tmux new -d -s timeTracker

sudo tmux send-keys -t timeTracker:0 cd Space /home/pi/time-tracker/server/ C-m
sudo tmux send-keys -t timeTracker:0 sudo Space npm Space run Space start C-m
echo "started tmux"
