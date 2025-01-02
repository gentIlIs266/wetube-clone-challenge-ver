import "../scss/components/home.scss";
/*features related with items per row*/
document.addEventListener("DOMContentLoaded", () => {
    const wtdAppDiv = document.querySelector(".wtd-app-html-tag");
    const wtdRichGridRenderer = document.querySelector(".wtd-rich-grid-renderer-html-tag");
    const wtdFeedFilterChipBarRenderer = document.querySelector(".wtd-feed-filter-chip-bar-renderer-html-tag.wtd-rich-grid-renderer");
    const elementsPerRowIs = document
        .querySelector(".wtd-rich-grid-renderer-html-tag.wtd-two-column-browse-results-renderer")
        .getAttribute("elements-per-row");
    const homeContentItems = document.querySelectorAll("#contents.wtd-rich-grid-renderer .wtd-rich-item-renderer-html-tag.wtd-rich-grid-renderer");
    const clientWidth = document.body.clientWidth;
    let appDrawerWidth = 240;
    if (elementsPerRowIs === "3") {
        homeContentItems.forEach(
            (item, index) => {
                item.removeAttribute("is-in-first-column")
                if ((index - 1) % 3 === 0) item.setAttribute("is-in-first-column", "");
            }
        );
    };
    if (elementsPerRowIs === "4") {
        homeContentItems.forEach(
            (item, index) => {
                item.removeAttribute("is-in-first-column")
                if (index % 4 === 0) item.setAttribute("is-in-first-column", "");
            }
        );
    };
    const wtdAppAttributeObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                if (wtdAppDiv.getAttribute("guide-persistent-and-visible") === "") {
                    appDrawerWidth = 240;
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-items-per-row", "3");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-posts-per-row", "3");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-slim-items-per-row", "5");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-game-cards-per-row", "5");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-mini-game-cards-per-row", "5");
                    wtdRichGridRenderer.setAttribute("elements-per-row", "3");
                    homeContentItems.forEach((item, index) => {
                            item.removeAttribute("is-in-first-column")
                            if ((index - 1) % 3 === 0) item.setAttribute("is-in-first-column", "");
                        });
                } else {
                    appDrawerWidth = 72;
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-items-per-row", "4");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-posts-per-row", "4");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-slim-items-per-row", "6");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-game-cards-per-row", "6");
                    wtdRichGridRenderer.style.setProperty("--wtd-rich-grid-mini-game-cards-per-row", "6");
                    wtdRichGridRenderer.setAttribute("elements-per-row", "4");
                    homeContentItems.forEach((item, index) => {
                            item.removeAttribute("is-in-first-column")
                            if ((index - 1) % 4 === 0) item.setAttribute("is-in-first-column", "");
                        });
                };
                wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - appDrawerWidth}px`);
            };
        };
    });
    wtdAppAttributeObserver.observe(wtdAppDiv, { attributes: true });
    if (wtdFeedFilterChipBarRenderer) {
        wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - 240}px`);
        wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-top", `56px`);
    };
});
/*home filter bar cloud chip select response*/
document.addEventListener("DOMContentLoaded", () => {
    const chipCloudChips = document.querySelectorAll(".iron-selector-html-tag.wtd-feed-filter-chip-bar-renderer .wt-chip-cloud-chip-renderer-html-tag.wtd-feed-filter-chip-bar-renderer");
    const selectedCloudQueryString = ".iron-selector-html-tag.wtd-feed-filter-chip-bar-renderer .wt-chip-cloud-chip-renderer-html-tag.wtd-feed-filter-chip-bar-renderer[selected]";
    chipCloudChips.forEach((cloudChip) => {
        cloudChip.addEventListener("click", () => {
            const cloudAlreadySelected = document.querySelector(selectedCloudQueryString);
            if (cloudAlreadySelected) {
                cloudAlreadySelected.removeAttribute("selected");
                cloudAlreadySelected.setAttribute("aria-selected", "false");
            };
            cloudChip.setAttribute("selected", "");
            cloudChip.setAttribute("aria-selected", "true");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    
});