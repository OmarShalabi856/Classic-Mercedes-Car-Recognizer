from flask import Flask,render_template,request
import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image

model=load_model('C:/Users/LENOVO/Desktop/CarImages/model_1.h5')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/',methods=['POST'])
def predict():
    imagefile=request.files['imageFile']
    image_path="./images/"+imagefile.filename
    imagefile.save(image_path)
    img=Image.open(image_path)
    img=img.resize((400,300))
    img_array = np.array(img)
    image_array = np.expand_dims(img_array, axis=0)
    image_array = image_array[:, :, :, :3]
    prediction=model.predict(image_array)
    models= ['Mercedes-Benz 180 (1953-1957)',
              'Mercedes-Benz 190E (1982-1993)',
              'Mercedes-Benz 190SL (1955-1963)',
              'Mercedes-Benz 200 (1976-1984)',
              'Mercedes-Benz 250SE-280SE (1965-1972)',
              'Mercedes-Benz 450SL (1973-1980)',
              'Mercedes-Benz 500SL (1990)',
              'Mercedes-Benz G-Class (1980S)']
    prediction_1=models[np.argmax(prediction)]

    return render_template('index.html', prediction=prediction_1)

if __name__ == '__main__':
    app.run(debug=True)
 