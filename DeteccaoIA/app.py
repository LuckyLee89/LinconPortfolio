from flask import Flask, request, render_template_string, send_file
import cv2
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

HTML_FORM = """
<!DOCTYPE html>
<html>
<head>
    <title>Detecção Facial</title>
</head>
<body>
    <h1>Upload de Imagem</h1>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*" required>
        <button type="submit">Enviar</button>
    </form>
    {% if output_url %}
    <h2>Resultado:</h2>
    <img src="{{ output_url }}" alt="Imagem processada">
    {% endif %}
</body>
</html>
"""

@app.route('/', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        file = request.files['image']
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Carrega o modelo ResNet pré-treinado para detecção facial
        net = cv2.dnn.readNetFromCaffe(
            'deploy.prototxt',
            'res10_300x300_ssd_iter_140000_fp16.caffemodel'
        )

        # Processa a imagem
        image = cv2.imread(filepath)
        (h, w) = image.shape[:2]
        blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300),
                                     (104.0, 177.0, 123.0))
        net.setInput(blob)
        detections = net.forward()

        # Desenha retângulos nas detecções
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > 0.5:
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")
                cv2.rectangle(image, (startX, startY), (endX, endY),
                              (0, 255, 0), 2)

        output_path = os.path.join(OUTPUT_FOLDER, filename)
        cv2.imwrite(output_path, image)

        return render_template_string(HTML_FORM, output_url=f'/result/{filename}')

    return render_template_string(HTML_FORM, output_url=None)

@app.route('/result/<filename>')
def result(filename):
    return send_file(os.path.join(OUTPUT_FOLDER, filename), mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

