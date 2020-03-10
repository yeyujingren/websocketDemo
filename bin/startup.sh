#!/bin/bash -e
# root

env=$1
export PATH=$PATH:/usr/local/nodejs/bin:/usr/sbin
echo "[startup][Strat]..."
# 进入shell脚本当前的bin
cd `dirname $0`
# 进入项目顶级目录
cd ..

PROJECT_ROOT=$(pwd)
PROJECT_NAME="${PROJECT_ROOT##*/}"
cd ..
NODE_ROOT=$(pwd)
LOG_ROOT=$NODE_ROOT/logs/$PROJECT_NAME

echo "[startup][step 0] echo something..."
echo "PROJECT_NAME: ${PROJECT_NAME}"
echo "PROJECT_ROOT: ${PROJECT_ROOT}"
echo "NODE_ROOT: ${NODE_ROOT}"
echo "LOG_ROOT: ${LOG_ROOT}"
echo "RUN ENV: ${env}"
echo "user: "`whoami`
echo "npm -v: "`npm -v`
echo "node -v: "`node -v`

if ["$env" = ""];
  then
        echo "[Error] the start.sh need a environment argument"
    echo "[Maybe] the argument must be one of them [ local / test / test2 / test3 / pre / prod ]"
    exit 1
fi

echo "[startup][step 2] export EGG_SERVER_ENV=${env}"
export EGG_SERVER_ENV=${env}

cd $PROJECT_ROOT

echo "[startup][step 3] mkdir -p logs dir"
mkdir -p $LOG_ROOT

echo "[startup][step 4] npm run start"
npm run stop
npm run start

echo "[startup][Done] Server is running ..."

