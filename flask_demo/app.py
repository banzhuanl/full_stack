#!/home/tops/bin/python2.7
# -*- coding:utf-8 -*-

import sys
import time
import json
import traceback
import datetime
import base64

from flask import Flask
from flask import jsonify
from flask import make_response
from flask.ext.cors import CORS
from werkzeug.contrib.fixers import ProxyFix
from werkzeug.routing import BaseConverter

from flask import redirect
from flask import abort
from flask import request
from flask import session
from flask import render_template

from init import app

CORS(app)
app.secret_key = 'flask_flask_demo_server'

import tlib.log as log
import tlib.conf as conf

from service import DataService

data_service= DataService()

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

def __resp(ret, code=200):
    # response = make_response(jsonify(ret), code)
    response = make_response(json.dumps(ret), code)
    # response.headers['Access-Control-Allow-Origin'] = 'http://flask_flask_demo.proxy.taobao.org'
    # response.headers['Access-Control-Max-Age'] = 60
    # response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,PUT,DELETE'
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

def __get_user():
    return session['username'] if session.has_key('username') else ''

def __get_current_url():
    return request.url

@app.before_request
def before_request():
    buc_sso_url = 'http://search-tools.yisou.com/buc_sso/index.php'
    data = request.args.to_dict()
    current_url =  __get_current_url()
    if not session.has_key('username'):
        session['username'] = ''
    log.info('current_url: %s, current_user: %s' % (current_url, __get_user()))
    if 'localhost' not in current_url and '/pic' not in current_url:
        if session.has_key('user_info'):
            #log.info('Session has user_info')
            pass
        elif data.has_key('user_info'):
            if base64.b64decode(data.get('user_info')) == 'false':
                log.info('Data user_info = False')
                session.clear
                log.info('redirect: %s' % request.base_url)
                return redirect(buc_sso_url + '?referer=' + base64.b64encode(request.base_url))
            else:
                log.info('Data user_info is ok')
                user_info =  json.loads(base64.b64decode(data.get('user_info')))
                session['user_info'] = json.dumps(user_info)
                session['username'] = user_info['emailPrefix']
                pos = current_url.rfind('user_info')
                print current_url[0:pos-1]
                return redirect(current_url[0:pos-1])
        else:
            log.info('Buc not login')
            return redirect(buc_sso_url + '?referer=' + base64.b64encode(current_url))

@app.after_request
def after_request(response):
    if session.has_key('user_info'):
        response.set_cookie('user_info', session['user_info'])
    if session.has_key('username'):
        response.set_cookie('username', session['username'])
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<regex("tab[1,2]"):tab>/<regex("side[A,B,C]"):side>')
def reg_index(tab,side):
    print tab,side
    return render_template('index.html')

@app.route('/flask_demo/data/<offset>/<limit>')
def list_by_offset_limit(offset, limit):
    ret = {'message': '', 'code': 200, 'data': ''}
    try:
        data = data_service.list(offset, limit)
        total = data_service.count()
        ret['data'] = {'total':total, 'data': data}
        print ret
    except:
        error_msg = traceback.format_exc()
        log.error(error_msg)
        ret['code'] = 500
        ret['message'] = error_msg
    return __resp(ret)

@app.route('/flask_demo/data', methods=['POST'])
def post_data():
    log.info('post_data')
    ret = {'message': '', 'code': 200, 'data': ''}
    if not request.form or not 'action' in request.form:
        abort(400)

    action = request.form['action']
    cuser = __get_user()
    submit_data = request.form.to_dict()
    if action == 'add':
        if 'name' not in request.form and not request.form['name']:
            abort(400)
        try:
            name = request.form['name']
            data = request.form['data'] if 'data' in request.form else ''
            cuser = cuser
            uuser = cuser
            submit_data = {
                'name': name,
                'cuser': cuser,
                'uuser': uuser,
                'data': data
            }
            id = data_service.add(submit_data)
            ret['data'] = id
        except:
            error_msg = traceback.format_exc()
            log.error(error_msg)
            ret['code'] = 500
            ret['message'] = error_msg
    
    elif action == 'update':
        if 'id' not in request.form:
            abort(400)
        try:
            id = submit_data['id']
            submit_data['uuser'] = __get_user()
            data_service.update(id, submit_data)
        except:
            error_msg = traceback.format_exc()
            log.error(error_msg)
            ret['code'] = 500
            ret['message'] = error_msg

    elif action == 'del':
        try:
            id = submit_data['id']
            data_service.delete(id)
        except:
            error_msg = traceback.format_exc()
            log.error(error_msg)
            ret['code'] = 500
            ret['message'] = error_msg

    else:
        error_msg = 'action not in [add, update, del]'
        log.error(error_msg)
        ret['code'] = 500
        ret['message'] = error_msg

    return __resp(ret)

@app.errorhandler(404)
def not_found(error):
    return __resp({'message': 'Not found', 'code': 404, 'data': ''}, 404)
    #return render_template('index.html')

app.wsgi_app = ProxyFix(app.wsgi_app)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(conf.get('port')), debug=True)
