from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import eventlet

eventlet.monkey_patch()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key-here'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

# Store active rooms and users
rooms = {}
users = {}

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    user_id = request.sid
    for room_id in rooms:
        if user_id in rooms[room_id]['users']:
            leave_room(room_id)
            rooms[room_id]['users'].remove(user_id)
            emit('user_left', {'userId': user_id}, room=room_id)
            if not rooms[room_id]['users']:
                del rooms[room_id]
    if user_id in users:
        del users[user_id]

@socketio.on('join_room')
def handle_join_room(data):
    room_id = data['roomId']
    user_id = request.sid
    
    if room_id not in rooms:
        rooms[room_id] = {'users': []}
    
    join_room(room_id)
    rooms[room_id]['users'].append(user_id)
    users[user_id] = room_id
    
    emit('user_joined', {'userId': user_id}, room=room_id)

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = data['roomId']
    user_id = request.sid
    
    if room_id in rooms and user_id in rooms[room_id]['users']:
        leave_room(room_id)
        rooms[room_id]['users'].remove(user_id)
        emit('user_left', {'userId': user_id}, room=room_id)
        
        if not rooms[room_id]['users']:
            del rooms[room_id]

@socketio.on('relay_signal')
def handle_relay_signal(data):
    emit('signal_received', {
        'signal': data['signal'],
        'from': request.sid
    }, to=data['to'])

@socketio.on('send_message')
def handle_send_message(data):
    emit('message_received', {
        'text': data['text'],
        'sender': data['sender'],
        'time': data['time']
    }, room=data['roomId'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
