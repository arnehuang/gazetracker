from flask import render_template
from . import gazetest


@gazetest.route('/', methods=['GET'])
@gazetest.route('/hello', methods=['GET'])
def hello():
    return render_template('gazetest/hello.html')

@gazetest.route('/gaze', methods=['GET'])
def scamaz():
    return render_template('gazetest/gaze.html')
