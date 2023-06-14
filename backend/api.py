from flask import Blueprint, Response
import openai
import time
from datetime import datetime

api_bp = Blueprint("api", __name__)

API_KEY = 'hBah7VMdi_6TsDBGE4PeFwJauklPpPcB7bPS45UveNg'
API_URL = 'https://chimeragpt.adventblocks.cc/v1'

openai.api_key = API_KEY
openai.api_base = API_URL


@api_bp.route('/stream')
def stream():
    def get_data():
        while True:
            time.sleep(1)
            yield f'data: {datetime.now()} \n\n'
        
    return Response(get_data(), mimetype="text/event-stream")
