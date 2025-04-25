import "../scss/components/account-edit.scss";

document.addEventListener("DOMContentLoaded", () => {
    const avatarEditButton = document.querySelector("wt-avatar-edit-button button")
    const avatarFileInput = avatarEditButton.querySelector("input");
    const showPasswordButton = document.querySelector(".before-password-edit wt-button-shape:last-of-type button");
    const hidePasswordButton = document.querySelector(".after-password-edit button");
    const beforePwEditSection = document.querySelector("#section.before-password-edit");
    const afterPwEditSection = document.querySelector("#section.after-password-edit");
    const accountDeleteButton = document.querySelector("wt-account-delete-button .wt-spec-button-shape--warning.wt-spec-button-shape-next");
    const accountDeleteDialog = document.querySelector("wtcp-account-delete-dialog tp-wt-paper-dialog");
    const deleteCancelButton = document.querySelector("#dialog .header-button");
    const confirmUsernameInput = document.querySelector("#confirm-username.confirm-input");
    const confirmTextInput = document.querySelector("#confirm-text.confirm-input");
    const deleteConfirmButton = document.querySelector(".account-delete-confirm-button");

    avatarEditButton.addEventListener("click", () => {
        avatarFileInput.click();
    });
        
    showPasswordButton.addEventListener("click", () => {
        beforePwEditSection.style.display = "none";
        afterPwEditSection.style.display = "flex";
        
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    });
    
    hidePasswordButton.addEventListener("click", () => {
        beforePwEditSection.style.display = "flex";
        afterPwEditSection.style.display = "none";
    });

    accountDeleteButton.addEventListener("click", () => {
        accountDeleteDialog.style.display = "";
        accountDeleteDialog.style.zIndex = "2202";
        
        const backdrop = document.createElement("div");
        backdrop.classList.add("popup-host-bevavior-backdrop");
        backdrop.setAttribute("style", "position: fixed; pointer-events: none; inset: 0px; background: rgb(0, 0, 0); opacity: 0.55; z-index: 2201;");
        document.querySelector("#account-delete-dialog #dialog").insertAdjacentElement("afterend", backdrop);
        
        const overlayBackdrop = document.createElement("tp-wt-iron-overlay-backdrop");
        overlayBackdrop.setAttribute("style", "opacity: 0; z-index: 2201;");
        overlayBackdrop.classList.add("opened");
        overlayBackdrop.setAttribute("opened", "");
        document.querySelector("wtcp-account-delete-dialog").insertAdjacentElement("afterend", overlayBackdrop);
    });
    
    deleteCancelButton.addEventListener("click", () => {
        accountDeleteDialog.style.display = "none";
        accountDeleteDialog.style.zIndex = "";

        document.querySelector("#account-delete-dialog .popup-host-bevavior-backdrop").remove();
        document.querySelector("tp-wt-iron-overlay-backdrop[opened]").remove();
    });

    confirmUsernameInput.addEventListener("input", (event) => {
        if (confirmUsernameInput.textContent.length > 0) {
            usernameConfirm = true;
        };
    });
    
    confirmTextInput.addEventListener("input", () => {
        if (confirmTextInput.value === "delete my account") {
            deleteConfirmButton.removeAttribute("disabled");
        } else {
            deleteConfirmButton.setAttribute("disabled", "");
        };
    });
});