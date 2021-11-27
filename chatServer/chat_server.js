// Require the packages we will use:

const http = require("http"),
    fs = require("fs"),
    mime = require('mime');

const port = 3456;
const file = "client.html";
// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html, on port 3456:
const server = http.createServer(function (req, res) {
    // This callback runs when a new connection is made to our HTTP server.

    fs.readFile(file, function (err, data) {
        // This callback runs when the client.html file has been read from the filesystem.
        if (err) return res.writeHead(500);
        var mimetype = mime.getType(file);
        res.writeHead(200, {
            "Content-Type": mimetype
        });
        res.writeHead(200);
        res.end(data);
    });
       
});
server.listen(port);

// Import Socket.IO and pass our HTTP server object to it.
const socketio = require("socket.io")(http, {
    wsEngine: 'ws'
});

let users = [] // usernames
let user_to_id = {}; // map username to id
let id_to_user = {}; // map id to username
let chat_rooms = {}; // {room_id: {"creator_id": x1, "room_name": x2, "room_password": x3}, }
let chat_rooms_info = [];
let next_room_id = 0;
let msg_id = 0;
let lobby_users = [];   // track all users in lobby
let rooms_users = {}; // track all users in each room {room_id1: [user1, user 2], room_id2: [user3, user 4], }
let rooms_admins = {}; // track all admins for each room {room_id1: [admin1_id], room_id2: [admin1_id, admin2_id], }
let rooms_bans = {}; // track all banned users in each room {room_id1: [ban1, ban2], room_id2: [ban1], }
// ban list

