from flask import Blueprint, Response, request
import openai

api_bp = Blueprint("api", __name__)

# remove # from API KEY

API_KEY = 'API_KEY'
API_URL = 'https://api.openai.com/v1'

openai.api_key = API_KEY
openai.api_base = API_URL

event_source = None

@api_bp.route('/stream')
def stream():
    global event_source

    def get_data():
        for line in event_source:
            chunk = line['choices'][0].get('delta', {}).get('content')
            if chunk:
                yield f'data: {chunk}\n\n'

    return Response(get_data(), mimetype='text/event-stream')


@api_bp.route('/ask', methods=['POST'])
def ask():
    global event_source

    question = request.json.get('question')
    if question:
        if event_source:
            event_source.close()
        event_source = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{"role": "user", "content": question}],
            stream=True
        )

    return "Question received"
