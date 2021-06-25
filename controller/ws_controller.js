const users = [];
const client = [];

const send = (ws, data) => {
    const d = JSON.stringify({
        jsonrpc: '2.0',
        ...data
    });
    ws.send(d);
}

const isUsernameTaken = (username) => {
    let taken = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            taken = true;
            break;
        }
    }
    return taken;
}

function findIndex(name) {
    var i = 0;
    for (i = 0; i < users.length; i++) {
        if (users[i].username === name) {
            return i;
        }
    }
    return i;
}

function updateData(arg, ws) {
    users[arg].ws = ws;
}

module.exports = (ws, req) => {
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);

        switch (data.method) {
            case 'username':
                if (isUsernameTaken(data.params.username)) {
                    updateData(findIndex(data.params.username), ws);
                    send(ws, {
                        id: data.id,
                        method: 'login',
                        error: { status: 'update' }
                    })
                } else {
                    users.push({
                        username: data.params.username,
                        ws: ws,
                    });
                    send(ws, {
                        id: data.id,
                        method: 'login',
                        result: { status: 'success' }
                    })
                }
                break;

            case 'message':
                var user = users.find(e => e.username == data.params.to)
                console.log('from: ' + data.params.from + ' to: ' + data.params.to + ' message: ' + data.params.message);
                send(user.ws, {
                    method: 'message',
                    result: {
                        from: data.params.from,
                        message: data.params.message
                    }
                })
                break;

            case 'users':
                const list = [];
                users.forEach(user => {
                    list.push({
                        user: user.username
                    })
                })
                users.forEach(user => {
                    send(user.ws, {
                        method: 'users',
                        result: {
                            users: list,
                        }
                    })
                })
                break;

        }

        console.log(data);
        switch (data.type) {
            case 'socket':
                if (isIdTaken(data.user_id)) {
                    isIdUpdate(findId(data.user_id), ws);
                    
                }else{
                    client.push({
                        user_id: data.user_id,
                        ws: ws,
                    });
                }
                break;
            case 'chat':
                var user = client.find(e => e.user_id == data.recipient_id)
                console.log('from: ' + data.user_id + ' to: ' + data.recipient_id + ' message: ' + data.message);
                send(user.ws, {
                    user_id: data.user_id,
                    message: data.message
                })
                break;
        }

    });
}

const isIdTaken = (id) => {
    let taken = false;
    for (let i = 0; i < client.length; i++) {
        if (client[i].user_id == id) {
            taken = true;
            break;
        }
    }
    return taken;
}

function isIdUpdate(arg, ws) {
    client[arg].ws = ws;
}


function findId(id) {
    var i = 0;
    for (i = 0; i < client.length; i++) {
        if (client[i].user_id === id) {
            return i;
        }
    }
    return i;
}