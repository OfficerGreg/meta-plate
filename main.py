from flask import Flask, render_template, request
import openai
import json
import base64

encodedKey = "c2stV3p4dWpCZ1kySDZWQnl1UXgxMFRUM0JsYmtGSms2MExNVW0wanF1eElFMUN3Z0tX"
openai.api_key = base64.b64decode(encodedKey).decode('utf-8')
model_engine = "gpt-3.5-turbo"

app = Flask(__name__)

answers = []
context = []

@app.route('/', methods=['POST', 'GET'])
def get_question():
    message = ""
    if request.method == 'POST' and 'submit' in request.form:
        question = request.form.get('ask', '')
        message = answer_question(question)
        answers.append({"role": "user", "content": question})
        answers.append({"role": "bot", "content": message})
        print("User: {}".format(question))
        print("Bot: {}".format(message))
    return render_template('index.html', answers=answers)


def answer_question(question):
    context.append("You: " + question)
    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=[
            {"role": "system", "content": "Continue this chat as an Plate AI: " + str(context)},
        ])
    message = response.choices[0]['message']
    prased_message = json.loads(str(message))
    extracted = prased_message['content']
    context.append(extracted)
    return extracted

if __name__ == '__main__':
    app.run()
