import os
import flask
import openai
from flask import Flask


 
API_KEY = 'KEY'
API_URL = 'https://chimeragpt.adventblocks.cc/v1'


openai.api_key = API_KEY
openai.api_base = API_URL
app = Flask(__name__)

@app.route('/completionChat', methods=['GET'])
def completion_api():
    def stream():
        completion = openai.ChatCompletion.create(
            model='gpt-3.5-turbo', 
            messages=[{"role": "user", "content": "What is the difference between python and C++?"}],
            stream=True)
        for line in completion:
            chunk = line['choices'][0].get('delta', {}).get('content')
            if chunk:
                yield chunk
    return flask.Response(stream(), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True)