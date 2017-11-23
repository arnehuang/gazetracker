from flask import Blueprint

gaze = Blueprint('gaze', __name__)

from . import routes