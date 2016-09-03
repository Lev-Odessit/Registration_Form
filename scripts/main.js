$(function(){

	var registrationApp;
	registrationApp = {

		initialize: function () {
			this.setUpListeners();
		},


		setUpListeners: function () {
			var form = $('form');
			form.on('submit', registrationApp.submitForm);
		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]');

			if (registrationApp.validateForm(form) === false) {
				alert('Passwords do not match');
				return false;
			}

			submitBtn.attr('disabled', 'disabled');

			var str = JSON.parse(JSON.stringify(form.serializeArray()));

			$.ajax({
				// Need to uncommits when it will be setup with DB
				// url: 'action/registration.php',
				// type: 'POST',
				data: str,
				success: function () {
					alert('Welcome ' + str[0].value);
					location.reload();
				}
			})
		},

		validateForm: function (form) {

			var password = $('#customerPassword').val(),
				confirmPassword = $('#customerRepeatPassword').val();

			return password === confirmPassword;

		}

	};

	registrationApp.initialize();

});


