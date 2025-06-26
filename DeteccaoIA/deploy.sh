#!/bin/bash

APP="labelstudio-portfolio"
TEMPO=3600

echo "🚀 Iniciando deploy para o app '$APP'..."
flyctl deploy -a $APP

if [ $? -ne 0 ]; then
  echo "❌ Deploy falhou."
  exit 1
fi

echo "⏳ Aguardando $((TEMPO / 60)) minutos antes de desligar..."
sleep $TEMPO

echo "🛑 Desligando app..."
flyctl scale count 0 -a $APP
