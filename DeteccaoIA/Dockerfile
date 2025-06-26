FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    libmagic1 \
    ffmpeg \
 && apt-get clean

RUN pip install label-studio

EXPOSE 8080

CMD ["label-studio", "start", "--host", "0.0.0.0", "--port", "8080"]
