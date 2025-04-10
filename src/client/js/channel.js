import "../scss/components/channel.scss";

document.addEventListener("DOMContentLoaded", () => {
    const contents = document.querySelectorAll("#contents .wtd-rich-item-renderer-html-tag");

    contents.forEach((content) => {
        content.setAttribute("items-per-row", "4");
        content.setAttribute("no-gutter-margins", "");
        content.setAttribute("rendered-from-rich-grid", "");
        content.setAttribute("is-slim-grid", "");
    });
    contents.forEach((content, index) => {
        if (index % 4 === 0) content.setAttribute("is-in-first-column", "");
    });

    document
        .querySelectorAll(".wtd-rich-grid-media-html-tag")
        .forEach((element) => {
            element.setAttribute("mini-mode", "");
        })
});