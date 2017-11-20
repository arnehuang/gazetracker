from flask import Flask, render_template
from flask_sslify import SSLify
import os, argparse
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == "__main__":

    app.secret_key = "got bod?"
    parser = argparse.ArgumentParser()
    parser.add_argument('-prod', action='store_true')

    args = parser.parse_args()

    if args.prod:
        print('yup')
        sslify = SSLify(app)
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', port=port, debug=False)
    else:
        print('nope')
        app.run(debug=True)



