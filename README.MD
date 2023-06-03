# Time-Tracker

![GitHub CI](https://github.com/lobobellos/time-tracker/actions/workflows/buildtest.yml/badge.svg)<br>
A little device to clock people in and out of the robotics lab

[
![cad img](https://github.com/lobobellos/time-tracker/assets/93680829/d31e5dc3-7da6-46a8-b3a1-72efaf76b850)
](https://cad.onshape.com/documents/744ff102151cab140cc34028/w/d09d87bab049e0b5aa94faa4/e/a5d924fb01be7d6582799c44?renderMode=0&uiState=647a2cdb5326cc1f6f38e3dc)

## The Why

In the 2022 season, we used a Google Form to track who spent the most time in the robotics room, with the end goal being to quantitatively decide who the most dedicated people on the team were. This system worked, but it was tedious and a pain to manage. However, in the 2023 season, our team captain of 3 years left, and things got a little bit crazy. Due to this, we didn't even implement it that year. In an effort to track time spent, I ([bakedpotatolord](https://github.com/bakedpotatolord)) created this project. Moreover, in an effort to make it easy to update and fix long after I'm gone, everything is open sourced.

This includes:

- [The design files](https://cad.onshape.com/documents/744ff102151cab140cc34028/w/d09d87bab049e0b5aa94faa4/e/a5d924fb01be7d6582799c44?renderMode=0&uiState=647a2cdb5326cc1f6f38e3dc)
- The code (duh)
- The wiring diagram (coming soon)

## The How

This project uses multiple technologies for the different parts of it. Here's a breakdown:

- Frontend
  - [VueJS](https://vuejs.org/)
- Backend
  - [ExpressJS](https://expressjs.com/)
  - [ViteJS](https://vitejs.dev/)
- Hardware
  - [Rasberry Pi](https://www.raspberrypi.com/)
  - [Sparkfun LCD](https://www.mouser.com/ProductDetail/SparkFun/LCD-00255?qs=WyAARYrbSnZUIzZ3sJcVBQ%3D%3D&mgh=1)

## Production Setup

### Supported Hardware

| device         | tested?                    |
| -------------- | -------------------------- |
| raspberry pi 4 | yes                        |
| raspberry pi 3 | hypothetically should work |

### Dependencies

- npm and node v18+
- tmux for raspberrypi

### Steps

- Clone directory onto raspberry pi with `git clone https://github.com/lobobellos/time-tracker.git`
- `npm i` to install deps
- `npm run create-data` to create empty database
- Create .env
  - Set `ADMIN_PASSWORD`
  - Set `IS_PROD = "false"`
  - Set `PORT` Default is 8080
- Give script execute perms with `chmod +x scripts/startTmux.sh`
- Edit your `rc.local` file, to look like this, replacing `/absolute/path/` with your actual one, which will be something like `/home/pi/projects/time-tracker/` on a raspberrypi

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

## Dev Setup

- Clone directory with `git clone https://github.com/lobobellos/time-tracker.git`
- `npm i` to install deps
- `npm run create-data` to create empty database
- Create .env
  - Set `ADMIN_PASSWORD`
  - Set `IS_PROD = "false"`
  - Set `PORT` Default is 8080

### Supported Hardware

- Anything that can run nodejs

### Dependencies

- npm and node v18+
