import "../scss/components/user-login.scss";
/*user loain account input focus resposne*/
document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector("#sign_in_form.signin-form");
    const accountNameInput = document.querySelector("[dir=ltr] #account_name_text_field.form-textbox-input");
    accountNameInput.addEventListener("focus", () => {
        signInForm.classList.add("has-focus");
    });
    accountNameInput.addEventListener("blur", () => {
        signInForm.classList.remove("has-focus");
    });
    accountNameInput.addEventListener("input", (event) => {
        signInForm.classList.add("account-name-entered");
        accountNameInput.classList.add("form-textbox-entered");
    });
    accountNameInput.addEventListener("input", (event) => {
        if (event.target.value === "") {
            signInForm.classList.remove("account-name-entered");
            accountNameInput.classList.remove("form-textbox-entered");
        }
    });
});
/*user login account input submit button*/
document.addEventListener("DOMContentLoaded", () => {
    const accountNameInput = document.querySelector("[dir=ltr] #account_name_text_field.form-textbox-input");
    const signInForm = document.querySelector("#sign_in_form.signin-form.hide-password");
    const disableButton = document.querySelector("#sign-in.si-button.disable");
    disableButton.addEventListener("click", () => {
        signInForm.submit();
    });
    accountNameInput.addEventListener("input", (event) => {
        disableButton.classList.remove("disable");
        disableButton.setAttribute("aria-disabled", "false");
        disableButton.removeAttribute("disabled")
    });
    accountNameInput.addEventListener("input", (event) => {
        if (event.target.value === "") {
            disableButton.classList.add("disable");
            disableButton.setAttribute("aria-disabled", "true");
            disableButton.setAttribute("disabled", "")
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const nameErrorWrapper = document.querySelector("#idms-error-wrapper-1726210118058-0");
});