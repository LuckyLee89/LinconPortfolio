#!/bin/bash

APP="labelstudio-portfolio"
echo "🚀 Iniciando VM no Fly.io..."
flyctl scale count 1 -a $APP
