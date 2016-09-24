document.addEventListener('DOMContentLoaded', function () {

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

			var form = document.getElementById('regForm'),
				submitBtn = document.getElementById('regBtn');

			if (registrationApp.validateForm(form) === false) {
				alert('Passwords do not match');
				return false;
			}

			submitBtn.disabled = true;

			var customerInfo = registrationApp.serializeForm(form);

			$.ajax({
				data: customerInfo,
				success: function () {
					alert('Welcome ' + customerInfo.firstName + ' ' + customerInfo.secondName);
					location.reload();
				}
			})
		},

		serializeForm: function (form) {
			if (!form || form.nodeName !== "FORM") {
				return;
			}
			var i, j,
				obj = {};
			for (i = form.elements.length - 1; i >= 0; i = i - 1) {
				if (form.elements[i].name === "") {
					continue;
				}
				switch (form.elements[i].nodeName) {
					case 'INPUT':
						switch (form.elements[i].type) {
							case 'text':
							case 'hidden':
							case 'password':
							case 'button':
							case 'reset':
							case 'submit':
								obj[form.elements[i].name] = decodeURIComponent(form.elements[i].value);
								break;
							case 'checkbox':
							case 'radio':
								if (form.elements[i].checked) {
									obj[form.elements[i].name] = decodeURIComponent(form.elements[i].value);
								}
								break;
							case 'file':
								break;
						}
						break;
					case 'TEXTAREA':
						obj[form.elements[i].name] = decodeURIComponent(form.elements[i].value);
						break;
					case 'SELECT':
						switch (form.elements[i].type) {
							case 'select-one':
								obj[form.elements[i].name] = decodeURIComponent(form.elements[i].value);
								break;
							case 'select-multiple':
								for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
									if (form.elements[i].options[j].selected) {
										obj[form.elements[i].name] = decodeURIComponent(form.elements[i].options[j].value);
									}
								}
								break;
						}
						break;
					case 'BUTTON':
						switch (form.elements[i].type) {
							case 'reset':
							case 'submit':
							case 'button':
								obj[form.elements[i].name] = decodeURIComponent(form.elements[i].value);
								break;
						}
						break;
				}
			}
			return obj;
		},

		validateForm: function (form) {

			var password = $('#customerPassword').val(),
				confirmPassword = $('#customerRepeatPassword').val();

			return password === confirmPassword;

		}

	};

	registrationApp.initialize();

});