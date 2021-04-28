// Create WebSocket connection.
// var http = 'wss://ws-chat123.herokuapp.com';
var http = 'ws://localhost:5000';

const ws = new WebSocket(http);

var receiver = "";
var sender = "";

// Connection opened
ws.onopen = () => {
    console.log('ws open');
}

ws.onmessage = (e) => {
    var event = JSON.parse(e.data)
    console.log(event);

    // list user
    if (event.method === 'users') {
        $("#list-user").html('');
        event.result.users.forEach(row => {
            if (row.user != sender) {
                var html = $("#list-user").html();
                var html2 = '<tr><td><a href="#" onClick="onUser(this.innerHTML);">' + row.user + '</a></td></tr>';
                $("#list-user").html(html + html2);
            }
        });
    }

    if (event.method === 'message') {
        var html = $("#list-chat").html();
        var html2 = '<ul><li>' + event.result.from + ' ~ ' + event.result.message + '</li></ul>';
        $("#list-chat").html(html + html2);
    }
};

ws.onclose = () => {
    console.log('ws close');
}

function onUser(user) {
    console.log('Receiver : ' + user);
    receiver = user;
    var html = '<h4 class="form-label" id="title">Message with ' + user + '</h4>';
    $("#title").html(html);
}

window.send = (data) => {
    ws.send(JSON.stringify(data))
}

$("#login").click(function() {
    var username = $('#username').val();
    sender = username;
    send({ id: 1, method: 'username', params: { username: username } })
});

$("#send").click(function() {
    if (receiver !== '') {
        var message = $('#message').val();
        send({ method: 'message', params: { from: sender, to: receiver, message: message } });

        var html = $("#list-chat").html();
        var html2 = '<ul><li> me ~ ' + message + '</li></ul>';
        $("#list-chat").html(html + html2);
    } else {
        alert('Penerima belum dipilih!')
    }
});

$("#refresh").click(function() {
    send({ method: 'users' })
});