from models import User
from flask_login import current_user
import openai

import sys

class AI:
    def answer_question(self, question, context):
        # Set up OpenAI API credentials
        user = current_user
        openai.api_key = user.api_key

        # Generate an answer using OpenAI's completion endpoint
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=context + "\nQ: " + question + "\nA:",
            max_tokens=100,
            n=1,
            stop=None,
            temperature=0.7
        )

        # Extract the generated answer from the response
        answer = response.choices[0].text.strip()

        return answer


