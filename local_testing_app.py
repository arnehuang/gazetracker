from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
import sys

# https://blog.didierstevens.com/2015/03/30/howto-make-your-own-cert-with-openssl-on-windows/
# openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes

try:
    PORT = int(sys.argv[1])
except:
    PORT = 4443

httpd = HTTPServer(('localhost', 4443), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket(httpd.socket,certfile='server.pem', server_side=True)
print('running port: ' + str(PORT))
httpd.serve_forever()
