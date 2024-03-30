#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then 
  npm run build:master
else 
  npm run build
fi