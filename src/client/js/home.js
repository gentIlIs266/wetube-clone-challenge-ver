//masthead searchbox focused, has text styling
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
//popup-container control
document.addEventListener("DOMContentLoaded", () => {
    
});