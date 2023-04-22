from fnmatch import translate
from flask import Flask, request, Response,jsonify
from flask_cors import CORS
from gramformers import correct
from translate import translatesText
from textToSpeech import textToSpeech

app = Flask(__name__)
CORS(app)

cumulative = ['']
@app.route('/gramformer', methods=['GET', 'POST'])  
def home():
    if request.method == 'POST': 
         data = request.get_json()
         cumulative[0] = str(data)
         return 'data received'
    else:
        data = correct(str(cumulative[0]))
        return jsonify({"data":data})

translates = ['']
@app.route('/translate', methods=['GET', 'POST'])  
def trans():
    if request.method == 'POST': 
         dataTranslate = request.get_json()
         translates[0] = str(dataTranslate)
         textToSpeech(str(translates[0]))
         return 'data received'
    else:
        dataTranslate = translatesText(str(translates[0]))
        return jsonify({"data":dataTranslate})

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)