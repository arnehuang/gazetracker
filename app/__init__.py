from flask import Flask
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_moment import Moment
from flask_pagedown import PageDown
from config import config
from werkzeug.contrib.fixers import ProxyFix

bootstrap = Bootstrap()
db = SQLAlchemy()
moment = Moment()
pagedown = PageDown()

# login_manager = LoginManager()
# login_manager.init_app(application)
# login_manager.login_view = "gazetest.login"
# login_manager.login_view = 'auth.login'


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    if not app.config['DEBUG'] and not app.config['TESTING']:
        # configure logging for production

        # send standard logs to syslog
        import logging
        from logging.handlers import SysLogHandler
        syslog_handler = SysLogHandler()
        syslog_handler.setLevel(logging.WARNING)
        app.logger.addHandler(syslog_handler)

    bootstrap.init_app(app)
    db.init_app(app)
    moment.init_app(app)
    pagedown.init_app(app)
    # login_manager.init_app(app)

    from .gazetest import gazetest as gazetest_blueprint
    app.register_blueprint(gazetest_blueprint)
    app.wsgi_app = ProxyFix(app.wsgi_app)

    return app
