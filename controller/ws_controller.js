const users = [];

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

module.exports = (ws, req) => {
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);

        switch (data.method) {
            case 'username':
                if (isUsernameTaken(data.params.username)) {
                    send(ws, {
                        id: data.id,
                        method: 'login',
                        error: { status: 'username is taken' }
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
                console.log(user.username);
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

    });
}