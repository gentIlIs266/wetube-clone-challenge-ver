import "../scss/components/app-drawer.scss";
/*app drawer control to button*/
document.addEventListener("DOMContentLoaded", () => {
    function onAppDrawerControlClickAtHome_appear() {
        if (isDrawerOpened) {
            appDrawer.removeAttribute("opened");
            appDrawerContentContainer.removeAttribute("opened");
            miniGuide.removeAttribute("guide-persistent-and-visible");
            miniGuide.removeAttribute("hidden");
            miniGuide.removeAttribute("disable-upgrade");
            miniGuide.setAttribute("mini-guide-visible", "");
            wtdAppDiv.removeAttribute("guide-persistent-and-visible");
            wtdAppDiv.setAttribute("mini-guide-visible", "");
            isDrawerOpened = false;
        } else {
            appDrawer.setAttribute("opened", "");
            appDrawerContentContainer.setAttribute("opened", "")
            miniGuide.setAttribute("guide-persistent-and-visible", "");
            miniGuide.setAttribute("hidden", "");
            miniGuide.setAttribute("disable-upgrade", "");
            miniGuide.removeAttribute("mini-guide-visible");
            wtdAppDiv.setAttribute("guide-persistent-and-visible", "");
            wtdAppDiv.removeAttribute("mini-guide-visible");
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
    if (isThisPageWatchVideo) {
        drawerControlButton.addEventListener("click", onAppDrawerControlClickAtWatchVideo);
        drawerControlButtonInDrawer.addEventListener("click", onAppDrawerControlClickAtHome_disappear);
    } else drawerControlButton.addEventListener("click", onAppDrawerControlClickAtHome_appear);
});
