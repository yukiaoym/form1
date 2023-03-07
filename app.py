#!/usr/bin/python3

from flask import Flask, render_template, url_for, request, redirect
from flask_cors import CORS
import requests
import datetime
import ssl

headers = {'Content-Type': 'application/json', 'X-Cybozu-API-Token': 'aJiZthZGaRBhxpzMAawyHuuqwiKkrsnCy5DbjDt3'}
appId = 95
base_url = 'https://9keyb8lwayhh.cybozu.com/k/v1'

app = Flask(__name__)
CORS(app, origins=["https://sub.cybersolutions.co.jp"])

def logging(response):
    dt_now = datetime.datetime.now()
    logpath = '/mnt/storage/workdir/aoyama/form/logs/api.log'
    with open(logpath, mode='a') as f:
        log = str(dt_now) + " " + str(response.status_code) + "\n"
        f.write(log)

@app.route('/')
def index():
    return "Hello Flask!"

def get_fileKey(file):
    url = '{}/file.json'.format(base_url)
    headers = {'X-Requested-With': 'XMLHttpRequest', 'X-Cybozu-API-Token': 'aJiZthZGaRBhxpzMAawyHuuqwiKkrsnCy5DbjDt3'}
    files = {'file': (file.filename, file.stream, file.content_type)}
    response = requests.post(url, headers=headers, files=files)
    j_response = response.json()
    fileKey = j_response['fileKey']
    return fileKey

@app.route('/form', methods=["POST"])
def get_form():
    url = '{}/record.json'.format(base_url)
    record_data = {}

    files = request.files
    metadata = files.get('SAML認証_メタデータ')
    if metadata is not None:           
        fileKey = get_fileKey(metadata)
        record_data['SAML認証_メタデータ'] = {'type': 'FILE', 'value': [{'fileKey':fileKey}]}
    
    admin_list = []
    form_data = dict(request.form)
    for key in form_data:
        if key == 'MGΣ_プラン':
            op_list = request.form.get('MGΣ_プラン').split(',')
            record_data[key] = {'value': op_list }
        elif '管理者アカウント' in key:
            admin_list.append({'value': {'MailGates_管理者アカウントID': {'value': form_data[key]}}})
        else:
            record_data[key] = {'value': form_data[key]}
    record_data['管理者アカウント'] = {'value': admin_list}


    data = {
        'app': appId,
        'record': record_data
        }
    response = requests.post(url, headers=headers, json=data)
    logging(response)

    return str(response.status_code)

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    ssl_context.load_cert_chain(
        '/etc/pki/tls/certs/server.crt', '/etc/pki/tls/private/server.key'
    )
    app.debug = False
    app.run(ssl_context=ssl_context, host='0.0.0.0',  port=8081)