from flask import Flask, jsonify, request
from validators import validate_payload
from errors import InvalidUsage
import fasttext
from huggingface_hub import hf_hub_download
import numpy as np

app = Flask(__name__)


def load_model() -> fasttext.FastText._FastText:
    model_path = hf_hub_download(repo_id="facebook/fasttext-en-vectors", filename="model.bin", cache_dir="cache")
    model = fasttext.load_model(model_path)
    return model

def cosine_similarity(model: fasttext.FastText._FastText, word1: str, word2: str) -> float:
    return np.dot(model[word1], model[word2]) / (np.linalg.norm(model[word1]) * np.linalg.norm(model[word2]))

@app.route("/")
def health():
    return jsonify({"health": "ok"})


@app.route("/predict", methods=["POST"])
def predict():
    errors = validate_payload(request)
    if errors is not None:
        raise InvalidUsage(errors)
    model = load_model()
    word = request.json["word"]
    guess = request.json["guess"]

    similarity = cosine_similarity(model, word, guess)

    return jsonify({"similarity": similarity})


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
   response = jsonify(error.to_dict())
   response.status_code = error.status_code
   return response

if __name__ == '__main__':
    app.run()