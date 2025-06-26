from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file.filename == "":
            return "Nenhum arquivo selecionado"
        upload_path = os.path.join("uploads", file.filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(upload_path)
        # Aqui você pode chamar detect_photo.py e processar a imagem se quiser
        return render_template("index.html", result_img=upload_path)
    return render_template("index.html", result_img=None)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

