$(document).on "turbolinks:load", ->
	$('.chat_wrapper').on 'keypress', '.new_message', (e) ->
		if e && e.keyCode == 13
			e.preventDefault()
			if $(this).children().eq(1).val().length > 0
				$(this).submit()
