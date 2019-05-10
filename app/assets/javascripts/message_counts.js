var message_counts;

$("document").ready(function() {
	var num_chats = $("#chatbox_chat_wrap").prop("childElementCount")
	message_counts = new Array(num_chats).fill(0)
})
