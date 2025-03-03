import "../scss/components/create-video.scss";    
document.addEventListener("DOMContentLoaded", () => {
    const titleTextbox = document.querySelector("#title-textarea.wtcp-video-title #textbox.wtcp-social-suggestions-textbox");
    const titleCharCounter = document.querySelector("#title-textarea.wtcp-video-title .char-counter.wtcp-social-suggestions-textbox");
    const descriptionTextbox = document.querySelector("#description-textarea.wtcp-video-description #textbox.wtcp-social-suggestions-textbox");
    const descriptionCharCounter = document.querySelector("#description-textarea.wtcp-video-description .char-counter.wtcp-social-suggestions-textbox");
    const titleContainer = document.querySelector("#title-textarea.wtcp-video-title #container.wtcp-form-input-container-html-tag");
    const descriptionContainer = document.querySelector("#description-textarea.wtcp-video-description #container.wtcp-form-input-container-html-tag");
    const formTitleData = document.querySelector("#file-metadata-form #file-metadata-title");
    const formDescriptionData = document.querySelector("#file-metadata-form #file-metadata-description");
    const submitButton = document.querySelector(".wtcp-button-shape-html-tag.wtcp-button button[aria-label='저장']");

    function setupFocusBlurHandlers(container, textbox) {
        let containerFocused = false;
        function handleFocus() {
            containerFocused = true;
            container.classList.add("focused");
        };
        function handleBlur() {
            containerFocused = false;
            container.classList.remove("focused");
        };
        if (container) {
            container.addEventListener("focus", () => {
                if (containerFocused) {
                    container.classList.add("focused");
                };
            });
            container.addEventListener("blur", handleBlur);
            container.addEventListener("click", () => {
                textbox.focus();
                handleFocus();
            });
        };
        if (textbox) {
            textbox.addEventListener("focus", handleFocus);
            textbox.addEventListener("blur", handleBlur);
        };
    };
    setupFocusBlurHandlers(titleContainer, titleTextbox);
    setupFocusBlurHandlers(descriptionContainer, descriptionTextbox); 
    
    if (titleTextbox && descriptionTextbox) {
        function updateTitleLength() {
            const titleLength = titleTextbox.textContent.length;
            titleCharCounter.textContent = `${titleLength}/100`;
        };
        function updateDescriptionLength() {
            const descriptionLength = descriptionTextbox.textContent.length;
            descriptionCharCounter.textContent = `${descriptionLength}/5000`
        };
        updateTitleLength();
        updateDescriptionLength();

        titleTextbox.addEventListener("input", updateTitleLength);
        descriptionTextbox.addEventListener("input", updateDescriptionLength);
        titleTextbox.addEventListener("input", () => formTitleData.value = titleTextbox.textContent);
        descriptionTextbox.addEventListener("input", () => formDescriptionData.value = descriptionTextbox.textContent);
        submitButton.addEventListener("click", () => document.querySelector("#file-metadata-form").submit());
    };
});