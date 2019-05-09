$(document).on "turbolinks:load", ->
	$('#chat_wrapper1').on 'keypress', '.new_message', (e) ->
		if e && e.keyCode == 13
			e.preventDefault()
			$(this).submit()
