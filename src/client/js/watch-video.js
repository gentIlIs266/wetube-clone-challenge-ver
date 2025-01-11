import { sharing } from "webpack";
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
/*progress bar*/
document.addEventListener("DOMContentLoaded", () => {
    const moviePlayer = document.querySelector("#movie_player.html5-video-player");
    const videoItSelf = document.querySelector("#wtd-player .html5-video-container video");
    const chromeBottom = document.querySelector("#movie_player .wtp-chrome-bottom");
    const progressBar = chromeBottom.querySelector(".wtp-progress-bar");
    const playProgress = chromeBottom.querySelector(".wtp-play-progress");
    const loadProgress = progressBar.querySelector(".wtp-load-progress");
    const scrubberContainer = progressBar.querySelector(".wtp-scrubber-container");
    let progressBarWidth = 0;
    let wholeVideoLength = 0;
    function getTimeStr(d) {
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor(d % 60);
        return h > 0 ? `${h} 시 ${m} 분 ${s}초` : `${m} 분 ${s}초`;
    };
    function getDefaultTimeStr(d) {
        const h = Math.floor(d / 3600);
        return h > 0 ? `0 시 0 분 0초` : `0 분 0초`;
    };
    function updateProgressBarWidth() {
        progressBarWidth = progressBar.getBoundingClientRect().width;
    }; updateProgressBarWidth();

    window.addEventListener("resize", updateProgressBarWidth);
    videoItSelf.addEventListener("loadedmetadata", () => {
        wholeVideoLength = Math.floor(videoItSelf.duration);
        progressBar.setAttribute("aria-valuemax", `${wholeVideoLength}`);
        progressBar.setAttribute("aria-valuetext", `${getDefaultTimeStr(wholeVideoLength)}/${getTimeStr(wholeVideoLength)}`);
    });
    videoItSelf.addEventListener("timeupdate", () => {
        const progress = (videoItSelf.currentTime / videoItSelf.duration);
        const now = Math.floor(videoItSelf.currentTime);

        updateProgressBarWidth();
        const playProgressWidth = progress * progressBarWidth;
        const scrubberCenter = playProgressWidth - scrubberContainer.offsetWidth / 2;
        
        progressBar.setAttribute("aria-valuenow", `${now}`);
        progressBar.setAttribute("aria-valuetext", `${getTimeStr(now)}/${getTimeStr(wholeVideoLength)}`);

        playProgress.style.transform = `scaleX(${progress})`;
        scrubberContainer.style.transform = `translateX(${scrubberCenter}px)`;
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
    const volumeSlider = volumePanel.querySelector(".wtp-volume-slider");
    const volumeSliderHandle = volumePanel.querySelector(".wtp-volume-slider-handle");
    /*video duration display*/
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
    /*autonav toggle*/
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
    /*subtitle button*/
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
    /*volume*/
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
        let isDragging = false;
        const videoMaxVolume = 100;
        function videoVolumeUpdate(mouseEvent) {
            const { width: sliderWidth, left: sliderLeft } = volumeSlider.getBoundingClientRect();
            const offsetX = Math.max(0, Math.min(mouseEvent.clientX - sliderLeft, sliderWidth));
            const videoVolumeToIndicate = Math.round((offsetX / sliderWidth) * videoMaxVolume);
            const videoVolumePercentage = (videoVolumeToIndicate / videoMaxVolume);
            const actualVideoVolume = (offsetX / sliderWidth);
            const handleWidth = volumeSliderHandle.offsetWidth;

            const handleLeft = offsetX - handleWidth / 2;
            volumeSliderHandle.style.left = `${Math.max(0, Math.min(handleLeft, sliderWidth - handleWidth))}px`;

            videoItSelf.volume = actualVideoVolume;
            volumePanel.setAttribute("aria-valuenow", `${videoVolumeToIndicate}`);
            volumePanel.setAttribute("aria-valuetext", `${videoVolumePercentage}% 볼륨`);
        };
        function setInitialVideoVolume() {
            const sliderWidth = volumeSlider.getBoundingClientRect().width;
            const handleWidth = volumeSliderHandle.offsetWidth;
            
            const initialVideoVolume = videoItSelf.volume;
            const offsetX = (initialVideoVolume * sliderWidth);
            const handleLeft = offsetX - handleWidth / 2;
            volumeSliderHandle.style.left = `${(Math.max(0, Math.min(handleLeft, sliderWidth - handleWidth)))}px`;
            
            volumePanel.setAttribute("aria-valuenow", String(Math.round(initialVideoVolume * videoMaxVolume)));
            volumePanel.setAttribute("aria-valuetext", `${initialVideoVolume * videoMaxVolume}% 볼륨`);
        };
        videoItSelf.addEventListener("loadedmetadata", () => {
            setTimeout(setInitialVideoVolume, 1);
        });
        [volumeSlider, volumeSliderHandle].forEach((element) => {
            element.addEventListener("mousedown", (event) => {
                isDragging = true;
                event.preventDefault();
            });
        });
        document.addEventListener("mousemove", (event) => { if (isDragging) videoVolumeUpdate(event) });
        document.addEventListener("mouseup", () => { if (isDragging) isDragging = false });
        volumeSlider.addEventListener("click", (event) => videoVolumeUpdate(event));
    })();
    /*mute button active*/
    (function() {
        const allocate = {
            attribute: function() {
                const a = arguments;
                if (a.length > 2)
                    a[0].setAttribute(`${a[1]}`, `${a[2]}`);
                else {
                    let k;
                    for (k in a[1])
                        a[0].setAttribute(k, a[1][k]);
                };
            }
        };
        const resetSvg = () => muteButton.querySelector("svg").remove();
        const create = (elementInText) => document.createElementNS("http://www.w3.org/2000/svg", `${elementInText}`);
        function muteToUnmuteAction() {
            function setSvg() {
                const newSvg = create("svg");
                const firstUse = create("use");
                const secondUse = create("use");
                const defs = create("defs");
                const firstClipPath = create("clipPath");
                const firstPathInsideFirstClipPath = create("path");
                const secondPathInsideFirstClipPath = create("path");
                const thirdPathInsideFirstClipPath = create("path");
                const secondClipPath = create("clipPath");
                const pathInsideSecondClipPath = create("clipPath");
                const firstPath = create("path");
                const secondPath = create("path");
                allocate.attribute(newSvg, { "height": "100%", "version": "1.1", "viewBox": "0 0 36 36", "width": "100%" });
                allocate.attribute(firstUse, { "class": "wtp-svg-shadow", "href": "#wtp-id-15" });
                allocate.attribute(secondUse, { "class": "wtp-svg-shadow", "href": "#wtp-id-16" });
                allocate.attribute(firstClipPath, "id", "wtp-svg-volume-animation-mask");
                allocate.attribute(firstPathInsideFirstClipPath, "d", "m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z");
                allocate.attribute(secondPathInsideFirstClipPath, "d", "M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z");
                allocate.attribute(thirdPathInsideFirstClipPath, {
                    "class": "wtp-svg-volume-animation-mover",
                    "d": "M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z",
                    "transform": "translate(0, 0)"
                });
                firstClipPath.append(firstPathInsideFirstClipPath, secondPathInsideFirstClipPath, thirdPathInsideFirstClipPath);
                allocate.attribute(secondClipPath, "id", "wtp-svg-volume-animation-slash-mask");
                allocate.attribute(pathInsideSecondClipPath, {
                    "class": "wtp-svg-volume-animation-mover",
                    "d": "m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z",
                    "transform": "translate(0, 0)"
                });
                secondClipPath.append(pathInsideSecondClipPath);
                defs.append(firstClipPath, secondClipPath);
                allocate.attribute(firstPath, {
                    "class": "wtp-svg-fill wtp-svg-volume-animation-speaker",
                    "clip-path": "url(#wtp-svg-volume-animation-mask)",
                    "d": "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z",
                    "fill": "#fff",
                    "id": "wtp-id-15"
                });
                allocate.attribute(secondPath, {
                    "class": "wtp-svg-fill wtp-svg-volume-animation-hider",
                    "clip-path": "url(#wtp-svg-volume-animation-slash-mask)",
                    "d": "M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z",
                    "fill": "#fff",
                    "id": "wtp-id-16"
                });
                newSvg.append(firstUse, secondUse, defs, firstPath, secondPath);
                muteButton.appendChild(newSvg);
            };
            resetSvg();
            setSvg();
            allocate.attribute(muteButton, "data-title-no-tooltip", "음소거");
            allocate.attribute(muteButton, "title", "음소거");
            allocate.attribute(muteButton, "aria-label", "음소거 단축키 m");
            allocate.attribute(volumePanel, "aria-valuetext", `${volumePanel.getAttribute("aria-valuetext").replace(" 음소거됨", "")}`);
        };
        function unmuteToMuteAction() {
            function setSvg() {
                const newSvg = create("svg");
                const use = create("use");
                const path = create("path");
                allocate.attribute(newSvg, { "height": "100%", "version": "1.1", "viewBox": "0 0 36 36", "width": "100%" });
                allocate.attribute(use, { "class": "wtp-svg-shadow", "href": "#wtp-id-253" });
                allocate.attribute(path, {
                    "class": "wtp-svg-fill",
                    "d": "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z",
                    "id": "wtp-id-253"
                });
                newSvg.append(use, path);
                muteButton.appendChild(newSvg);
            };
            resetSvg();
            setSvg();
            allocate.attribute(muteButton, "data-title-no-tooltip", "음소거 해제");
            allocate.attribute(muteButton, "title", "음소거 해제");
            allocate.attribute(muteButton, "aria-label", "음소거 해제 단축키 m");
            allocate.attribute(volumePanel, "aria-valuetext", `${volumePanel.getAttribute("aria-valuetext")} 음소거됨`);
        };
        muteButton.addEventListener("click", () => {
            if (videoItSelf.muted) {
                muteToUnmuteAction();
                localStorage.setItem("IS_VIDEO_MUTED", "false");
                videoItSelf.muted = false;
            } else {
                unmuteToMuteAction();
                localStorage.setItem("IS_VIDEO_MUTED", "true");
                videoItSelf.muted = true;
            };
        });
    })();
    /*play/pause button*/
    (function() {
        function pauseToPlay_SVG() {
            const paths = [
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
            ];
            let index = 0;
            function animate() {
                if (index < paths.length) {
                    playSvgPath.setAttribute("d", paths[index]);
                    index++;
                    requestAnimationFrame(animate);
                };
            };
            requestAnimationFrame(animate);
        };
        function playToPause_SVG() {
            const paths = [
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
            ];
            let index = 0;
            function animate() {
                if (index < paths.length) {
                    playSvgPath.setAttribute("d", paths[index]);
                    index++;
                    requestAnimationFrame(animate);
                };
            };
            requestAnimationFrame(animate);
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
                playToPause_SVG();
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
document.addEventListener("DOMContentLoaded", () => {
    (function() {
        const expandSizer = document.querySelector("#expand-sizer.tp-wt-paper-button-html-tag");
        const expand = document.querySelector("#expand.tp-wt-paper-button-html-tag");
        expand.style.left = `${expandSizer.offsetLeft}px`;
    })();
    (function() {
        const wtdTextInlineExpander = document.querySelector("#description-inline-expander.wtd-text-inline-expander-html-tag");
        const expandedDescriptionUserInput = wtdTextInlineExpander.querySelector("wt-attributed-string");
        const expand = document.querySelector("#expand.tp-wt-paper-button-html-tag");
        const snippet = document.querySelector("#snippet.wtd-text-inline-expander");
        const snippetText = document.querySelector("#snippet-text.wtd-text-inline-expander")
        const nbsp = snippet.querySelector(".wtd-text-inline-expander:nth-child(2):not([user-input])");
        const expandSizer = snippet.querySelector("#expand-sizer");
        const collapse = document.querySelector("#collapse.wtd-text-inline-expander");
        const structuredDescription = document.querySelector(".wtd-watch-metadata[slot=extra-content] #structured-description");
        let isExpanded = false;
        expand.addEventListener("click", () => {
            if (!isExpanded) {
                wtdTextInlineExpander.setAttribute("is-expanded", "");
                expandedDescriptionUserInput.removeAttribute("hidden");
                snippetText.setAttribute("hidden", "");
                snippet.style = "";
                nbsp.setAttribute("hidden", "");
                expandSizer.setAttribute("hidden", "");
                expand.setAttribute("hidden", "");
                collapse.removeAttribute("hidden");
                structuredDescription.removeAttribute("hidden");
                isExpanded = true;
            };
        });
        collapse.addEventListener("click", () => {
            if (isExpanded) {
                wtdTextInlineExpander.removeAttribute("is-expanded");
                expandedDescriptionUserInput.setAttribute("hidden", "");
                snippetText.removeAttribute("hidden");
                snippet.style.overflow = "hidden";
                snippet.style.maxHeight = "6rem";
                nbsp.removeAttribute("hidden");
                expandSizer.removeAttribute("hidden");
                expand.removeAttribute("hidden");
                collapse.setAttribute("hidden", "");
                structuredDescription.setAttribute("hidden", "");
                isExpanded = false;
            };
        });
    })();
});
