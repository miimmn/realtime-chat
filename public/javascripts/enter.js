// 방번호 닉네임 입력 후 방에 입장할 때 쓰는 거



// 방번호, 닉네임 입력 후 입장 버튼 누를 때 로직
function enter() {
    var roomId = $('#roomId').val();
    var nickname = $('#nickname').val();

    $.ajax({
        type : "POST",
        url : `/enter?roomId=${roomId}&nickname=${nickname}`, 
        success : function() {
            location.href =  `/chattingRoom?roomId=${roomId}&nickname=${nickname}`;  // GET 메소드, 렌더링 용
        },
        error: function(xhr, status, error) {
            var errorMsg = JSON.parse(xhr.responseText).message;

            // 방이 없는 거면...
            if(errorMsg == 'NOT EXIST') {
                $('#invalid-feedback-nickname').hide();
                $('#invalid-feedback-room').show();
            }

            // 닉네임 중복인 거면...
            else if (errorMsg == 'DUP NICKNAME') {
                $('#invalid-feedback-room').hide();
                $('#invalid-feedback-nickname').show();
            }
        }
    });
}