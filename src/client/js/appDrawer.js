import "../scss/components/app-drawer.scss";
/*app drawer control through button*/
document.addEventListener("DOMContentLoaded", () => {
    const drawerControlButton = document.querySelector("#start.wtd-masthead #guide-button");
    const appDrawer = document.querySelector("#guide.tp-wt-app-drawer-html-tag.wtd-app");
    const miniGuide = document.querySelector(".wtd-mini-guide-renderer-html-tag.wtd-app");
    const wtdAppDiv = document.querySelector(".wtd-app-html-tag");
    const appDrawerScrim = appDrawer.querySelector("#scrim");
    const appDrawerContentContainer = appDrawer.querySelector("#contentContainer");
    const drawerControlButtonInDrawer = appDrawerContentContainer.querySelector("#header .wt-icon-button-html-tag.wtd-app");
    const appDrawerTopBarLogoRenderer = appDrawerContentContainer.querySelector("#header .wtd-topbar-logo-renderer-html-tag");
    const isThisPageWatchVideo = (appDrawer.dataset.page === "watch-video");
    let isDrawerOpened = isThisPageWatchVideo ? false : true;
    function onAppDrawerControlClickAtHome_appear() {
        if (isDrawerOpened) {
            ["guide-persistent-and-visible", "hidden", "disable-upgrade"]
                .forEach((attr) => miniGuide.removeAttribute(attr));
            [wtdAppDiv, miniGuide]
                .forEach((element) => element.setAttribute("mini-guide-visible", ""));
                appDrawer.removeAttribute("opened");
                appDrawerContentContainer.removeAttribute("opened");
                wtdAppDiv.removeAttribute("guide-persistent-and-visible");
                isDrawerOpened = false;
        } else {
            ["guide-persistent-and-visible", "hidden", "disable-upgrade"]
                .forEach((attr) => miniGuide.setAttribute(attr, ""));
            [wtdAppDiv, miniGuide]
                .forEach((element) => element.removeAttribute("mini-guide-visible"));

            appDrawer.setAttribute("opened", "");
            appDrawerContentContainer.setAttribute("opened", "")
            wtdAppDiv.setAttribute("guide-persistent-and-visible", "");
            isDrawerOpened = true;
        };
    };
    function onAppDrawerControlClickAtHome_disappear() {
        appDrawer.removeAttribute("opened");
        appDrawerScrim.classList.remove("visible");
        appDrawerContentContainer.removeAttribute("opened")
        appDrawerTopBarLogoRenderer.removeAttribute("disable-upgrade")
        isDrawerOpened = false;
    };
    function onAppDrawerControlClickAtWatchVideo() {
        appDrawer.setAttribute("opened", "");
        appDrawerScrim.classList.add("visible");
        appDrawerContentContainer.setAttribute("opened", "");
        appDrawerTopBarLogoRenderer.setAttribute("disable-upgrade", "");
        isDrawerOpened = true;
    };
    if (isThisPageWatchVideo) {
        drawerControlButton.addEventListener("click", onAppDrawerControlClickAtWatchVideo);
        drawerControlButtonInDrawer.addEventListener("click", onAppDrawerControlClickAtHome_disappear);
    } else {
        drawerControlButton.addEventListener("click", onAppDrawerControlClickAtHome_appear);
    };
});
