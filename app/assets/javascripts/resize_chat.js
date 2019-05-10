
function adjust_heights(msg_cont, txt_cont, percent1, percent2) {
	msg_cont.height(percent1);
	txt_cont.height(percent2);
}

$(document).ready(function() {
	$(".chat_wrapper").on("keydown", ".message_field", function(e) {
		$(this).attr('rows', 1);

		var msg_cont = $(this).parent().parent().parent().children().eq(1);
		var txt_cont = $(this).parent().parent();

		if (e && e.keyCode == 13) {
			adjust_heights(msg_cont, txt_cont, "80%", "10%");
			return;
		}
		numberOfLines = Math.floor($(this).prop("scrollHeight") / 20);
		$(this).attr('rows', Math.min(3, numberOfLines));

		if (numberOfLines == 1) {
			adjust_heights(msg_cont, txt_cont, "80%", "10%");
		}

		else if (numberOfLines == 2) {
			adjust_heights(msg_cont, txt_cont, "70%", "20%");
		}
		else {
			adjust_heights(msg_cont, txt_cont, "60%", "30%");
		}
	})
});
