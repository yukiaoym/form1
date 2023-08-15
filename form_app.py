#!/usr/local/bin/python3.7

from flask import Flask, render_template, url_for, request, redirect
from flask_cors import CORS
import requests
import datetime
from urllib.parse import quote
import ssl

base_url = 'https://9keyb8lwayhh.cybozu.com/k/v1'

app = Flask(__name__)
CORS(app, origins=["https://sub.cybersolutions.co.jp:443", "http://sub.cybersolutions.co.jp", "http://172.26.1.16:3000", "http://172.22.8.39"])

def logging(response):
    dt_now = datetime.datetime.now()
    logpath = '/opt/bin/api/form/logs/api.log'
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
def form():
    url = '{}/record.json'.format(base_url)
    headers = {'Content-Type': 'application/json', 'X-Cybozu-API-Token': 'aJiZthZGaRBhxpzMAawyHuuqwiKkrsnCy5DbjDt3'}
    appId = 95
    record_data = {}

    files = request.files
    file = files.get('SAML認証_メタデータ')
    if file is not None:
        fileKey = get_fileKey(file)
        record_data['SAML認証_メタデータ'] = {
            'type': 'FILE', 
            'value': [{
                'fileKey':fileKey
            }]}

    
    form_data = dict(request.form)
    #print(form_data)

    admin_list = []
    for key in form_data:
        op_list = []
        if 'MGΣ_プラン' == key:
            if (form_data[key] == 'false'):
                op_list = ['入口対策（基本）']
            else: 
                op_list = request.form.get(key).split(',')
                op_list.insert(0,'入口対策（基本）')
            record_data[key] = {'value': op_list }
        elif 'MGΣ_プラン_' in key:
            if (form_data[key] == 'false'):
                op_list = []
            else:
                op_list = request.form.get(key).split(',')
            record_data[key] = {'value': op_list }
        elif '管理者アカウント' in key:
            admin_list.append({'value': {'MailGates_管理者アカウントID': {'value': form_data[key]}}})
        elif key != 'SAML認証_メタデータ':
            record_data[key] = {'value': form_data[key]}
    record_data['管理者アカウント'] = {'value': admin_list}

    data = {
        'app': appId,
        'record': record_data
        }
    
    response = requests.post(url, headers=headers, json=data)
    #print(response.json())
    logging(response)
    return str(response.status_code)

@app.route('/oneofficeform', methods=["POST"])
def oneofficeform():
    url = '{}/record.json'.format(base_url)
    headers = {'Content-Type': 'application/json', 'X-Cybozu-API-Token': 'QEFbSmOsaixqg8RC0lSfJOEH5Qsj5w4ol98PhOOB'}
    appId = 96
    record_data = {}    
    form_data = dict(request.form)
    print(form_data)    

    files = request.files
    file = files.get('一括転送設定')
    if file is not None:
        fileKey = get_fileKey(file)
        record_data['一括転送設定'] = {
            'type': 'FILE',
            'value': [{
                'fileKey':fileKey
            }]}

    notification_list = []
    storage_admin_list = []
    for key in form_data:
        if '通知アドレス_管理者_No.' in key:
            notification_list.append({'value': {'通知アドレス_管理者': {'value': form_data[key]}}}) 
        elif 'Storage_管理者アカウント_No.' in key:
            storage_admin_list.append({'value': {'Storage_管理者アカウント': {'value': form_data[key]}}}) 
        elif key != '一括転送設定' :
            record_data[key] = {'value': form_data[key]}
    record_data['通知アドレス_管理者一覧'] = {'value': notification_list}
    record_data['管理者アカウント'] = {'value': storage_admin_list}
    
    if "Mail " in form_data["タイプ"]:
        record_data["ご契約サービス"] = {'value': 'Mail'}
    elif "MailStorage " in form_data["タイプ"]:
        record_data["ご契約サービス"] = {'value': 'MailStorage'}
    
    data = {
        'app': appId,
        'record': record_data
        }   
    response = requests.post(url, headers=headers, json=data)
    print(response.json())
    logging(response)
    return str(response.status_code)

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    ssl_context.load_cert_chain(
        '/etc/pki/tls/certs/server.crt', '/etc/pki/tls/private/server.key'
    )
    app.debug = False
    app.run(ssl_context=ssl_context, host='0.0.0.0',  port=8081, threaded=True)
    #app.run(host='0.0.0.0',  port=8081)
