// 여기는 메인 페이지
// 방 개설 버튼
// 방 입장을 위한 폼 이동 버튼 이벤트 처리


// 채팅방 개설
function makeChattingRoom() {
    $.ajax({
        type: "GET",
        url : "/make",
        success : function() {
            location.href = "/make";
        }
    });
}

// 채팅방 입장 화면 진입
function enterChattingRoomView() {
    $.ajax({
        type: "GET",
        url : "/enter",
        success : function() {
            location.href="/enter";
        }
    });
}


// // 채팅방 입장
// function enterChattingRoom() {
//     // $.ajax({
//     //     type : "POST",
//     //     url : "/enter",
//     //     data : {
//     //         "roomId" : "",
//     //         "nickname" : ""
//     //     },
//     //     error : function(request) {
//     //         console("별명이나 방번호 잘못 입력함");
//     //     }
//     // });
// }