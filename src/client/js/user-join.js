import e from "express";
import "../scss/components/user-join.scss";
/*join submit button action*/
document.addEventListener("DOMContentLoaded", () => {
    const joinForm = document.querySelector("[method=POST].create-form");
    const joinSubmitButton = document.querySelector(".primary-button-group .button.button-primary");
    joinSubmitButton.addEventListener("click", () => {
        joinForm.submit();
    });
});
/*birthday input help icon touch popover*/
document.addEventListener("DOMContentLoaded", () => {
    const birthdayInfoButton = document.querySelector("button[aria-describedby=birthdayInfoMsg]");
    const birthdayInfoMsg = document.querySelector("#birthdayInfoMsg");
    birthdayInfoButton.addEventListener("click", (event) => {
        event.preventDefault();
    });
    const generateBirthdayPopover = () => {
        const idmsPopoverContainerDiv = document.createElement("div");
        idmsPopoverContainerDiv.classList.add("idms-popover-container");
    
        const idmsPopoverWrapperDiv = document.createElement("div");
        idmsPopoverWrapperDiv.classList.add(
            "idms-popover-wrapper",
            "idms-popover-wrapper-direction-top",
            "idms-popover-wrapper-align-center"
        );
        idmsPopoverWrapperDiv.style.top = "-33.2125px";
        idmsPopoverWrapperDiv.style.left = "16.5px";
        idmsPopoverWrapperDiv.style.width = "300px";
    
        const idmsPopoverDiv = document.createElement("div");
        idmsPopoverDiv.setAttribute("id", "idms-popover-1727074279636-0");
        idmsPopoverDiv.setAttribute("role", "dialog");
        idmsPopoverDiv.classList.add(
            "idms-popover",
            "idms-popover-direction-top",
            "idms-popover-align-center",
            "idms-popover-type-info",
            "security-code-small-box",
        );
    
        const msgDiv = document.createElement("div");
        msgDiv.setAttribute("role", "tooltip");
        msgDiv.classList.add("message");
        msgDiv.textContent = "이 정보는 계정에서 사용할 수 있는 서비스를 정하는 데 사용됩니다."
    
        idmsPopoverDiv.appendChild(msgDiv);
        idmsPopoverWrapperDiv.appendChild(idmsPopoverDiv);
        idmsPopoverContainerDiv.appendChild(idmsPopoverWrapperDiv);
        return idmsPopoverContainerDiv;
    };
    birthdayInfoButton.addEventListener("mouseover", () => {
        const isPopoverAlreadyExist = document.querySelector(".idms-popover-container");
        if (!isPopoverAlreadyExist) {
            const generatedPopover = generateBirthdayPopover();
            birthdayInfoMsg.appendChild(generatedPopover);
        };
    });
    birthdayInfoButton.addEventListener("mouseout", () => {
        const existingBirthdayPopover = document.querySelector(".idms-popover-container");
        if (existingBirthdayPopover) {
            birthdayInfoMsg.removeChild(existingBirthdayPopover);
        };
    });
});
/*birthday input formatting*/
document.addEventListener("DOMContentLoaded", () => {
    const birthdayInput = document.querySelector("#input-1727167270343-1");
    const defaultBirthdayFormat = "yyyy년 mm월 dd일";
    const currentDate = new Date();
    
    birthdayInput.addEventListener("click", () => {
        if (birthdayInput.value === defaultBirthdayFormat) {
            birthdayInput.setSelectionRange(0, 0);
        };
    });
    birthdayInput.addEventListener("focus", () => {
        birthdayInput.value = defaultBirthdayFormat;
        birthdayInput.setSelectionRange(0, 0);
    });
    birthdayInput.addEventListener("blur", () => {
        if (birthdayInput.value === defaultBirthdayFormat) {
            birthdayInput.value = "";
        }
    });
    birthdayInput.addEventListener("keydown", (event) => {
        if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
            event.preventDefault();
            return;
        }
    });
});
/*
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('birthdate');
    const template = 'yyyy년 mm월 dd일';
    const today = new Date();

    // 현재 날짜 정보를 가져오기
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const currentDay = today.getDate();

    // 기본값을 세팅
    input.value = template;
    input.setSelectionRange(0, 0); // 처음에는 커서 고정

    input.addEventListener('focus', () => {
        if (input.value === template) {
            input.setSelectionRange(0, 0); // 커서 고정
        }
    });

    input.addEventListener('keydown', (e) => {
        const start = input.selectionStart;
        const end = input.selectionEnd;

        // 숫자 이외의 키 입력 방지
        if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
            e.preventDefault();
            return;
        }

        // 숫자 입력 처리
        if (/[0-9]/.test(e.key)) {
            e.preventDefault();
            const nextValue = replaceAt(input.value, start, e.key);

            // 년도, 월, 일의 형식 유지
            if (start === 0 || start === 1 || start === 2 || start === 3) {
                input.value = nextValue;
                input.setSelectionRange(start + 1, start + 1);
            } else if (start === 6 || start === 7) {
                input.value = nextValue;
                input.setSelectionRange(start + 1, start + 1);
            } else if (start === 11 || start === 12) {
                input.value = nextValue;
                input.setSelectionRange(start + 1, start + 1);
            }

            // 입력 완료 후 생년월일 유효성 체크
            const year = parseInt(input.value.slice(0, 4));
            const month = parseInt(input.value.slice(6, 8));
            const day = parseInt(input.value.slice(11, 13));

            if (isValidDate(year, month, day)) {
                const inputDate = new Date(year, month - 1, day);
                if (inputDate > today) {
                    alert("존재하지 않는 생년월일입니다. 미래의 날짜는 입력할 수 없습니다.");
                    input.value = template;
                    input.setSelectionRange(0, 0);
                }
            } else {
                alert("유효하지 않은 날짜입니다.");
                input.value = template;
                input.setSelectionRange(0, 0);
            }
        }

        // 백스페이스로 숫자 삭제 처리
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (start > 0 && input.value[start - 1] !== '년' && input.value[start - 1] !== '월' && input.value[start - 1] !== '일') {
                const newValue = replaceAt(input.value, start - 1, template[start - 1]);
                input.value = newValue;
                input.setSelectionRange(start - 1, start - 1);
            }
        }
    });

    function replaceAt(str, index, replacement) {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }

    // 유효한 날짜인지 확인하는 함수
    function isValidDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
    }
});
*/
/*
document.addEventListener('DOMContentLoaded', function () {
    const birthdateInput = document.getElementById('birthdate');
    
    const defaultFormat = 'yyyy년 mm월 dd일';
    birthdateInput.value = defaultFormat;

    function setCaretPosition(elem, pos) {
        if (elem.setSelectionRange) {
            elem.focus();
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function handleInput(e) {
        const value = birthdateInput.value;
        const num = e.key;

        if (!/\d/.test(num)) {
            e.preventDefault();
            return;
        }

        let caretPos = birthdateInput.selectionStart;

        if (caretPos >= 0 && caretPos <= 4) {
            if (caretPos === 0 || caretPos === 1 || caretPos === 2 || caretPos === 3) {
                birthdateInput.value = value.substring(0, caretPos) + num + value.substring(caretPos + 1);
                setCaretPosition(birthdateInput, caretPos + 1);
            }
            if (caretPos === 4) {
                setCaretPosition(birthdateInput, 6);
            }
        } else if (caretPos >= 6 && caretPos <= 7) {
            if (caretPos === 6 || caretPos === 7) {
                birthdateInput.value = value.substring(0, caretPos) + num + value.substring(caretPos + 1);
                setCaretPosition(birthdateInput, caretPos + 1);
            }
            if (caretPos === 8) {
                setCaretPosition(birthdateInput, 10);
            }
        } else if (caretPos >= 10 && caretPos <= 11) {
            if (caretPos === 10 || caretPos === 11) {
                birthdateInput.value = value.substring(0, caretPos) + num + value.substring(caretPos + 1);
                setCaretPosition(birthdateInput, caretPos + 1);
            }
        }

        e.preventDefault();
    }

    function handleBackspace(e) {
        const value = birthdateInput.value;
        const caretPos = birthdateInput.selectionStart;

        if (e.key === 'Backspace') {
            if (caretPos > 0 && caretPos <= 4) {
                birthdateInput.value = value.substring(0, caretPos - 1) + 'y' + value.substring(caretPos);
                setCaretPosition(birthdateInput, caretPos - 1);
            } else if (caretPos >= 6 && caretPos <= 7) {
                birthdateInput.value = value.substring(0, caretPos - 1) + 'm' + value.substring(caretPos);
                setCaretPosition(birthdateInput, caretPos - 1);
            } else if (caretPos >= 10 && caretPos <= 11) {
                birthdateInput.value = value.substring(0, caretPos - 1) + 'd' + value.substring(caretPos);
                setCaretPosition(birthdateInput, caretPos - 1);
            }

            e.preventDefault();
        }
    }

    function isInputComplete() {
        const value = birthdateInput.value;
        const year = value.substring(0, 4).replace(/[^\d]/g, '');
        const month = value.substring(6, 8).replace(/[^\d]/g, '');
        const day = value.substring(10, 12).replace(/[^\d]/g, '');

        // 년, 월, 일이 모두 숫자로 채워졌는지 확인
        return year.length === 4 && month.length === 2 && day.length === 2;
    }

    // blur 이벤트에서 입력이 완료되지 않으면 다시 focus
    function handleBlur(e) {
        if (!isInputComplete()) {
            e.preventDefault();
            birthdateInput.focus();
        } else {
            const value = birthdateInput.value;
            const year = value.substring(0, 4).replace(/[^\d]/g, '');
            const month = value.substring(6, 8).replace(/[^\d]/g, '');
            const day = value.substring(10, 12).replace(/[^\d]/g, '');

            birthdateInput.value = `${year}년 ${month}월 ${day}일`;
        }
    }

    function handleFocus() {
        if (birthdateInput.value.trim() === '' || birthdateInput.value === defaultFormat) {
            birthdateInput.value = defaultFormat;
            setCaretPosition(birthdateInput, 0);
        }
    }

    // 이벤트 핸들러 연결
    birthdateInput.addEventListener('keydown', handleInput);
    birthdateInput.addEventListener('keydown', handleBackspace);
    birthdateInput.addEventListener('blur', handleBlur); // 포커스를 잃었을 때 처리
    birthdateInput.addEventListener('focus', handleFocus); // 포커스 맞추기
});

*/