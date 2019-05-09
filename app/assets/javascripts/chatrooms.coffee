$(document).on "turbolinks:load", ->
	$('.chat_wrapper').on 'keypress', '.new_message', (e) ->
		if e && e.keyCode == 13
			e.preventDefault()
			$(this).submit()