// Attach our Socket.IO server to our HTTP server to listen
const io = socketio.listen(server);
io.sockets.on("connection", function (socket) {
    // create a new user. Communicate only with user
    socket.on('new_user', function (data) {
        if (data['username'].length == 0) {
            io.sockets.to(data["id"]).emit("create_user_status", false, "Username cannot be empty!");
        } else if(users.includes(data['username'])) {
            io.sockets.to(data["id"]).emit("create_user_status", false, "Username alerady exist!");
        } else {
            users.push(data['username']);
            lobby_users.push(data['username']);
            user_to_id[data['username']] = data['id'];
            id_to_user[data['id']] = data['username'];

            io.sockets.to(data["id"]).emit("create_user_status", true, "Success!");
            io.sockets.to(data["id"]).emit("avail_rooms", data["username"], chat_rooms_info, rooms_admins, rooms_users, rooms_bans);
        }
    }); 

    // create a new_room. broad cast to everyone who is in the lobby
    socket.on('new_room', function (data) {
        let is_creatable = "";
        if (data["room_name"].length == 0) {
            is_creatable = "Room name cannot be empty!";
        }
        for (let i = 0; i < chat_rooms_info.length; i++) {
            if (data["room_name"] == chat_rooms_info[i]["room_name"]) {
                is_creatable = "Room name must be unique!";
                break;
            }
        }
        // if can create room
        if (is_creatable.length == 0) {
            // add create to room admin
            let room_id = "room" + next_room_id++;
            rooms_admins[room_id] = [id_to_user[data["id"]]];
            rooms_users[room_id] = [];
            rooms_bans[room_id] = [];
            // create chat room
            chat_rooms[room_id] = {"creator_id": data["id"],
                                   "room_id": room_id,
                                   "room_name": data["room_name"],
                                   "room_password": data['room_password']};
            
            chat_rooms_info.push(chat_rooms[room_id]);
            

            // display avail chat rooms to users who are in the lobby
            for (let i = 0; i < lobby_users.length; i++) {
                io.sockets.to(user_to_id[lobby_users[i]]).emit("avail_rooms", lobby_users[i], chat_rooms_info, rooms_admins, rooms_users, rooms_bans);
            }
            io.sockets.to(data['id']).emit("create_room_msg", {"success":true, "room_name": data["room_name"], "error_msg": is_creatable});
        } else {
            // if cannot create room
            io.sockets.to(data['id']).emit("create_room_msg", {"success":false, "room_name": data["room_name"], "error_msg": is_creatable});
        }
    });

    // find item index in an array
    let item_idx = (array, item) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == item) {
                return i;
            }
        }
        return -1;
    };

    socket.on('join_room', function (user_id, room_id) {
        let user = id_to_user[user_id];
        console.log(user, " has joined");
        // add user to current room
        if (rooms_users[room_id].includes(user) == false){
            rooms_users[room_id].push(user);
        }
        // remove user from lobby
        lobby_users.splice(item_idx(lobby_users, user), 1)
        // join
        io.sockets.sockets.get(user_id).join(room_id);
        let users_ = rooms_users[room_id];
        for (let i = 0; i < users_.length; i++) {
            io.sockets.to(user_to_id[users_[i]]).emit("room_info_update", users_[i], room_id, rooms_admins, rooms_users, rooms_bans);
        }

        console.log("current room members:", rooms_users);
    });

    // make admin
    socket.on('make_admin', function (user, room_id) {
        console.log(user, "becomes admin");
        // add to admin list
        if(rooms_admins[room_id].includes(user) == false) {
            rooms_admins[room_id].push(user);
        }
        // update view for current room users
        let users_ = rooms_users[room_id];
        for (let i = 0; i < users_.length; i++) {
            io.sockets.to(user_to_id[users_[i]]).emit("room_info_update", users_[i], room_id, rooms_admins, rooms_users, rooms_bans);
        }

        console.log("Members:", rooms_users);
    });

    // ban user from room
    socket.on('ban_user', function (user, room_id) {
        console.log("ban:", user);
        io.sockets.sockets.get(user_to_id[user]).leave(room_id);
        // remove from room
        let room_users = rooms_users[room_id];
        room_users.splice(item_idx(room_users, user), 1);
        rooms_users[room_id] = room_users;
        // add to ban_list
        if(rooms_bans[room_id].includes(user) == false) {
            rooms_bans[room_id].push(user);
        }
        // update view for current room users
        let users_ = rooms_users[room_id];
        for (let i = 0; i < users_.length; i++) {
            io.sockets.to(user_to_id[users_[i]]).emit("room_info_update", users_[i], room_id, rooms_admins, rooms_users, rooms_bans);
        }
        // add user to lobby
        lobby_users.push(user);
        io.sockets.to(user_to_id[user]).emit("avail_rooms", user, chat_rooms_info, rooms_admins, rooms_users, rooms_bans);

        console.log("Members:", rooms_users);
    });

    // send to a user
    socket.on('leave_room', function (user, room_id) {
        console.log(user, "left");
        // remove user from room
        io.sockets.sockets.get(user_to_id[user]).leave(room_id);
        let room_users = rooms_users[room_id];
        room_users.splice(item_idx(room_users, user), 1);
        rooms_users[room_id] = room_users;
        // update view for current room users
        let users_ = rooms_users[room_id];
        for (let i = 0; i < users_.length; i++) {
            io.sockets.to(user_to_id[users_[i]]).emit("room_info_update", users_[i], room_id, rooms_admins, rooms_users, rooms_bans);
        }
        // add user to lobby
        lobby_users.push(user);
        io.sockets.to(user_to_id[user]).emit("avail_rooms", user, chat_rooms_info, rooms_admins, rooms_users, rooms_bans);

        console.log("Members:", rooms_users);
    });

    socket.on('destroy_room', function (room_id) {
        let users_ = rooms_users[room_id];
        // remove user from room
        for(let i = 0; i < chat_rooms_info.length; i++) {
            if (chat_rooms_info[i]["room_id"].localeCompare(room_id) == 0) {
                chat_rooms_info.splice(i, 1);
                break;
            }
        }
        delete rooms_admins[room_id];
        delete rooms_users[room_id];
        delete rooms_bans[room_id];
        delete chat_rooms[room_id];
        for (let i = 0; i < users_.length; i++) {
            // add user to lobby
            io.sockets.sockets.get(user_to_id[users_[i]]).leave(room_id);
            lobby_users.push(users_[i]);
            io.sockets.to(user_to_id[users_[i]]).emit("avail_rooms", users_[i], chat_rooms_info, rooms_admins, rooms_users, rooms_bans);
        }
        console.log("Room destroyed");
    });

    socket.on('logout', function () {
        socket.disconnect();
    });

    socket.on('new_message', function (data) {
        let private_user = data['private_user'];
        // check if it is a private msg
        if (private_user) {
            io.sockets.to(data["id"]).to(user_to_id[private_user]).emit("new_message_update", data['id'], data['username'], data['user_msg'], msg_id++);
        } else {
            io.sockets.to(data["room"]["room_id"]).emit("new_message_update", data['id'], data['username'], data['user_msg'], msg_id++);
        }
    });

    socket.on('new_private_message', function (data) {
        io.sockets.to(data["room"]["room_id"]).emit("new_message_update", data['id'], data['username'], data['user_msg'], msg_id++);
    });

    socket.on('new_file', function (room_id, id, username, img_file) {
        io.sockets.to(room_id).emit("new_message_update", id, username, "", msg_id);
        io.sockets.to(room_id).emit("new_image_update", username, msg_id++, img_file);
    });
});