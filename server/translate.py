apikey = 'Vz8cRwb1-dTzyi-N2t5xRnV5e6R9NPPDgW9BIGw0bPqS'
url = 'https://api.au-syd.language-translator.watson.cloud.ibm.com/instances/86534625-0ebc-429f-95e6-1b6fe03d0871'
# import deps
from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
# Setup service
authenticator = IAMAuthenticator(apikey)
lt = LanguageTranslatorV3(version='2018-05-01', authenticator=authenticator)
lt.set_service_url(url)

def translatesText(sentence):
    translation = lt.translate(text=sentence, model_id='en-vi').get_result()
    return translation['translations'][0]['translation']