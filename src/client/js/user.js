/*user loain*/
document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector("#sign_in_form.signin-form");
    const accountNameInput = document.querySelector("[dir=ltr] #account_name_text_field.form-textbox-input");
    accountNameInput.addEventListener("focus", () => {
        signInForm.classList.add("has-focus");
    });
    accountNameInput.addEventListener("blur", () => {
        signInForm.classList.remove("has-focus");
    });
});