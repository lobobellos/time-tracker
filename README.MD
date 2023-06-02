# Time-Tracker
![GitHub CI](https://github.com/lobobellos/time-tracker/actions/workflows/buildtest.yml/badge.svg)<br>
A little device to clock people in and out of the robotics lab

[
![cad img](https://github.com/lobobellos/time-tracker/assets/93680829/d31e5dc3-7da6-46a8-b3a1-72efaf76b850 )
]( https://cad.onshape.com/documents/744ff102151cab140cc34028/w/d09d87bab049e0b5aa94faa4/e/a5d924fb01be7d6582799c44?renderMode=0&uiState=647a2cdb5326cc1f6f38e3dc )

[//]: # (TODO: finish this)
## The Why
so in the 2022 season, we used a google form,to track who spent the most time in the robotics room, wiht the end goal being to quantitatively decide who the most dedicated people on the team were. this system worked, but it was tedious, and a pain to do. regardless, in the 2023 season, our team captain of 3 years left, and we had to scramble a little bit.


## Production Setup

### Dependencies
- npm and node v18+
- raspberrypi (tested on 4b)
- tmux for raspberrypi 
### Steps
- clone directory onto raspberry pi
- `npm i` to install deps
- `npm run create-data` to create empty database
- create `ADMIN_PASSWORD` in a `.env` file
- set `IS_PROD = "true"` in `.env`
- give script execute perms with `chmod +x scripts/startTmux.sh`
- edit your `rc.local` file, to look like this, replacing `/absolute/path/` with your actual one, which will be something like `/home/pi/projects/time-tracker/` on a raspberrypi

  ```shell
  #!/bin/sh -e
  #
  # rc.local
  #
  # This script is executed at the end of each multiuser runlevel.
  # Make sure that the script will "exit 0" on success or any other
  # value on error.
  #
  # In order to enable or disable this script just change the execution
  #
  # By default this script does nothing.

  sudo /absolute/path/to/scripts/startTmux.sh &&
  exit 0
  ```
## Dev setup

### Dependencies
- npm and node v18+
  

