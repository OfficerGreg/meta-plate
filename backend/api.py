from flask import Blueprint, Response
import openai

api_bp = Blueprint("api", __name__)

# remove # from API KEY

API_KEY = 'hBah7VMdi_6TsDBGE4PeFwJauklPpPcB7bPS45UveNg'
API_URL = 'https://chimeragpt.adventblocks.cc/v1'

openai.api_key = API_KEY
openai.api_base = API_URL


@api_bp.route('/stream')
def stream():
    def get_data():
        completion = openai.ChatCompletion.create(
            model='gpt-3.5-turbo', 
            messages=[{"role": "user", "content": "What is the difference between python and C++?"}],
            stream=True)
        for line in completion:
            chunk = line['choices'][0].get('delta', {}).get('content')
            if chunk:
                yield f'data: {chunk}\n\n'
    return Response(get_data(), mimetype='text/event-stream')