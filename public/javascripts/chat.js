// 채팅방에 들어온 후 쓰는거
// 메시지 보내고 메시지 받아오고 이런 거

const socket = io();

var roomId;
var nickname;

// 채팅방에 입장한 상태... 
$(function() {

    const params = new URL(location.href).searchParams;
    roomId = params.get('roomId');
    nickname = params.get('nickname');

    // 이전 대화 목록 불러오기 - 중간 입장의 경우
    $.ajax({
        type : "GET",
        url : `/initial?roomId=${roomId}`,
        success: function(data){
            initial(data);
        },
        // 없을 경우
        error : function(){
        }
    });

    socket.emit('joinRoom', roomId, nickname);

    socket.on('joinRoom', (roomId, name) => {
        addSystemChat(name+'님이 들어왔습니다!');
        scrollBottom();
    });

    socket.on('chat message', (name, msg) => {
        //  $('#chattingList').append($('<li>').text(name + '  :  ' +msg));

         if( name == nickname) {
            addMyChat(name, msg);
         }
         else {
            addOtherChat(name, msg);
         }
        scrollBottom();
    });

    socket.on('leaveRoom', (roomId, name) => {
        addSystemChat(nickname+'님이 나갔습니다.');
    });


    $("#inputMsg").keydown(function (key) {
        var msg = $('#inputMsg').val();
        if (key.keyCode == 13) {
            if(msg != '') {
                send();
            }
        }
    });
})

// 메시지 전송
function send() {
    var msg = $('#inputMsg').val();
    console.log("보내는 메시지 : ",msg);
    socket.emit('chat message', roomId, nickname, msg);
    $('#inputMsg').val('');
}

// 초기 대화 내역 세팅
function initial(data) {
    for(const element of data) {
        if(element[0] == nickname) {
            addMyChat(element[0], element[1]);
        }
        else {
            addOtherChat(element[0], element[1]);
        }
    }
}

// 내 채팅 추가
function addMyChat(nickname, msg) {
    
    var container = $('<li>');
    var box = $('<div>').attr('class', 'myContainer');
    var nicknameSpan = $('<div>')
                        .attr('class', "myNickname")
                        .text(nickname);
    var msgSpan = $('<div>')
                        .attr('class', 'myMsg rounded-3 p-1')
                        .attr('style', 'width : 200px;  text-align : left; display : inline-block; background-color : #CED4DA;')
                        .text(msg);

    box.append(nicknameSpan).append(msgSpan)    
    container.append(box);
    $('#chattingList').append(container);
}

// 다른 사람 채팅 추가
function addOtherChat(nickname, msg) {

    var container = $('<li>');
    var box = $('<div>').attr('class', 'otherContainer');
    var nicknameSpan = $('<div>')
                        .attr('class', "otherNickname")
                        .text(nickname);
    var msgSpan = $('<div>')
                        .attr('class', 'otherMsg rounded-3 p-1')
                        .attr('style', 'width : 200px; text-align : left; display : inline-block;  background-color : #C8E6C9;')
                        .text(msg);
    
    
    box.append(nicknameSpan).append(msgSpan)    
    container.append(box);
    $('#chattingList').append(container);
}

// 시스템 메시지 추가
function addSystemChat(msg) {

    var container = $('<li>').attr('class', 'systemContainer');
    var contentSpan = $('<div>')
                        .attr('class', "systemMsg d-flex justify-content-center")
                        .text(msg);
    
    container.append(contentSpan);
    $('#chattingList').append(container);
}

// 채팅 제일 밑으로 (최신 메시지로)
function scrollBottom(){
    $('#chattingScroll').scrollTop($('#chattingScroll')[0].scrollHeight);
}


// 채팅방 나가기
function exit(){
    socket.emit('leaveRoom', roomId, nickname);
    location.href = '/'; // 메인으로 이동
}