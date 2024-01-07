import fasttext
import numpy as np

from flask import Flask, jsonify, request
from validators import validate_payload
from errors import InvalidUsage
from huggingface_hub import hf_hub_download


class Inference:
    model = None
    def load_model(self):
        if self.model:
            print("Model already loaded, we'll use it.")
            return
        print("Downloading model.")
        model_path = hf_hub_download(repo_id="facebook/fasttext-en-vectors", filename="model.bin", cache_dir="cache")
        self.model = fasttext.load_model(model_path)

    def cosine_similarity(self, word1: str, word2: str) -> float:
        return np.dot(self.model[word1], self.model[word2]) / (np.linalg.norm(self.model[word1]) * np.linalg.norm(self.model[word2]))

app = Flask(__name__)
Inference = Inference()

@app.route("/")
def health():
    return jsonify({"health": "ok"})


@app.route("/predict", methods=["POST"])
def predict():
    errors = validate_payload(request)
    if errors is not None:
        raise InvalidUsage(errors)
    if not Inference.model:
        Inference.load_model()
    word = request.json["word"]
    guess = request.json["guess"]
    similarity = Inference.cosine_similarity(word, guess)
    return jsonify({"similarity": str(similarity)})


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
   response = jsonify(error.to_dict())
   response.status_code = error.status_code
   return response

if __name__ == '__main__':
    app.run()