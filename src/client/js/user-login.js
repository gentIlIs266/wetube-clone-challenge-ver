import "../scss/components/user-login.scss";
document.addEventListener("DOMContentLoaded", () => {
    /*user loain account input focus resposne*/
    const formUserDiv = document.querySelector("[dir=ltr].form-mouseuser");
    const swpEnableDiv = document.querySelector(".swp-enable.container.si-field-container.password-second-step");
    const signInForm = document.querySelector("#sign_in_form.signin-form");
    const accountNameInput = document.querySelector("#account_name_text_field.form-textbox-input");
    const passwordInput = document.querySelector("#password_text_field.form-textbox-input");
    const firstStepAccountNameDiv = signInForm.querySelector(".account-name");
    const secondStepAccountNameDiv = signInForm.querySelector(".account-name.show-password");
    const showPasswordPlaceholderDiv = document.querySelector(".password.show-password.show-placeholder");
    let dataFocusMethod = "";

    accountNameInput.addEventListener("mousedown", () => {
        dataFocusMethod = "mouse";
        if (formUserDiv.classList.contains("form-keyboarduser")) {
            formUserDiv.classList.remove("form-keyboarduser");
            formUserDiv.classList.add("form-mouseuser");
        };
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            dataFocusMethod = "key";
            if (formUserDiv.classList.contains("form-mouseuser")) {
                formUserDiv.classList.remove("form-mouseuser");
                formUserDiv.classList.add("form-keyboarduser");
            };
        };
    });
    accountNameInput.addEventListener("focus", () => {
        signInForm.classList.add("has-focus");
        firstStepAccountNameDiv.classList.add("wetube-id-focus");
        if (dataFocusMethod === "mouse") accountNameInput.setAttribute("data-focus-method", "mouse");
        if (dataFocusMethod === "key") accountNameInput.setAttribute("data-focus-method", "key");
        if (passwordInput) {
            if (accountNameInput.style.position === "") accountNameInput.style.position = "relative";
            accountNameInput.zIndex = 2;
            if (passwordInput.style.position === "") passwordInput.style.position = "relative";
            passwordInput.zIndex = 0;
        };
    });
    accountNameInput.addEventListener("blur", () => {
        signInForm.classList.remove("has-focus");
        firstStepAccountNameDiv.classList.remove("wetube-id-focus");
        if (accountNameInput.hasAttribute("data-focus-method")) accountNameInput.removeAttribute("data-focus-method")
        if (passwordInput) {
            if (accountNameInput.style.position === "relative")
                accountNameInput.style.position = "";

            accountNameInput.zIndex = "";
            if (accountNameInput.style.position === "relative")
                accountNameInput.style.position = "";

            passwordInput.zIndex = "";
        };
    });
    accountNameInput.addEventListener("input", (event) => {
        signInForm.classList.add("account-name-entered");
        accountNameInput.classList.add("form-textbox-entered");
        if (event.target.value === "") {
            signInForm.classList.remove("account-name-entered");
            accountNameInput.classList.remove("form-textbox-entered");
        };
    });
    if (passwordInput) {
        const passwordInputAutoFocused = document.activeElement;

        swpEnableDiv.classList.add("password-on");
        signInForm.classList.add("account-name-entered");
        signInForm.classList.add("show-password");

        passwordInput.addEventListener("mousedown", () => {
            dataFocusMethod = "mouse";
            if (formUserDiv.classList.contains("form-keyboarduser")) {
                formUserDiv.classList.remove("form-keyboarduser");
                formUserDiv.classList.add("form-mouseuser");
            };
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Tab") {
                dataFocusMethod = "key";
                if (formUserDiv.classList.contains("form-mouseuser")) {
                    formUserDiv.classList.remove("form-mouseuser");
                    formUserDiv.classList.add("form-keyboarduser");
                };
            };
        });
        passwordInput.addEventListener("focus", () => {
            signInForm.classList.add("has-focus");
            signInForm.classList.add("has-password-focus");
            secondStepAccountNameDiv.classList.add("password-focus");
            showPasswordPlaceholderDiv.classList.add("password-focus");
            if (dataFocusMethod === "mouse") passwordInput.setAttribute("data-focus-method", "mouse");
            if (dataFocusMethod === "key") passwordInput.setAttribute("data-focus-method", "key");    
            setTimeout(() => {
                if (passwordInputAutoFocused) showPasswordPlaceholderDiv.classList.add("password-focus");
            }, 10);
            if (passwordInput) {
                if (accountNameInput.style.position === "") accountNameInput.style.position = "relative";
                accountNameInput.zIndex = 0;
                if (passwordInput.style.position === "") passwordInput.style.position = "relative";
                passwordInput.zIndex = 2;
            };
        });
        passwordInput.addEventListener("blur", () => {
            signInForm.classList.remove("has-focus");
            signInForm.classList.remove("has-password-focus");
            secondStepAccountNameDiv.classList.remove("password-focus");
            showPasswordPlaceholderDiv.classList.remove("password-focus");
            if (passwordInput) {
                if (accountNameInput.style.position === "relative") accountNameInput.style.position = "";
                accountNameInput.zIndex = "";
                if (passwordInput.style.position === "relative") passwordInput.style.position = "";
                passwordInput.zIndex = "";
            };
        });
        passwordInput.addEventListener("input", (event) => {
            signInForm.classList.add("password-entered");
            passwordInput.classList.add("form-textbox-entered");
            if (event.target.value === "") {
                signInForm.classList.remove("password-entered")
                passwordInput.classList.remove("form-textbox-entered");
            };
        });
    };

    const disableButton = document.querySelector("#sign-in.si-button.disable");
    /*user login account input submit button*/
    disableButton.addEventListener("click", () => signInForm.submit());
    accountNameInput.addEventListener("input", (event) => {
        disableButton.classList.remove("disable");
        disableButton.setAttribute("aria-disabled", "false");
        disableButton.removeAttribute("disabled");
        if (event.target.value === "") {
            disableButton.classList.add("disable");
            disableButton.setAttribute("aria-disabled", "true");
            disableButton.setAttribute("disabled", "");
        };
    });
    if (passwordInput) {
        passwordInput.addEventListener("input", (event) => {
            disableButton.classList.remove("disable");
            disableButton.setAttribute("aria-disabled", "false");
            disableButton.removeAttribute("disabled");
            if (event.target.value === "") {
                disableButton.classList.add("disable");
                disableButton.setAttribute("aria-disabled", "true");
                disableButton.setAttribute("disabled", "");
            };
        });
    };
});
/*user login error response*/
document.addEventListener("DOMContentLoaded", () => {
    const firstStepAccountNameDiv = document.querySelector(".form-cell-wrapper.form-textbox");
    const swpEnableDiv = document.querySelector(".swp-enable.container.si-field-container.password-second-step");
    if (firstStepAccountNameDiv.classList.contains("is-error")) {
        swpEnableDiv.classList.add("has-error")
    } else {
        if (swpEnableDiv.classList.contains("has-error"))
            swpEnableDiv.classList.remove("has-error");
    };
});