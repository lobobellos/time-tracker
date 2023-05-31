#! /bin/bash

echo "time-tracker: ## Starting ##" | systemd-cat -p info

npm run server & npm run inputListen &&

exit 0