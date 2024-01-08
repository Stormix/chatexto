import fasttext
import numpy as np
import subprocess
import os

from flask import Flask, jsonify, request
from errors import InvalidUsage
from huggingface_hub import hf_hub_download
from dotenv import load_dotenv

load_dotenv()

class Inference:
    model = None
    def load_model(self):
        if self.model:
            print("Model already loaded, we'll use it.")
            return
        model_path = hf_hub_download(repo_id="facebook/fasttext-en-vectors", filename="model.bin", cache_dir="cache")
        self.model = fasttext.load_model(model_path)

    def cosine_similarity(self, word1: str, word2: str) -> float:
        return np.dot(self.model[word1], self.model[word2]) / (np.linalg.norm(self.model[word1]) * np.linalg.norm(self.model[word2]))

app = Flask(__name__)
inference = Inference()

@app.route("/")
def health():
    return jsonify({"health": "ok"})

@app.route("/predict", methods=["POST"])
def predict():
    if not inference.model:
        inference.load_model()
    word = request.json["word"]
    guess = request.json["guess"]
    similarity = inference.cosine_similarity(word, guess)
    return jsonify({"similarity": str(similarity)})


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
   response = jsonify(error.to_dict())
   response.status_code = error.status_code
   return response

if __name__ == '__main__':
    inference.load_model()
    app.run(host=os.getenv("HOST", "127.0.0.1"))