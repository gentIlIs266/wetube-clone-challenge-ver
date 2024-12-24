import "../scss/components/watch-video.scss";
document.addEventListener("DOMContentLoaded", () => {
    const wtdWatchFlexy = document.querySelector(".wtd-watch-flexy-html-tag.wtd-page-manager");
    const initialWidth = wtInitialData.initialBodyClientWidth;
    const twoColumnPoint = Math.floor(initialWidth / 1.52);
    function oneColumn() {
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-panel-max-height", "460px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-chat-max-height", "460px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-structured-description-max-height", "460px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-comments-panel-max-height", "460px");
        wtdWatchFlexy.style.setProperty("--wtd-comments-engagement-panel-content-height", "460px");
        wtdWatchFlexy.removeAttribute("is-two-columns_");
        wtdWatchFlexy.removeAttribute("default-two-column-layout");
        wtdWatchFlexy.removeAttribute("flexy-small-window_");
    };
    function twoColumn() {
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-panel-max-height", "360px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-chat-max-height", "360px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-structured-description-max-height", "360px");
        wtdWatchFlexy.style.setProperty("--wtd-watch-flexy-comments-panel-max-height", "360px");
        wtdWatchFlexy.style.setProperty("--wtd-comments-engagement-panel-content-height", "360px");
        wtdWatchFlexy.setAttribute("is-two-columns_", "");
        wtdWatchFlexy.setAttribute("default-two-column-layout", "");
        wtdWatchFlexy.setAttribute("flexy-small-window_", "");
    };
    window.addEventListener("resize", () => {
        const sizingWidth = document.body.clientWidth;
        if (sizingWidth < twoColumnPoint) oneColumn();
        else twoColumn();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const videoItSelf = document.querySelector("#wtd-player .html5-video-container video");
    const playerContainerOuter = document.querySelector(".wtd-watch-flexy-html-tag #columns #player-container-outer");
    const chromeBottom = document.querySelector("#movie_player .wtp-chrome-bottom");
    const chapterHover = chromeBottom.querySelector(".wtp-chapter-hover-container");
    const playProgress = chapterHover.querySelector(".wtp-play-progress.wtp-swatch-background-color");
    if (!videoItSelf.getAttribute("src")) location.reload();
    if (!videoItSelf || !playerContainerOuter) location.reload();
    function videoSizeAdjust() {
        const { width: w, height: h } = playerContainerOuter.getBoundingClientRect();
        videoItSelf.style.width = `${w}px`;
        videoItSelf.style.height = `${h}px`;
    };
    function controllerSizeAdjust() {
        const { width: controllerWidth } = playerContainerOuter.getBoundingClientRect();
        chromeBottom.style.width = `${controllerWidth - 24}px`;
        chapterHover.style.width = `${controllerWidth - 24}px`;
        playProgress.style.backgroundSize = `${controllerWidth - 24}px`;
    };
    controllerSizeAdjust();
    videoItSelf.addEventListener("loadeddata", videoSizeAdjust);
    let resizeTimeout = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            videoSizeAdjust();
            controllerSizeAdjust();
        }, 100);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const moviePlayer = document.querySelector("#movie_player.html5-video-player");
    const videoItSelf = document.querySelector("#wtd-player .html5-video-container video");
    const chromeBottom = document.querySelector("#movie_player .wtp-chrome-bottom");
    const progressBar = chromeBottom.querySelector(".wtp-progress-bar");
    const playProgress = chromeBottom.querySelector(".wtp-play-progress");
    const loadProgress = progressBar.querySelector(".wtp-load-progress");
    const scrubberContainer = progressBar.querySelector(".wtp-scrubber-container");
    function getTimeStr(d) {
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor(d % 60);
        return h > 0
        ? `${h} 시 ${m} 분 ${s}초`
        : `${m} 분 ${s}초`
    };
    function getDefaultTimeStr(d) {
        const h = Math.floor(d / 3600);
        return h > 0
        ? `0 시 0 분 0초`
        : `0 분 0초`
    };
    const { width: progressBarWidth } = progressBar.getBoundingClientRect();
    let wholeVideoLength = null;
    videoItSelf.addEventListener("loadedmetadata", () => {
        wholeVideoLength = Math.floor(videoItSelf.duration);
        progressBar.setAttribute("aria-valuemax", String(wholeVideoLength));
        progressBar.setAttribute("aria-valuetext", `${getDefaultTimeStr(wholeVideoLength)}/${getTimeStr(wholeVideoLength)}`);
    });
    videoItSelf.addEventListener("timeupdate", () => {
        const progress = (videoItSelf.currentTime / videoItSelf.duration);
        const now = Math.floor(videoItSelf.currentTime);
        const scrubberPosition = (progress * progressBarWidth);
        scrubberContainer.style.transform = `translateX(${scrubberPosition}px)`;
        progressBar.setAttribute("aria-valuenow", String(now));
        progressBar.setAttribute("aria-valuetext", `${getTimeStr(now)}/${getTimeStr(wholeVideoLength)}`);
        playProgress.style.transform = `scaleX(${progress})`;
    });
    videoItSelf.addEventListener("progress", () => {
        if (videoItSelf.buffered.length > 0) {
            const buffedEnd = videoItSelf.buffered.end(videoItSelf.buffered.length - 1);
            const buffedProgress = (buffedEnd / videoItSelf.duration);
            loadProgress.style.transform = `scaleX(${buffedProgress})`;
        };
    });
    progressBar.addEventListener("mouseover", () => {
        moviePlayer.classList.add("wtp-progress-bar-hover");
    });
    progressBar.addEventListener("mouseout", () => {
        moviePlayer.classList.remove("wtp-progress-bar-hover");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const videoItSelf = document.querySelector("#wtd-player .html5-video-container video");
    const videoPlayer = document.querySelector("#movie_player");
    const chromeBottom = document.querySelector("#wtd-player #container .wtp-chrome-bottom");
    const controls = document.querySelector("#wtd-player #container .wtp-chrome-bottom .wtp-chrome-controls");
    const muteButton = controls.querySelector(".wtp-mute-button.wtp-button");
    const volumePanel = controls.querySelector(".wtp-volume-panel");
    (function() {
        videoItSelf.addEventListener("loadedmetadata", () => {
            const timeCurrent = controls.querySelector(".wtp-time-current");
            const timeDuration = controls.querySelector(".wtp-time-duration");
            const videoDuration = videoItSelf.duration;
            function timeFormat(t) {
                const h = Math.floor(t / 3600);
                const m = Math.floor((t % 3600) / 60);
                const s = String(Math.floor(t % 60)).padStart(2, "0");
                return (h > 0)
                    ? `${h}:${String(m).padStart(2, "0")}:${s}`
                    : `${m}:${s}`
            };
            timeDuration.textContent = timeFormat(videoDuration);
            videoItSelf.addEventListener("timeupdate", () => {
                timeCurrent.textContent = timeFormat(videoItSelf.currentTime);
            });
        });
    })();
    (function() {
        const autonavButton = controls.querySelector(".wtp-autonav-toggle-button");
        let autonavActive = true;
        autonavButton.addEventListener("click", () => {
            if (autonavActive) {
                autonavButton.setAttribute("aria-checked", "false");
                autonavActive = false;
            } else {
                autonavButton.setAttribute("aria-checked", "true");
                autonavActive = true;
            };
        });
    })();
    (function() {
        const subtitleButton = controls.querySelector(".wtp-subtitle-button");
        let subtitleActive = false;
        subtitleButton.addEventListener("click", () => {
            if (subtitleActive) {
                subtitleButton.setAttribute("aria-pressed", "true");
                subtitleActive = false;
            } else {
                subtitleButton.setAttribute("aria-pressed", "false");
                subtitleActive = true;
            };
        });
    })();
    (function() {
        const leftControl = controls.querySelector(".wtp-left-controls");
        [muteButton, volumePanel].forEach((element) => {
            element.addEventListener("mouseenter", () => {
                chromeBottom.classList.add("wtp-volume-slider-active");
                volumePanel.classList.add("wtp-volume-control-hover");
            });
            leftControl.addEventListener("mouseleave", () => {
                chromeBottom.classList.remove("wtp-volume-slider-active");
                volumePanel.classList.remove("wtp-volume-control-hover");
            });
        });

    })();
    (function() {
        function pauseToPlay_SVG() {
            [
                "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z",
                "M 12,26 18.418059839786192,22.13110425634209 18.418059839786192,13.868895743657907 12,10 z M 18.581940160213808,22.13110425634209 25,18.262208512684186 25,17.737791487315814 18.581940160213808,13.868895743657907 z",
                "M 12,26 18.1732066477125,22.522869363659996 18.1732066477125,13.477130636340004 12,10 z M 18.8267933522875,22.522869363659996 25,19.045738727319993 25,16.954261272680007 18.8267933522875,13.477130636340004 z",
                "M 12,26 18.059863437045443,22.704218500727293 18.059863437045443,13.295781499272708 12,10 z M 18.940136562954557,22.704218500727293 25,19.408437001454583 25,16.591562998545417 18.940136562954557,13.295781499272708 z",
                "M 12,26 17.93643235345379,22.90170823447394 17.93643235345379,13.09829176552606 12,10 z M 19.06356764654621,22.90170823447394 25,19.80341646894788 25,16.19658353105212 19.06356764654621,13.09829176552606 z",
                "M 12,26 17.822497766402886,23.08400357375538 17.822497766402886,12.91599642624462 12,10 z M 19.177502233597114,23.08400357375538 25,20.16800714751076 25,15.83199285248924 19.177502233597114,12.91599642624462 z",
                "M 12,26 17.711826091565385,23.261078253495384 17.711826091565385,12.738921746504614 12,10 z M 19.288173908434615,23.261078253495384 25,20.522156506990772 25,15.477843493009228 19.288173908434615,12.738921746504614 z",
                "M 12,26 17.588868173335214,23.457810922663658 17.588868173335214,12.542189077336342 12,10 z M 19.411131826664786,23.457810922663658 25,20.915621845327315 25,15.084378154672686 19.411131826664786,12.542189077336342 z",
                "M 12,26 17.44340434905672,23.69055304150925 17.44340434905672,12.309446958490751 12,10 z M 19.55659565094328,23.69055304150925 25,21.381106083018498 25,14.618893916981502 19.55659565094328,12.309446958490751 z",
                "M 12,26 17.262157875013013,23.980547399979177 17.262157875013013,12.019452600020822 12,10 z M 19.737842124986987,23.980547399979177 25,21.961094799958357 25,14.038905200041643 19.737842124986987,12.019452600020822 z",
                "M 12,26 17.015875,24.3746 17.015875,11.625399999999999 12,10 z M 19.984125,24.3746 25,22.749200000000002 25,13.2508 19.984125,11.625399999999999 z",
                "M 12,26 16.71222114420174,24.86044616927721 16.71222114420174,11.13955383072279 12,10 z M 20.28777885579826,24.86044616927721 25,23.72089233855442 25,12.279107661445579 20.28777885579826,11.13955383072279 z",
                "M 12,26 16.3209635625,25.4864583 16.3209635625,10.513541700000001 12,10 z M 20.6790364375,25.4864583 25,24.972916599999998 25,11.0270834 20.6790364375,10.513541700000001 z",
                "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
            ].forEach((element, index) => {
                setTimeout(() => playSvgPath.setAttribute("d", element), (12 * index));
            });
        };
        function playToPause_SVG() {
            [
                "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z",
                "M 12,26 16.083310371335884,25.866703405862584 16.083310371335884,10.133296594137414 12,10 z M 20.916689628664116,25.866703405862584 25,25.73340681172517 25,10.266593188274829 20.916689628664116,10.133296594137414 z",
                "M 12,26 16.395957190092417,25.366468495852132 16.395957190092417,10.633531504147868 12,10 z M 20.604042809907583,25.366468495852132 25,24.732936991704264 25,11.267063008295736 20.604042809907583,10.633531504147868 z",
                "M 12,26 16.463657665755377,25.258147734791393 16.463657665755377,10.741852265208607 12,10 z M 20.536342334244623,25.258147734791393 25,24.516295469582786 25,11.483704530417212 20.536342334244623,10.741852265208607 z",
                "M 12,26 16.5995443125,25.0407291 16.5995443125,10.9592709 12,10 z M 20.4004556875,25.0407291 25,24.0814582 25,11.9185418 20.4004556875,10.9592709 z",
                "M 12,26 16.707718601029544,24.86765023835273 16.707718601029544,11.13234976164727 12,10 z M 20.292281398970456,24.86765023835273 25,23.73530047670546 25,12.264699523294539 20.292281398970456,11.13234976164727 z",
                "M 12,26 16.815047140638974,24.69592457497764 16.815047140638974,11.304075425022361 12,10 z M 20.184952859361026,24.69592457497764 25,23.391849149955277 25,12.608150850044723 20.184952859361026,11.304075425022361 z",
                "M 12,26 16.940117661893506,24.49581174097039 16.940117661893506,11.504188259029611 12,10 z M 20.059882338106494,24.49581174097039 25,22.991623481940778 25,13.008376518059222 20.059882338106494,11.504188259029611 z",
                "M 12,26 17.09375,24.25 17.09375,11.75 12,10 z M 19.90625,24.25 25,22.5 25,13.5 19.90625,11.75 z",
                "M 12,26 17.294522654899378,23.928763752160997 17.294522654899378,12.071236247839003 12,10 z M 19.705477345100622,23.928763752160997 25,21.857527504321993 25,14.142472495678005 19.705477345100622,12.071236247839003 z",
                "M 12,26 17.559331812499998,23.5050691 17.559331812499998,12.4949309 12,10 z M 19.440668187500002,23.5050691 25,21.0101382 25,14.9898618 19.440668187500002,12.4949309 z",
                "M 12,26 17.863692448211296,23.018092082861926 17.863692448211296,12.981907917138074 12,10 z M 19.136307551788704,23.018092082861926 25,20.036184165723853 25,15.963815834276147 19.136307551788704,12.981907917138074 z",
                "M 12,26 18.26903351183419,22.36954638106529 18.26903351183419,13.630453618934707 12,10 z M 18.73096648816581,22.36954638106529 25,18.739092762130586 25,17.260907237869414 18.73096648816581,13.630453618934707 z",
                "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
            ].forEach((element, index) => {
                setTimeout(() => playSvgPath.setAttribute("d", element), (12 * index));
            });
        };
        const playButton = controls.querySelector(".wtp-play-button.wtp-button");
        const playSvgPath = playButton.querySelector("svg path");
        playButton.addEventListener("click", () => {
            const isVideoPaused = (videoPlayer.classList.contains("paused-mode") && videoItSelf.paused);
            if (isVideoPaused) {
                playButton.setAttribute("data-title-no-tooltip", "일시중지");
                playButton.setAttribute("title", "일시중지(k)");
                pauseToPlay_SVG();
                videoPlayer.classList.replace("paused-mode", "playing-mode");
                videoItSelf.play();
            } else {
                playButton.setAttribute("data-title-no-tooltip", "재생");
                playButton.setAttribute("title", "재생(k)");
                playToPause_SVG()
                videoPlayer.classList.replace("playing-mode", "paused-mode");
                videoItSelf.pause();
            };
        });
        videoItSelf.addEventListener("play", () => {
        });
        videoItSelf.addEventListener("pause", () => {
        });
    })();
});
