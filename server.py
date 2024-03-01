from flask import Flask, request, jsonify
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
translator = Translator()
CORS(app)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text', '')
    target_lang = data.get('target_lang', 'en')
    
    translated = translator.translate(text, dest=target_lang)
    
    return jsonify({
        'translated_text': translated.text
    })

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
