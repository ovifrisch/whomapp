
$(document).ready(function() {
	$(".chat_wrapper").on("keydown", ".message_field", function() {
		$(this).attr('rows', 1);
		numberOfLines = Math.floor($(this).prop("scrollHeight") / 20);
		$(this).attr('rows', Math.min(3, numberOfLines));

		if (numberOfLines == 1) {
			$(this).parent().parent().height("10%");
			$(this).parent().parent().parent().children().eq(1).height("80%");
		}

		else if (numberOfLines == 2) {
			$(this).parent().parent().height("20%");
			$(this).parent().parent().parent().children().eq(1).height("70%");
		}
		else {
			$(this).parent().parent().height("30%");
			$(this).parent().parent().parent().children().eq(1).height("60%");
		}
	})
});
