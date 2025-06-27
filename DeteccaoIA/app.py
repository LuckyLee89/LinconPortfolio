from flask import Flask, request, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "file" not in request.files:
            return "Nenhum arquivo enviado."
        file = request.files["file"]
        if file.filename == "":
            return "Nome do arquivo vazio."

        os.makedirs("uploads", exist_ok=True)
        path = os.path.join("uploads", file.filename)
        file.save(path)

        return render_template("index.html", result_img=file.filename)

    return render_template("index.html", result_img=None)

# 👇 Essa rota serve as imagens da pasta uploads
@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

