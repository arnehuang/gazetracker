from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
import sys

PORT = int((sys.argv[1] or 4333))

httpd = HTTPServer(('localhost', PORT), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket(httpd.socket,
                               certfile='server.pem', server_side=True)
print('running')
httpd.serve_forever()
