from flask import Flask, request, jsonify
from googletrans import Translator

# Set up Flask app
app = Flask(__name__)
translator = Translator()
# Route for receiving text and target language request and returning translated text
@app.route('/translate', methods=['POST'])
def translate_text():
    # Get text and target language from request
    request_text = request.json.get('text')
    request_target_language = request.json.get('targetLanguage')

    # Translate text using Googletrans
   
    translated_text = translator.translate(request_text, dest=request_target_language).text
    print(translate_text)

    # Return translated text as JSON response
    return jsonify({'translatedText': translated_text})

if __name__ == '__main__':
    app.run()
