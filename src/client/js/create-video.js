import "../scss/components/create-video.scss";    
//file drag and drop
document.addEventListener("DOMContentLoaded", () => {
    const selectFilesButton = document.querySelector("#select-files-button");
    const uploadsFilePicker = document.querySelector("#wtcp-uploads-dialog-file-picker");
    const fileDataForm = document.querySelector("#filedata-form");
    const fileDataInput = document.querySelector("#filedata-input");
    const preventDefaultConfig = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    [
        "dragenter",
        "dragover",
        "drop",
        "dragleave",
        "dragend"
    ].forEach((dragEventName) => {
        uploadsFilePicker.addEventListener(dragEventName, preventDefaultConfig, false);
    });
    selectFilesButton.addEventListener("click", () => {
        fileDataInput.click();
    });
    uploadsFilePicker.addEventListener("dragenter", () => {
        uploadsFilePicker.classList.remove("drag-out");
        uploadsFilePicker.classList.add("drag-in");
    });
    uploadsFilePicker.addEventListener("dragleave", () => {
        uploadsFilePicker.classList.remove("drag-in");
        uploadsFilePicker.classList.add("drag-out");
    });
    uploadsFilePicker.addEventListener("drop", (event) => {
        uploadsFilePicker.classList.remove("drag-in");
        const fileData = event.dataTransfer.files;
        if (fileData.length > 0) {
            fileDataInput.files = fileData;
            fileDataForm.submit();
        };
    });
    fileDataInput.addEventListener("change", (event) => {
        if (fileDataInput.files.length > 0) {
            fileDataForm.submit();
        };
    });
});
//title, description input chat counter
document.addEventListener("DOMContentLoaded", () => {
    const titleTextbox = document.querySelector(
        "#title-textarea.wtcp-video-title #textbox.wtcp-social-suggestions-textbox"
    );
    const titleCharCounter = document.querySelector(
        "#title-textarea.wtcp-video-title .char-counter.wtcp-social-suggestions-textbox"
    );
    const descriptionTextbox = document.querySelector(
        "#description-textarea.wtcp-video-description #textbox.wtcp-social-suggestions-textbox"
    );
    const descriptionCharCounter = document.querySelector(
        "#description-textarea.wtcp-video-description .char-counter.wtcp-social-suggestions-textbox"
    );
    if (titleTextbox && descriptionTextbox) {
        const updateTitleLength = () => {
            const titleLength = titleTextbox.textContent.length;
            titleCharCounter.textContent = `${titleLength}/100`;
        };
        const updateDescriptionLength = () => {
            const descriptionLength = descriptionTextbox.textContent.length;
            descriptionCharCounter.textContent = `${descriptionLength}/5000`
        };
        titleTextbox.addEventListener("input", updateTitleLength);
        descriptionTextbox.addEventListener("input", updateDescriptionLength);
        updateTitleLength();
        updateDescriptionLength();
    };
});
//metadata textbox focus/blur styling
document.addEventListener("DOMContentLoaded", () => {
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
    const titleContainer = document.querySelector(
        "#title-textarea.wtcp-video-title #container.wtcp-form-input-container-html-tag"
    );
    const titleTextbox = document.querySelector(
        "#title-textarea.wtcp-video-title #textbox.wtcp-social-suggestions-textbox"
    );
    const descriptionContainer = document.querySelector(
        "#description-textarea.wtcp-video-description #container.wtcp-form-input-container-html-tag"
    );
    const descriptionTextbox = document.querySelector(
        "#description-textarea.wtcp-video-description #textbox.wtcp-social-suggestions-textbox"
    );
    setupFocusBlurHandlers(titleContainer, titleTextbox);
    setupFocusBlurHandlers(descriptionContainer, descriptionTextbox); 
});
//metadata texbox value to metadata form / button form submit
document.addEventListener("DOMContentLoaded", () => {
    const formTitleData = document.querySelector("#file-metadata-form #file-metadata-title");
    const formDescriptionData = document.querySelector("#file-metadata-form #file-metadata-description");
    const titleTextbox = document.querySelector("#title-textarea.wtcp-video-title #textbox.wtcp-social-suggestions-textbox");
    const descriptionTextbox = document.querySelector("#description-textarea.wtcp-video-description #textbox.wtcp-social-suggestions-textbox");
    const submitButton = document.querySelector(".wtcp-button-shape-html-tag.wtcp-button button[aria-label='저장']");
    if (submitButton) {
        submitButton.addEventListener("click", () => {
            const fileMetaDataForm = document.querySelector("#file-metadata-form");
            fileMetaDataForm.submit();
        });
    };
    if (titleTextbox) {
        titleTextbox.addEventListener("input", () => {
            formTitleData.value = titleTextbox.textContent;
        });
    };
    if (descriptionTextbox) {
        descriptionTextbox.addEventListener("input", () => {
            formDescriptionData.value = descriptionTextbox.textContent;
        });
    };
});