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
document.addEventListener("DOMContentLoaded", () => {
})