FROM python:3.10-slim

WORKDIR /app

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    libmagic1 \
    ffmpeg \
    && apt-get clean

# Instala o Label Studio
RUN pip install label-studio

# Expõe a porta padrão
EXPOSE 8080

# Comando para iniciar o servidor do Label Studio
CMD ["label-studio", "start", "--port", "8080", "--host", "0.0.0.0"]

