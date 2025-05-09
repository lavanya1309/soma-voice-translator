from flask import Flask, send_from_directory
import os
import eventlet
eventlet.monkey_patch()

app = Flask(__name__, static_folder='../client/build')

# ... (keep all your existing socket.io code)

# Add this route to serve React files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
