from config import config
from flask import Flask
from werkzeug.contrib.fixers import ProxyFix


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


    from .gaze import gaze as gaze_blueprint
    app.register_blueprint(gaze_blueprint)

    app.wsgi_app = ProxyFix(app.wsgi_app)

    return app