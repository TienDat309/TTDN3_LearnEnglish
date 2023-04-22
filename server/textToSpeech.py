ttsapikey = 'AyTHgcYli_17kWItDSZl2pSeIhk9boFVXBR6ObN9h0Y4'
ttsurl = 'https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/c147f7ed-ccd3-4a69-b4ba-d8b6e0b3684f'

from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


# Authenticate
ttsauthenticator = IAMAuthenticator(ttsapikey)
tts = TextToSpeechV1(authenticator=ttsauthenticator) 
tts.set_service_url(ttsurl)

def textToSpeech(sentence):
    with open('../client/src/utils/speech.mp3', 'wb') as audio_file:
    # with open('D:/App/NCKH_HKK/WebEnglish/Website-LearnEnglish/client/src/utils/speech.mp3', 'wb') as audio_file:
        res = tts.synthesize(sentence, accept='audio/mp3', voice='en-US_AllisonV3Voice').get_result()
        audio_file.write(res.content)