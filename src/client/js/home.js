import "../scss/components/home.scss";

document.addEventListener("DOMContentLoaded", () => {
    const wtdFeedFilterChipBarRenderer = document.querySelector(".wtd-feed-filter-chip-bar-renderer-html-tag.wtd-rich-grid-renderer");
    const wtdAppDiv = document.querySelector(".wtd-app-html-tag")
    const clientWidth = document.body.clientWidth;
    let appDrawerWidth = 240;
    wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - 240}px`);
    wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-top", `56px`);
    const wtdAppAttributeObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                appDrawerWidth = (wtdAppDiv.getAttribute("guide-persistent-and-visible") === "") ? 240 : 72;
                wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - appDrawerWidth}px`);
            };
        };
    });
    wtdAppAttributeObserver.observe(wtdAppDiv, { attributes: true });
});
document.addEventListener("DOMContentLoaded", () => {
    const elementsPerRowIs = document.querySelector(".wtd-rich-grid-renderer-html-tag.wtd-two-column-browse-results-renderer").getAttribute("elements-per-row");
    const homeContentItems = document.querySelectorAll("#contents.wtd-rich-grid-renderer .wtd-rich-item-renderer-html-tag.wtd-rich-grid-renderer");
    if (elementsPerRowIs === "3") {
        homeContentItems.forEach((item, index) => {
            if ((index + 1) % 3 === 1) item.setAttribute("is-in-first-column", "");
        });
    };
});



/*

*/

