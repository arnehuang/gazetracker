from flask import Flask, render_template
from flask_sslify import SSLify
import os
app = Flask(__name__)

if 'DYNO' in os.environ:
    sslify = SSLify(app)

@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()