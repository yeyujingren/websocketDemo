#!/bin/bash -e
# root

export PATH = $PATH:/usr/local/nodejs/bin:/usr/sbin
echo "[shutdown][START]..."
# 进入shell脚本当前的目录bin
cd `dirname $0`
# 进入项目顶级目录
cd ..

PROJECT_ROOT=$(pwd)
# echo $PROJECT_ROOT
PROJECT_NAME="${PROJECT_ROOT##*/}"

echo "[shutdown][step 0] project name is $PROJECT_NAME"
echo '[shutdown][step 1] npm run stop'
npm run stop

echo "[shutdown][Done] shutdown success"
