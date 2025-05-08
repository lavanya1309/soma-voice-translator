from flask_socketio import emit

def register_socket_events(socketio):
    @socketio.on('create_room')
    def handle_create_room(room_id):
        emit('room_created', {'roomId': room_id})
    
    @socketio.on('request_join')
    def handle_request_join(data):
        room_id = data['roomId']
        user_id = request.sid
        emit('join_requested', {'userId': user_id}, room=room_id)
    
    @socketio.on('approve_join')
    def handle_approve_join(data):
        emit('join_approved', {
            'roomId': data['roomId'],
            'target': data['target']
        })
