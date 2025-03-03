import "../scss/components/masthead.scss";
document.addEventListener("DOMContentLoaded", () => {
    /*masthead searchbox focused, has text styling*/
    const mastheadSearchbox = document.querySelector("#search.wtd-searchbox-html-tag[role=search]");
    const mastheadSearchInput = document.querySelector("#search-input.wtd-searchbox-spt input#search");
    mastheadSearchInput.addEventListener("focus", () => {
        mastheadSearchbox.classList.add("has-focus")
    });
    mastheadSearchInput.addEventListener("blur", () => {
        mastheadSearchbox.classList.remove("has-focus")
    });
    mastheadSearchInput.addEventListener("input", () => {
        if (mastheadSearchInput.value === "") {
            mastheadSearchbox.classList.remove("has-input");
        } else {
            mastheadSearchbox.classList.add("has-input");
        };
    });

    /*login button touch response*/
    const touchFeedbackShape = document.querySelector(".wt-spec-touch-feedback-shape.wt-spec-touch-feedback-shape--touch-response");
    const classInsert_1 = (type) => {
        if (type === "add") {
            return touchFeedbackShape.classList.add("wt-spec-touch-feedback-shape--down");
        } else if (type === "remove") {
            return touchFeedbackShape.classList.remove("wt-spec-touch-feedback-shape--down");
        };
    };
    if (touchFeedbackShape) {
        touchFeedbackShape.addEventListener("mousedown", () => classInsert_1("add"));
        touchFeedbackShape.addEventListener("mouseup", () => classInsert_1("remove"));
        touchFeedbackShape.addEventListener("mouseup", (event) => {
            if (!touchFeedbackShape.contains(event.target)) {
                classInsert_1("remove");
            };
        });
        touchFeedbackShape.addEventListener("mouseleave", () => classInsert_1("remove"));
    };

    /*login button key focus response*/
    const loginAncher = document.querySelector("a[aria-label=로그인]");
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            loginAncher.addEventListener("focus", () => {
                loginAncher.classList.add("wt-spec-button-shape-next--focused");
            });
            loginAncher.addEventListener("blur", () => {
                loginAncher.classList.remove("wt-spec-button-shape-next--focused");
            });
        };
    });

    /*not logged in menu button touch response*/
    const menuButton = document.querySelector(".wtd-topbar-menu-button-renderer-html-tag.wtd-masthead[has-no-text] #button.wtd-topbar-menu-button-renderer");
    const menuInteraction = menuButton.querySelector("#interaction.wt-interaction-html-tag.circular.wt-icon-button");
    const classInsert_2 = (type) => {
        if (type === "add") {
            return menuInteraction.classList.add("down");
        } else if(type === "remove") {
            return menuInteraction.classList.remove("down");
        };
    };
    if (menuButton && menuInteraction) {
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
    };

    /*topbar left menu button touch response*/
    const sidebarMenuButton = document.querySelector("#guide-button")
    const sidebarMenuInteraction = document.querySelector("#guide-button #interaction.wt-interaction-html-tag");
    sidebarMenuButton.addEventListener("mousedown", () => sidebarMenuInteraction.classList.add("down"));
    sidebarMenuButton.addEventListener("mouseup", () => sidebarMenuInteraction.classList.remove("down"));
    sidebarMenuButton.addEventListener("mouseup", (event) => {
        if (!sidebarMenuButton.contains(event.target)) {
            sidebarMenuInteraction.classList.remove("down");
        };
    });
    sidebarMenuButton.addEventListener("mouseleave", () => sidebarMenuInteraction.classList.remove("down"));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            sidebarMenuButton.addEventListener("focus", () => {
                sidebarMenuInteraction.setAttribute("focused", "");
            });            
        };
    });

    /*search clear button active*/
    const searchClearButton = document.querySelector("#search-clear-button .wt-spec-button-shape-next");
    const searchInput = document.querySelector("#search.wtd-searchbox");
    const wtdSearchBox = document.querySelector("#search.wtd-searchbox-html-tag[role=search]");
    searchClearButton.addEventListener("click", (event) => {
        event.preventDefault();
        searchInput.value = "";
        searchInput.focus();
        if (wtdSearchBox.classList.contains("has-input")) wtdSearchBox.classList.remove("has-input");
    });

    /*search button tooltip active*/
    const searchButton = document.querySelector("#search-icon-legacy");
    const searchButtonTooltip = searchButton.querySelector("#tooltip");
    searchButton.addEventListener("mouseenter", () => {
        if (searchButtonTooltip.classList.contains("hidden")) searchButtonTooltip.classList.remove("hidden");
        if (!searchButtonTooltip.classList.contains("fade-in-animation")) searchButtonTooltip.classList.add("fade-in-animation");
    });
    searchButton.addEventListener("mouseleave", () => {
        if (searchButtonTooltip.classList.contains("fade-in-animation")) searchButtonTooltip.classList.remove("fade-in-animation");
        if (!searchButtonTooltip.classList.contains("fade-out-animation")) searchButtonTooltip.classList.add("fade-out-animation");
        setTimeout(() => {
            if (searchButtonTooltip.classList.contains("fade-out-animation")) searchButtonTooltip.classList.remove("fade-out-animation");
            if (!searchButtonTooltip.classList.contains("hidden")) searchButtonTooltip.classList.add("hidden");
        }, 100);
    });

    /*voice search button tooltip active*/
    const voiceSearchButton = document.querySelector("#voice-search-button button");
    const voiceSearchButtonTooltip = document.querySelector("#voice-search-button .tp-wt-paper-tooltip-html-tag #tooltip");
    voiceSearchButton.addEventListener("mouseenter", () => {
        if (voiceSearchButtonTooltip.classList.contains("hidden")) voiceSearchButtonTooltip.classList.remove("hidden")
        if (!voiceSearchButtonTooltip.classList.contains("fade-in-animation")) voiceSearchButtonTooltip.classList.add("fade-in-animation")
    });
    voiceSearchButton.addEventListener("mouseleave", () => {
        if (voiceSearchButtonTooltip.classList.contains("fade-in-animation")) voiceSearchButtonTooltip.classList.remove("fade-in-animation")
        if (!voiceSearchButtonTooltip.classList.contains("fade-out-animation")) voiceSearchButtonTooltip.classList.add("fade-out-animation")
        setTimeout(() => {
            if (voiceSearchButtonTooltip.classList.contains("fade-out-animation")) voiceSearchButtonTooltip.classList.remove("fade-out-animation");
            if (!voiceSearchButtonTooltip.classList.contains("hidden")) voiceSearchButtonTooltip.classList.add("hidden");
        }, 100);    
    });

    /*create button tooltip active*/
    const createButton = document.querySelector(".wtd-topbar-menu-button-renderer-html-tag.wtd-masthead #button.wtd-topbar-menu-button-renderer");
    const createButtonTooltip = createButton.querySelector("#tooltip");
    if (createButton) {
        createButton.addEventListener("mouseenter", () => {
            if (createButtonTooltip.classList.contains("hidden")) createButtonTooltip.classList.remove("hidden");
            if (!createButtonTooltip.classList.contains("fade-in-animation")) createButtonTooltip.classList.add("fade-in-animation");
        });
        createButton.addEventListener("mouseleave", () => {
            if (createButtonTooltip.classList.contains("fade-in-animation")) createButtonTooltip.classList.remove("fade-in-animation");
            if (!createButtonTooltip.classList.contains("fade-out-animation")) createButtonTooltip.classList.add("fade-out-animation");
            setTimeout(() => {
                if (createButtonTooltip.classList.contains("fade-out-animation")) createButtonTooltip.classList.remove("fade-out-animation");
                if (!createButtonTooltip.classList.contains("hidden")) createButtonTooltip.classList.add("hidden");
            }, 100);
        });
    };

    /*notification tooltip active*/
    const notificationButton = document.querySelector(".wt-icon-button-html-tag.wtd-notification-topbar-button-renderer #button");
    const notificationButtonTooltip = document.querySelector(".tp-wt-paper-tooltip-html-tag.wtd-notification-topbar-button-renderer #tooltip");
    if (notificationButton) {
        notificationButton.addEventListener("mouseenter", () => {
            if (notificationButtonTooltip.classList.contains("hidden")) notificationButtonTooltip.classList.remove("hidden");
            if (!notificationButtonTooltip.classList.contains("fade-in-animation")) notificationButtonTooltip.classList.add("fade-in-animation");
        });
        notificationButton.addEventListener("mouseleave", () => {
            if (notificationButtonTooltip.classList.contains("fade-in-animation")) notificationButtonTooltip.classList.remove("fade-in-animation");
            if (!notificationButtonTooltip.classList.contains("fade-out-animation")) notificationButtonTooltip.classList.add("fade-out-animation");
            setTimeout(() => {
                if (notificationButtonTooltip.classList.contains("fade-out-animation")) notificationButtonTooltip.classList.remove("fade-out-animation");
                if (!notificationButtonTooltip.classList.contains("hidden")) notificationButtonTooltip.classList.add("hidden");
            }, 100);
        });

        /*notification dropdown setting icon tooltip*/
        const notificationSettingButton = document.querySelector("#notification-dropdown #buttons");
        if (notificationSettingButton) {
            const notificationSettingTooltip = notificationSettingButton.querySelector("#tooltip");
            notificationSettingButton.addEventListener("mouseenter", () => {
                if (notificationSettingTooltip.classList.contains("hidden")) notificationSettingTooltip.classList.remove("hidden");
                if (!notificationSettingTooltip.classList.contains("fade-in-animation")) notificationSettingTooltip.classList.add("fade-in-animation");
            });
            notificationSettingButton.addEventListener("mouseleave", () => {
                if (notificationSettingTooltip.classList.contains("fade-in-animation")) notificationSettingTooltip.classList.remove("fade-in-animation");
                if (!notificationSettingTooltip.classList.contains("fade-out-animation")) notificationSettingTooltip.classList.add("fade-out-animation");
                setTimeout(() => {
                    if (notificationSettingTooltip.classList.contains("fade-out-animation")) notificationSettingTooltip.classList.remove("fade-out-animation");
                    if (!notificationSettingTooltip.classList.contains("hidden")) notificationSettingTooltip.classList.add("hidden");
                }, 100);
            });
        };
    };

    /*voice search button touch response*/
    const voiceSearchFeedback = document.querySelector("#voice-search-button .wt-touch-feedback-shape-html-tag .wt-spec-touch-feedback-shape");
    voiceSearchButton.addEventListener("mousedown", () => {
        voiceSearchFeedback.classList.add("wt-spec-touch-feedback-shape--down");
    });
    voiceSearchButton.addEventListener("mouseup", () => {
        voiceSearchFeedback.classList.remove("wt-spec-touch-feedback-shape--down");
    });
    voiceSearchButton.addEventListener("mouseup", (event) => {
        if (!voiceSearchButton.contains(event.target)) {
            voiceSearchFeedback.classList.remove("wt-spec-touch-feedback-shape--down");
        };
    });
    voiceSearchButton.addEventListener("mouseleave", () => {
        voiceSearchFeedback.classList.remove("wt-spec-touch-feedback-shape--down");
    });

    /*create dropdown control*/
    const createDropdown = document.querySelector(".wtd-popup-container-html-tag #create-dropdown");
    let isDropdownVisible = false;
    createButton.addEventListener("click", () => {
        if (!isDropdownVisible) {
            createDropdown.style.zIndex = "2202";
            createDropdown.removeAttribute("aria-hidden");
            createDropdown.setAttribute("focused", "");
            createDropdown.style.display = null;
            isDropdownVisible = true;
        } else {
            createDropdown.style.zIndex = null;
            createDropdown.setAttribute("aria-hidden", "true");
            createDropdown.removeAttribute("focused");
            createDropdown.style.display = "none";
            isDropdownVisible = false;
        };
    });

});
document.addEventListener("DOMContentLoaded", () => {
    /*notification dropdown control*/
    const notificationButton = document.querySelector("#buttons.wtd-masthead .wtd-notification-topbar-button-renderer-html-tag");
    const notificationDropdown = document.querySelector(".wtd-popup-container-html-tag #notification-dropdown");
    const notificationIconSvgPath = document.querySelector(".wtd-notification-topbar-button-renderer-html-tag.wtd-masthead .wt-icon-shape.wt-spec-icon-shape svg path");
    let isDropdownVisible = false;
    if (notificationButton) {
        notificationButton.addEventListener("click", () => {
            if (!isDropdownVisible) {
                notificationDropdown.style.zIndex = "2202";
                notificationDropdown.removeAttribute("aria-hidden");
                notificationDropdown.setAttribute("focused", "");
                notificationIconSvgPath.setAttribute("d", "M18.001 10a6.003 6.003 0 00-4.025-5.667 2 2 0 10-3.945-.002A6.003 6.003 0 006.001 10v3.988a.044.044 0 01-.006.022L3.91 17.485A1 1 0 004.767 19h14.468a1 1 0 00.857-1.515l-2.085-3.475a.044.044 0 01-.006-.022V10Zm-6 12a3.001 3.001 0 002.83-2H9.17A3.001 3.001 0 0012 22Z");
                notificationDropdown.style.display = null;
                isDropdownVisible = true;
            } else {
                notificationDropdown.style.zIndex = null;
                notificationDropdown.setAttribute("aria-hidden", "true");
                notificationDropdown.removeAttribute("focused");
                notificationIconSvgPath.setAttribute("d", "m13.497 4.898.053.8.694.4C15.596 6.878 16.5 8.334 16.5 10v2.892c0 .997.27 1.975.784 2.83L18.35 17.5H5.649l1.067-1.778c.513-.855.784-1.833.784-2.83V10c0-1.666.904-3.122 2.256-3.902l.694-.4.053-.8c.052-.78.703-1.398 1.497-1.398.794 0 1.445.618 1.497 1.398ZM6 10c0-2.224 1.21-4.165 3.007-5.201C9.11 3.236 10.41 2 12 2c1.59 0 2.89 1.236 2.993 2.799C16.79 5.835 18 7.776 18 10v2.892c0 .725.197 1.436.57 2.058l1.521 2.535c.4.667-.08 1.515-.857 1.515H15c0 .796-.316 1.559-.879 2.121-.562.563-1.325.879-2.121.879s-1.559-.316-2.121-.879C9.316 20.56 9 19.796 9 19H4.766c-.777 0-1.257-.848-.857-1.515L5.43 14.95c.373-.622.57-1.333.57-2.058V10Zm4.5 9c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06h-3Z");
                notificationDropdown.style.display = "none";
                isDropdownVisible = false;
            };
        });
    };
});
/*user system dropdown active*/
document.addEventListener("DOMContentLoaded", () => {
    const systemButton = document.querySelector("#buttons.wtd-masthead .wtd-topbar-menu-button-renderer-html-tag:last-of-type");
    const systemDropdown = document.querySelector(".wtd-popup-container-html-tag #system-dropdown");
    let isDropdownVisible = false;
    if (systemButton) {
        systemButton.addEventListener("click", () => {
            if (!isDropdownVisible) {
                systemDropdown.style.zIndex = "2202";
                systemDropdown.removeAttribute("aria-hidden");
                systemDropdown.setAttribute("focused", "");
                systemDropdown.style.display = null;
                isDropdownVisible = true;
            } else {
                systemDropdown.style.zIndex = null;
                systemDropdown.setAttribute("aria-hidden", "true");
                systemDropdown.removeAttribute("focused");
                systemDropdown.style.display = "none";
                isDropdownVisible = false;
            };
        });
    };
});
