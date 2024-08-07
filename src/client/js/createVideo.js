document.addEventListener("DOMContentLoaded", () => {
    const filePickerZone = document.querySelector("#wtcp-uploads-dialog-file-picker");
    const filePickerForm = document.querySelector("#file-picker-form");
    const fileInput = document.querySelector("#file-input");
    const selectFileBtn = document.querySelector("#select-files-button");
    const errArea = document.querySelector(".error-area.wtcp-uploads-file-picker");
    const errMsg = errArea.querySelector(".error-details.wtcp-uploads-file-picker .wt-formatted-string");
    const preventDefaultConfig = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    ["dragenter", "dragover", "drop", "dragleave", "dragend"]
        .forEach((dragEventName) => {
            filePickerZone.addEventListener(dragEventName, preventDefaultConfig, false);
        });

    selectFileBtn.addEventListener("click", () => { fileInput.click() });

    fileInput.addEventListener("change", () => {
        const videoFile = fileInput.files;
        console.log(videoFile);
        if (videoFile.length > 0 && videoFile[0].type.startsWith("video/")) {
            filePickerForm.submit()
        } else {
            errMsg.textContent === "파일 형식이 잘못되었습니다.";
            errArea.style.display === "flex";
        };
    });

    filePickerZone.addEventListener("dragover", () => {
        filePickerZone.classList.add("drag-in");
    });

    filePickerZone.addEventListener("dragleave", () => {
        filePickerZone.classList.remove("drag-in");
    });
    
    filePickerZone.addEventListener("drop", (event) => {
        filePickerZone.classList.remove("drag-in");
        const videoFile = event.dataTransfer.files;
        if (videoFile.length > 0 && videoFile[0].startsWith("video/")) {
            fileInput.files = videoFile;
            filePickerForm.submit();
        } else {
            errMsg.textContent === "파일 형식이 잘못되었습니다.";
            errArea.style.display === "flex";
        };
    });
});