import "../scss/components/app-drawer.scss";
/*app drawer control to button*/
document.addEventListener("DOMContentLoaded", () => {
    const drawerControlButton = document.querySelector("#start.wtd-masthead #guide-button");
    const appDrawer = document.querySelector("#guide.tp-wt-app-drawer-html-tag.wtd-app");
    const miniGuide = document.querySelector(".wtd-mini-guide-renderer-html-tag.wtd-app");
    const wtdAppDiv = document.querySelector(".wtd-app-html-tag");
    let isDrawerOpened = true;
    drawerControlButton.addEventListener("click", () => {
        if (isDrawerOpened) {
            appDrawer.removeAttribute("opened");
            miniGuide.removeAttribute("guide-persistent-and-visible");
            miniGuide.removeAttribute("hidden");
            miniGuide.removeAttribute("disable-upgrade");
            miniGuide.setAttribute("mini-guide-visible", "");
            wtdAppDiv.removeAttribute("guide-persistent-and-visible");
            wtdAppDiv.setAttribute("mini-guide-visible", "");
            isDrawerOpened = false;
        } else {
            appDrawer.setAttribute("opened", "");
            miniGuide.setAttribute("guide-persistent-and-visible", "");
            miniGuide.setAttribute("hidden", "");
            miniGuide.setAttribute("disable-upgrade", "");
            miniGuide.removeAttribute("mini-guide-visible");
            wtdAppDiv.setAttribute("guide-persistent-and-visible", "");
            wtdAppDiv.removeAttribute("mini-guide-visible");
            isDrawerOpened = true;
        };
    });
});
