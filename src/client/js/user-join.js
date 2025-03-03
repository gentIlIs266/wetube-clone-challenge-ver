import "../scss/components/user-join.scss";
document.addEventListener("DOMContentLoaded", () => {    
    /*birthday input help icon hover popover*/
    const birthdayInfoButton = document.querySelector("button[aria-describedby=birthdayInfoMsg]");
    const birthdayInfoMsg = document.querySelector("#birthdayInfoMsg");
    function generateBirthdayPopover() {
        const idmsPopoverContainerDiv = document.createElement("div");
        const idmsPopoverWrapperDiv = document.createElement("div");
        const idmsPopoverDiv = document.createElement("div");
        const msgDiv = document.createElement("div");

        idmsPopoverContainerDiv.classList.add("idms-popover-container");
        idmsPopoverWrapperDiv.classList.add(
            "idms-popover-wrapper",
            "idms-popover-wrapper-direction-top",
            "idms-popover-wrapper-align-center"
        );

        idmsPopoverWrapperDiv.style.top = "-33.2125px";
        idmsPopoverWrapperDiv.style.left = "16.5px";
        idmsPopoverWrapperDiv.style.width = "300px";
        
        idmsPopoverDiv.setAttribute("id", "idms-popover-1727074279636-0");
        idmsPopoverDiv.setAttribute("role", "dialog");
        idmsPopoverDiv.classList.add(
            "idms-popover",
            "idms-popover-direction-top",
            "idms-popover-align-center",
            "idms-popover-type-info",
            "security-code-small-box",
        );
    
        msgDiv.setAttribute("role", "tooltip");
        msgDiv.classList.add("message");
        msgDiv.textContent = "이 정보는 계정에서 사용할 수 있는 서비스를 정하는 데 사용됩니다."
        
        idmsPopoverDiv.appendChild(msgDiv);
        idmsPopoverWrapperDiv.appendChild(idmsPopoverDiv);
        idmsPopoverContainerDiv.appendChild(idmsPopoverWrapperDiv);

        return idmsPopoverContainerDiv;
    };


    /*join submit button action*/
    document.querySelector(".primary-button-group .button.button-primary").addEventListener("click", () => {
        document.querySelector("[method=POST].create-form").submit();
    });

    birthdayInfoButton.addEventListener("mousemove", () => {
        if (!document.querySelector(".idms-popover-container")) {
            const generatedPopover = generateBirthdayPopover();
            birthdayInfoMsg.appendChild(generatedPopover);
        };
    });
    birthdayInfoButton.addEventListener("mouseleave", () => {
        const existingBirthdayPopover = document.querySelector(".idms-popover-container");
        if (existingBirthdayPopover) {
            birthdayInfoMsg.removeChild(existingBirthdayPopover);
        };
    });
    birthdayInfoButton.addEventListener("click", (event) => event.preventDefault());

    /*birthday input formatting*/
    const birthdayInput = document.querySelector("#input-1727167270343-1");
    const defaultDateFormat = "yyyy년 mm월 dd일";
    let currentInput = defaultDateFormat;
    let caretIndex = 0;
    function updateCaretPosition() {
        birthdayInput.setSelectionRange(caretIndex, caretIndex);
    };
    function handleNumberKey (enteredKey) {
        while (
            caretIndex < defaultDateFormat.length &&
            defaultDateFormat[caretIndex] !== "y" &&
            defaultDateFormat[caretIndex] !== "m" &&
            defaultDateFormat[caretIndex] !== "d"
        ) {
            caretIndex++;
        };
        
        if (caretIndex < defaultDateFormat.length && defaultDateFormat[caretIndex] === " ") {
            caretIndex++;
        };
        
        if (caretIndex < defaultDateFormat.length) {
            const caretIndexAt = (positionNum) => caretIndex === positionNum;
            const currnetYear = new Date().getFullYear().toString();
            if (caretIndex >= 0 && caretIndex <= 3) {
                if (caretIndexAt(0)) {
                    if (enteredKey === "0") return;
                    if (enteredKey > currnetYear[0]) return;
                };
                if (caretIndexAt(1)) {
                    const inputFirstDigit = currentInput.charAt(0);
                    if (inputFirstDigit === "1" && enteredKey < 9) return;
                    if (parseInt(`${inputFirstDigit}${enteredKey}`) > parseInt(`${currnetYear[0]}${currnetYear[1]}`)) return;
                };
            };
            if (caretIndex >= 6 && caretIndex <= 7) {
                if (caretIndexAt(6) && enteredKey > "1") return;
                if (caretIndexAt(7)) {
                    const monthFirstDigit = currentInput.charAt(6);
                    if (monthFirstDigit === "1" && enteredKey > "2") return;
                    else if (monthFirstDigit === "0" && enteredKey === "0") return;
                };
            } else if (caretIndex >= 10 && caretIndex <= 11) {
                if (caretIndexAt(10) && enteredKey > "3") return;
                if (caretIndexAt(11)) {
                    const monthFirstDigit = currentInput.charAt(10);
                    if (monthFirstDigit === "3" && enteredKey > "1") return;
                    else if (monthFirstDigit === "0" && enteredKey === "0") return;
                };
            };
        };
        
        currentInput = currentInput.substring(0, caretIndex) + enteredKey + currentInput.substring(caretIndex + 1);
        birthdayInput.value = currentInput;
        caretIndex++;
        
        while (
            caretIndex < defaultDateFormat.length &&
            defaultDateFormat[caretIndex] !== "y" &&
            defaultDateFormat[caretIndex] !== "m" &&
            defaultDateFormat[caretIndex] !== "d"
        ) {
            caretIndex++;
        };
        
        if (caretIndex >= defaultDateFormat.length) {
            if (caretIndex >= currentInput.length) caretIndex = currentInput.length;
            birthdayInput.setSelectionRange(currentInput.length, currentInput.length);
            birthdayInput.setAttribute("value", `${currentInput}`);
        } else {
            updateCaretPosition();
        };
    };
    function handleBackspaceKey () {
        if (caretIndex <= 0) return;
        if (defaultDateFormat[caretIndex - 1] === " ") caretIndex--;
        while (
            defaultDateFormat[caretIndex - 1] !== "y" &&
            defaultDateFormat[caretIndex - 1] !== "m" &&
            defaultDateFormat[caretIndex - 1] !== "d"
        ) {
            caretIndex--;
        };
        
        caretIndex--;
        currentInput = currentInput.substring(0, caretIndex) + defaultDateFormat[caretIndex] + currentInput.substring(caretIndex + 1);
        birthdayInput.value = currentInput;
        
        updateCaretPosition();
    };
    function handleArrowKeys (enteredKey) {
        if (enteredKey === "ArrowLeft" && caretIndex > 0) {
            if (caretIndex === defaultDateFormat.length) {
                caretIndex--;
            } else {
                if (
                    defaultDateFormat[caretIndex - 1] !== "y" &&
                    defaultDateFormat[caretIndex - 1] !== "m" &&
                    defaultDateFormat[caretIndex - 1] !== "d"
                ) {
                    caretIndex--;
                };
                caretIndex--
            };
        } else if (enteredKey === "ArrowRight" && caretIndex < defaultDateFormat.length) {
            if (
                (caretIndex + 1) < defaultDateFormat.length &&
                defaultDateFormat[caretIndex] !== "y" &&
                defaultDateFormat[caretIndex] !== "m" &&
                defaultDateFormat[caretIndex] !== "d"
            ) {
                caretIndex++;
            };
            caretIndex++;
        };
        updateCaretPosition();
    };
    function onBirthdayInputFocus() {
        if (birthdayInput.value === "") {
            birthdayInput.value = defaultDateFormat;
        };
        setTimeout(updateCaretPosition, 5);
    };
    function onBirthdayInputBlur() {
        if (birthdayInput.value === defaultDateFormat) {
            birthdayInput.value = "";
        };
    };
    function onBirthdayInputKeydown(event) {
        const enteredKey = event.key;
        const areAllNumbersEntered = currentInput.includes("y") || currentInput.includes("m") || currentInput.includes("d");
        if (
            (enteredKey >= "0" && enteredKey <= "9") ||
            enteredKey === "Backspace" ||
            enteredKey === "Tab" ||
            enteredKey === "ArrowLeft" ||
            enteredKey === "ArrowRight"
        ) {
            event.preventDefault();
            if (currentInput.replace(/[^0-9]/g, "").length === 8) event.preventDefault();
            
            if (enteredKey >= "0" && enteredKey <= "9") {
                areAllNumbersEntered ? handleNumberKey(enteredKey) : event.preventDefault();
            } else if (enteredKey === "Backspace") {
                handleBackspaceKey();
            } else if (enteredKey === "ArrowLeft" || enteredKey === "ArrowRight") {
                handleArrowKeys(enteredKey);
            } else if (enteredKey === "Tab") {
                //nothing
            } else {
                event.preventDefault();
            };
        };
    };
    function onBirthdayInputValueItSlef(event) {
        const hangulLetter = event.target;
        const removeKorRegExp = /(?!년|월|일)[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        hangulLetter.value = hangulLetter.value.replace(removeKorRegExp, "");
        setTimeout(() => updateCaretPosition, 5);
    };
    
    birthdayInput.addEventListener("focus", onBirthdayInputFocus);
    birthdayInput.addEventListener("blur", onBirthdayInputBlur);
    birthdayInput.addEventListener("keydown", onBirthdayInputKeydown);
    birthdayInput.addEventListener("input", onBirthdayInputValueItSlef);
});