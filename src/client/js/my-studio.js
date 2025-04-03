import "../scss/components/my-studio.scss";

document.addEventListener("DOMContentLoaded", () => {
    const contentSectionHeader = document.querySelector("wtcp-content-section .header");
    const primaryActionBar = document.querySelector("wtcp-primary-action-bar");
    const videoSectionContent = document.querySelector("wtcp-video-section-content");
    const stuckToLeftHeader = document.querySelector("#stuck-to-left-header");
    const rowContainer = document.querySelectorAll("#row-container");
    const accountDropdown = document.querySelector(".wtcp-popup-container.account-dropdown");
    const topbarAccountButton = document.querySelector("button[aria-label=Account]");
    const createDialogButton = document.querySelector("wtcp-button[label=만들기]");
    const createDialog = document.querySelector("#creation-menu tp-wt-paper-dialog");
    const videoUploadButton = createDialog.querySelector("#text-item-0");
    const uploadAnchor = videoUploadButton.querySelector("a");

    let IS_ACCOUNT_DROPDOWN_VISIBLE = false;
    let IS_CREATE_DIALOG_VISIBLE = false;


    contentSectionHeader.style.width = `${window.innerWidth - 256}px`;
    primaryActionBar.style.width = `${window.innerWidth - 256}px`;
    videoSectionContent.style.width = `${window.innerWidth - 256}px`;
    stuckToLeftHeader.style.width = `${window.innerWidth - 256}px`;

    rowContainer.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            element.classList.add("row-highlighted");
            element.querySelector("wtcp-video-list-cell-video").setAttribute("is-highlighted", "");
        });
        element.addEventListener("mouseleave", () => {
            element.classList.remove("row-highlighted");
            element.querySelector("wtcp-video-list-cell-video").removeAttribute("is-highlighted");
        });
    });


    function accountDropdownToggle() {
        if (IS_ACCOUNT_DROPDOWN_VISIBLE) {
            accountDropdown.style.display = "none";
            accountDropdown.style.zIndex = "";
            accountDropdown.setAttribute("aria-hidden", "true")
            IS_ACCOUNT_DROPDOWN_VISIBLE = false;
        } else {
            accountDropdown.style.zIndex = "2022";
            accountDropdown.style.display = "";
            accountDropdown.style.position = "fixed";
            accountDropdown.style.left = `${topbarAccountButton.offsetLeft - 286}px`;
            accountDropdown.style.top = `${topbarAccountButton.offsetTop}px`;
            accountDropdown.setAttribute("aria-hidden", "false")
            IS_ACCOUNT_DROPDOWN_VISIBLE = true;
        };
    };
    function createDialogToggle() {
        if (IS_CREATE_DIALOG_VISIBLE) {
            createDialog.style.display = "none";
            createDialog.style.zIndex = "";
            createDialog.setAttribute("aria-hidden", "true");
            IS_CREATE_DIALOG_VISIBLE = false;
        } else {
            createDialog.style.display = "";
            createDialog.style.zIndex = "2022";
            createDialog.style.position = "fixed";
            createDialog.style.left = `${createDialogButton.offsetLeft - createDialog.offsetWidth + createDialogButton.offsetWidth}px`;
            createDialog.style.top = `${createDialogButton.offsetTop + createDialogButton.offsetHeight}px`
            createDialog.setAttribute("aria-hidden", "false");
            IS_CREATE_DIALOG_VISIBLE = true;
        };
    };
    topbarAccountButton.addEventListener("click", accountDropdownToggle);
    createDialogButton.addEventListener("click", createDialogToggle);
    videoUploadButton.addEventListener("click", () => uploadAnchor.click());
});