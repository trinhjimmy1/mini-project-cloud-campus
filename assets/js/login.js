const mail = document.getElementById('mail');
const password = document.getElementById('password');
const form = document.getElementById('form');

const signupShow = document.getElementById('linkCreateAccount');
const loginShow = document.getElementById('linkLogin');
const registerForm= document.getElementById('register');
const loginForm = document.getElementById('login');

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			let error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				
				localStorage.setItem("auth", 1);
				this.form.submit();
			}
		});
	}

    validateFields(field) {
        if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} ne peut être vide`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} doit contenir au moins 8 mots`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
    }

    setStatuts(field, message, status) {
        const errorMessage = field.getElementById('error-message');
        if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
    }
}

document.addEventListener("DOMContentLoaded", () => {

    signupShow.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('form--hidden');
        loginForm.classList.add('form--hidden');
    });

    loginShow.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('form--hidden');
        loginForm.remove('form--hidden');
    });

    
});

if(loginForm) {
    const fields = ['email', 'password'];
    const validator = new Login(loginForm, fields);
}