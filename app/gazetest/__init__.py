from flask import Blueprint

gazetest = Blueprint('gazetest', __name__)

from . import routes

