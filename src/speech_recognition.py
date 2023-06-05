import speech_recognition as sr
import pyttsx3




r = sr.Recognizer()


def SpeakText(command):
    engine = pyttsx3.init()
    engine.say(command)
    engine.runAndWait()


with sr.Microphone() as source2:
    r.adjust_for_ambient_noise(source2, duration=0.2)
    audio2 = r.listen(source2)
    try:
        MyText = r.recognize_google(audio2, language="de-DE")
        MyText = MyText.lower()

        print("Did you say: " + MyText)
        SpeakText(MyText)
    except sr.UnknownValueError:
        print("Nichtr ferstanden du hs")