var express = require('express');
var router = express.Router();

var controller = require('../controllers/chat.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// 첫 화면 -> 방 생성 버튼 눌렀을 때
router.get("/make", controller.makeChattingRoomView);

// 방번호 & 별명 입력하고 방 생성
router.post("/make", controller.makeChattingRoom);



// 첫 화면 -> 방 입장 버튼 눌렀을 때
router.get("/enter", controller.enterView);

// 방번호 & 별명 입력하고 방 입장
router.post("/enter", controller.enter);



// 채팅방 렌더링 
router.get("/chattingRoom", controller.chattingRoom);

// 입장할 때 이전에 있던 대화내용 불러오기
router.get("/initial", controller.loadMessage);



module.exports = router;
