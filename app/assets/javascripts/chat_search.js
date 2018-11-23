
$("document").ready(function() {
  $("#chat_search").on("keydown", function(e) {
    text = $("#chat_search").val()
    if (char_is_printable(e.keyCode)) {
      text += String.fromCharCode(e.keyCode)
    }
    if (e.keyCode == 8 && text.length > 0) {
      text = text.slice(0, -1)
    }
    text = text.toLowerCase()
    $.ajax({
      url: "chatrooms/filter_chatbox",
      type: "GET",
      dataType: "script",
      data: {filter: text}
    })
  })
})

function char_is_printable(kc) {
  if (kc == 8 || kc == 13 || kc == 9 || kc == 16 || kc == 20) { //backspace, enter, tab, shift, caps
    return false
  }
  return true
}
