from flask import Blueprint, jsonify
import json
import numpy as np

gamba_bp = Blueprint("gamba", __name__)

odds = [0.7992, 0.1598, 0.032, 0.0064, 0.0026]
names = ["blue", "purple", "pink", "red", "gold"]

chosen_case = "Homeless case"

with open("./data/cases.json", "r") as f:
    cases = json.load(f)


@gamba_bp.route("/gamba", methods=["GET"])
def gen_cases():
    num_cases = 10
    
    results = []
    for _ in range(num_cases):
        r = np.random.choice(names, 1, p=odds)[0]
        p = cases["cases"][chosen_case][r]
        test = list(p.keys())
        d = np.random.choice(test, 1)[0]
        print(r + " " + d)

        results.append({"result": r, "detail": d})

    return jsonify(results)
