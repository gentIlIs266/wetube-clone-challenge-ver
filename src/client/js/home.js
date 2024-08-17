/*masthead searchbox focused, has text styling*/
document.addEventListener("DOMContentLoaded", () => {
    const mastheadSearchbox = document.querySelector("#search.wtd-searchbox-html-tag[role=search]");
    const mastheadSearchInput = document.querySelector("#search-input.wtd-searchbox-spt input#search");
    mastheadSearchInput.addEventListener("focus", () => {
        mastheadSearchbox.classList.add("has-focus")
    });
    mastheadSearchInput.addEventListener("blur", () => {
        mastheadSearchbox.classList.remove("has-focus")
    });
    mastheadSearchInput.addEventListener("input", () => {
        if (mastheadSearchInput.value.trim() === "") {
            mastheadSearchbox.classList.remove("has-input");
        } else {
            mastheadSearchbox.classList.add("has-input");
        };
    });
});
/*login button touch response*/
document.addEventListener("DOMContentLoaded", () => {
    const touchFeedbackShape = document.querySelector(".wt-spec-touch-feedback-shape.wt-spec-touch-feedback-shape--touch-response");
    const classInsert_1 = (type) => {
        if (type === "add") {
            return touchFeedbackShape.classList.add("wt-spec-touch-feedback-shape--down");
        } else if(type === "remove") {
            return touchFeedbackShape.classList.remove("wt-spec-touch-feedback-shape--down");
        };
    };
    touchFeedbackShape.addEventListener("mousedown", () => {
        classInsert_1("add");
    });
    touchFeedbackShape.addEventListener("mouseup", () => {
        classInsert_1("remove");
    });
    touchFeedbackShape.addEventListener("mouseup", (event) => {
        if (!touchFeedbackShape.contains(event.target)) {
            classInsert_1("remove");
        };
    });
    touchFeedbackShape.addEventListener("mouseleave", () => {
        classInsert_1("remove");
    })
});
/*not logged in menu button touch response*/
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".wtd-topbar-menu-button-renderer-html-tag.wtd-masthead[has-no-text] #button.wtd-topbar-menu-button-renderer");
    const menuInteraction = menuButton.querySelector("#interaction.wt-interaction-html-tag.circular.wt-icon-button");
    const classInsert_2 = (type) => {
        if (type === "add") {
            return menuInteraction.classList.add("down");
        } else if(type === "remove") {
            return menuInteraction.classList.remove("down");
        };
    };
    menuButton.addEventListener("mousedown", () => {
        classInsert_2("add");
    });
    menuButton.addEventListener("mouseup", () => {
        classInsert_2("remove");
    }); 
    menuButton.addEventListener("mouseup", (event) => {
        if (!menuButton.contains(event.target)) {
            classInsert_2("remove");
        };
    });
    menuButton.addEventListener("mouseleave", () => {
        classInsert_2("remove");
    });
});
/*popup-container control*/
document.addEventListener("DOMContentLoaded", () => {
    
});