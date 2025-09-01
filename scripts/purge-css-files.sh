#!/bin/bash

mkdir .next/temp
yarn purgecss -c purgecss.config.js --output .next/temp
mv .next/temp/* .next/static/css/
rm -rf .next/temp