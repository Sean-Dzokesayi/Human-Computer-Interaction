from transformers import pipeline
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa
from openai import OpenAI
import soundfile as sf
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
import pygame



def load_model(model_path):
    try:
        model = tf.keras.models.load_model(model_path)
        return model
    except FileNotFoundError:
        return None

pygame.init()
pygame.mixer.init()

# Models
#intent
# classification_pipe = pipeline(model="facebook/bart-large-mnli")

#qa
# qa_pipeline = pipeline('question-answering', model="deepset/roberta-base-squad2", tokenizer="deepset/roberta-base-squad2")

# transcription
# processor = WhisperProcessor.from_pretrained("openai/whisper-base")
# whisper_model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-base")
# whisper_model.config.forced_decoder_ids = None

# summarizer
summarizer = pipeline("summarization")

# hand gestue
# gesture_model = load_model('/Users/seandzokesayi/Desktop/PROJECT/model_server/hand_gesture_model.h5')
# class_labels =  [
#     "PALM",
#     "FIST",
#     "THUMBS_UP",
#     "THUMBS_DOWN",
#     "POINTS_EQUAL"
# ] 
# label_encoder = LabelEncoder()

# label_encoder.fit(class_labels)

# numerical_labels = label_encoder.transform(class_labels)


classification_labels = [
"Open App",
"Create New File",
"Increase Volume",
"Decrease Volume",
"Move File",
"Update File",
"Other",
"Question",
"Goto Link",
"Close App",
"Append To File",
"Type Text"
]

client = OpenAI()
client.api_key = "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"

def intent_classification(text):
    if len(text) > 100:
        text = text[:100]
        print(text)
    question = f"Which classification label best fits the users statement, give a consise answer. labels: {str(classification_labels)} \ntext: {text}" 
    answer = jazz(question)
    return answer
    if len(text) > 60:
        text = text[:59]
    return classification_pipe(text, candidate_labels=classification_labels)['labels'][0]

def question_answering(question, context):
    text = f"Given some content answer the question as concise as possible. \nContext: {context}\nQuestion: {question}"
    answer = jazz(text)
    return answer
    QA_input = {
    'question': question,
    'context': context
}
    res = qa_pipeline(QA_input)
    return res['answer']

def summary(text, max_length=50, min_length=9):
    try:
        return "[SUMMARY]" + summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
    except:
        return text

def transcribe_mp3_file(mp3_path):
    # Read the mp3 file and resample to 16,000 Hz
    audio_input, sampling_rate = sf.read(mp3_path)
    if sampling_rate != 16000:
        audio_input = librosa.resample(audio_input, orig_sr=sampling_rate, target_sr=16000)
        sampling_rate = 16000

    # Convert audio to input features
    input_features = processor(audio_input, sampling_rate=sampling_rate, return_tensors="pt").input_features

    # Generate token IDs
    predicted_ids = whisper_model.generate(input_features)
    
    # Decode token IDs to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)

    return f"{transcription[0]}"

def jazz(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        # response_format={ "type": "json_object" },
        seed=19,
        messages=[
            # {"role": "system", "content": info},
            {"role": "user", "content": text},
            ]
        )
    # result = (json.loads(response.choices[0].message.content))
    result = response.choices[0].message.content
    return result

def jasmine(text):
    response = client.chat.completions.create(
        model="gpt-4",
        # response_format={ "type": "json_object" },
        seed=19,
        messages=[
            # {"role": "system", "content": info},
            {"role": "user", "content": text},
            ]
        )
    # result = (json.loads(response.choices[0].message.content))
    result = response.choices[0].message.content
    return result

def speak(text):
    speech_file_path = "./saved_responses/speech.mp3"
    
    response = client.audio.speech.create(
    model="tts-1",
    voice="shimmer",
    input=text
    )
    response.stream_to_file(speech_file_path)
    play_audio("speech.mp3")

def play_audio(speech_file_path):
    try:
      pygame.mixer.music.load("./saved_responses/" + speech_file_path)
      pygame.mixer.music.play()
      return True
    except:
        return False

def createSpeechFile(filename, text):
    print("\n\nCreating speech file\n\n")
    speech_file_path = "./saved_responses/" + filename
    response = client.audio.speech.create(
    model="tts-1",
    voice="shimmer",
    input=text
    )
    response.stream_to_file(speech_file_path)
    play_audio(speech_file_path)

