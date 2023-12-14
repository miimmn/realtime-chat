var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: false}));


var roomList = {};
var userList = {};
var msgList = {};


// ------생성---------------------------------------------------------------------------------------------------------------


// 채팅방 생성 라우트 (렌더링)
exports.makeChattingRoomView = function(req, res) {
    res.render("create");
}

// 유효성 검사 후 알림 실행 (생성)
exports.makeChattingRoom = function(req, res) {
    var roomId = req.query.roomId;
    var nickname = req.query.nickname;

    // 유효성 검사 로직
    // 이미 존재하는 방 번호인지
    if( Object.keys(roomList).includes(roomId)) {
        // res.json({ message : "EXIST"});
        res.status(500);
    }
    else {
        roomList[roomId] = 1;
        userList[roomId] = new Array();
        userList[roomId].push(nickname);
        msgList[roomId] = new Array();

        res.json([{'roomId' : roomId, 'nickname' : nickname}]);
    }
}


// ------입장---------------------------------------------------------------------------------------------------------------


// 채팅방 입장폼 라우트 (렌더링)
exports.enterView = function(req, res) {
    res.render("enter");
}


// 유효성 검사 받고 입장/실패알림 실행 라우트
exports.enter = function(req, res) {
    var roomId = req.query.roomId;
    var nickname = req.query.nickname;

    console.log(roomList);

    // 유효성 검사 로직
    // 있는 방 번호인지 검사
    if(!Object.keys(roomList).includes(roomId)) {
        res.status(500).json({ message : "NOT EXIST"});
    }
    else {
        // 중복된 닉네임인지 검사
        if(userList[roomId].includes(nickname)){
            console.log(userList[roomId]);
            res.status(500).json({ message : "DUP NICKNAME"});
        }
        else {
            roomList[roomId] += 1; // 인원 수 count
            userList[roomId].push(nickname);
            res.json([{'roomId' : roomId, 'nickname' : nickname}]);
        }
    }
}


// 채팅방 입장(렌더링)
exports.chattingRoom = function(req, res) {
    var roomId = req.query.roomId;
    var nickname = req.query.nickname;

    res.render("chat", { 'roomId' : roomId, 'nickname' : nickname});    
}


// ------퇴장---------------------------------------------------------------------------------------------------------------

exports.leave = function(roomId, nickname) {
    // 방 인원 수 카운트 -1
    roomList[roomId] -= 1;
    console.log("현재 인원수 : ",roomList[roomId]);

    // 닉네임 목록에서 빼기
    var find = userList[roomId].indexOf(nickname)
    userList.splice(find,1);
}


// ------중간 입장 시 이전 메시지 불러오기------------------------------------------------------------------------------------
exports.loadMessage = function(req, res) {
    var roomId = req.query.roomId;
    var allMessageData = msgList[roomId];
    res.json(allMessageData);
}


// ------메시지 내용 저장----------------------------------------------------------------------------------------------------
exports.insertMessage = function(roomId, nickname, msg) {
    msgList[roomId].push([nickname, msg]);
}





