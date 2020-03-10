#!/bin/bash -e
# root
env=$1
export PATH=$PATH:/usr/local/nodejs/bin:/usr/sbin
echo "[build][Start]..."
# 进入shell脚本当前的目录bin
cd `dirname $0`
# 进入项目顶级目录
cd ..

PROJECT_ROOT=$(pwd)
# echo $PROJECT_ROOT
PROJECT_NAME="${PROJECT_ROOT##*/}"
cd ..
NODE_ROOT=$(pwd)
LOG_ROOT=$NODE_ROOT/logs/$PROJECT_NAME
REGISTRY="https://registry.npm.taobao.org"
echo "[build][step 0] echo somethinig..."
echo "PROJECT_NAME: ${PROJECT_NAME}"
echo "PROJECT_ROOT: ${PROJECT_ROOT}"
echo "NODE_ROOT: ${NODE_ROOT}"
echo "LOG_ROOT: ${LOG_ROOT}"
echo "Run env: ${env}"
echo "user: "`whoani`
echo "npm -v:"`npm -v`
echo "node -v:"`node -v`

if [ "$env" = ""];
  then
    echo "[build][Error] the build.sh need a environment argument"
    echo "[build][Maybe] the argument must be one of them [ local / test / test2 / test3 / pre / prod ]"
    exit 1
fi

# export envs
echo "[build][step 2] npm cache clean --force"
npm cache clean --force

# resolve `npm install` can't export error tips when it was package failed
echo "[build][step 3] #### npm install start ####"
echo "[build][step 3] npm install --registry=${REGISTRY}"
NPMLOGFILE="${PROJECT_NAME}.npm.log"
echo "[build][step 3] NPMLOGFILE=${NPMLOGFILE}"
npm install --registry=${REGISTRY} >& ${NPMLOGFILE}

NPMERRCOUNT=`grep -c 'npm\sERR' ${NPMLOGFILE}`
echo "[build][step 3] npm install error count=$NPMERRCOUNT"
if [ "$NPMERRCOUNT" -gt 0 ];
  then
    echo "[build][step 3] $(cat ${NPMLOGFILE})"
    rm "${NPMLOGFILE}"
    exit 1
fi
echo "[build][step 3] $(cat ${NPMLOGFILE})"
echo "[build][step 3] #### npm install end ####"

#build
echo "[build][step 4] npm run build"
npm run build ${env}

echo "[build][Done] BUILD SUCCESS"
