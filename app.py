from flask import Flask, render_template, url_for, request, redirect
from flask_cors import CORS
import requests

headers = {'Content-Type': 'application/json', 'X-Cybozu-API-Token': 'aJiZthZGaRBhxpzMAawyHuuqwiKkrsnCy5DbjDt3'}
appId = 95
base_url = 'https://9keyb8lwayhh.cybozu.com/k/v1'

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://172.22.8.39", "http://172.22.8.39/form/nifcloud"])

@app.route('/')
def index():
    return "Hello Flask!"

@app.route('/form', methods=["POST"])
def get_form():

    print(request.files)
    url = '{}/record.json'.format(base_url)
    data = {
        'app': appId,
        'record': request.json
        }
    response = requests.post(url, headers=headers, json=data)
    print(data)
    print(response.json())
    return str(response.status_code)

if __name__ == '__main__':
    app.debug = False
    app.run(host='172.22.8.39',  port=8081)
