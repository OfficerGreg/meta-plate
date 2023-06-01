from flask import Flask, render_template, request
import openai
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
    if request.method == 'POST':
        if 'submit' in request.form:
            question = request.form.get('ask', '')
            message = answer_question(question)
            print("{}: {}".format(message['role'], message['content']))
    return render_template('index.html', name=message)


def answer_question(question):
    response = openai.ChatCompletion.create(
        context.append(question),
        model=model_engine,
        messages=[
            {"role": "system", "content": "Continue this chat as an AI assistant: " + str(context)},
        ])
    message = response.choices[0]['message']
    answers.append(message)
    context.append(message)
    return message

if __name__ == '__main__':
    app.run()

for answer in answers:
    print("{}: {}".format(answer['role'], answer['content']))
