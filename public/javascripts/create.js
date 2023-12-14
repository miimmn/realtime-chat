


// 방번호, 닉네임 입력 후 생성 버튼 누를 때 로직
function create() {
    var roomId = $('#roomId').val();
    var nickname = $('#nickname').val();

    $.ajax({
        type : "POST",
        url : `/make?roomId=${roomId}&nickname=${nickname}`, 
        success : function() {
            location.href =  `/chattingRoom?roomId=${roomId}&nickname=${nickname}`;  // GET 메소드, 렌더링 용
        },
        error: function(error) {
            // 이미 존재하는 방 번호이면
            $('#invalid-feedback-room').show();
        }
    });
}