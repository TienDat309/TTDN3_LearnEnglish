from happytransformer import HappyTextToText
from happytransformer import TTSettings
happy_tt = HappyTextToText("T5",  "prithivida/grammar_error_correcter_v1")
settings = TTSettings(do_sample=True, top_k=50, temperature=0.7, min_length=1, max_length=1024)

def correct(text):
    result = ''
    sentences = text.split('.')
    sentences.pop()

    for sentence in sentences:  
        output_top_p_sampling = happy_tt.generate_text( 'gec: ' + sentence + '.', args=settings)
        result += output_top_p_sampling.text + ' '

    return result