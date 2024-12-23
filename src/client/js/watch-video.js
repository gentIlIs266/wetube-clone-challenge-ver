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
        const playButton = controls.querySelector(".wtp-play-button.wtp-button");
        const playSvgPath = playButton.querySelector("svg path");
        playButton.addEventListener("click", () => {
            const isVideoPaused = (videoPlayer.classList.contains("paused-mode") && videoItSelf.paused);
            if (isVideoPaused) {
                playButton.setAttribute("data-title-no-tooltip", "일시중지");
                playButton.setAttribute("title", "일시중지(k)");
                playSvgPath.setAttribute("d", "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z");
                videoPlayer.classList.replace("paused-mode", "playing-mode");
                videoItSelf.play();
            } else {
                playButton.setAttribute("data-title-no-tooltip", "재생");
                playButton.setAttribute("title", "재생(k)");
                playSvgPath.setAttribute("d", "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z");
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
