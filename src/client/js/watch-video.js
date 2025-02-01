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
    const leftControl = controls.querySelector(".wtp-left-controls");
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
            },
            animation: {
                addSlash: function() {
                    return new Promise((resolve) => {
                        const slashDef = muteButton.querySelector("svg defs #wtp-svg-volume-animation-slash-mask path");
                        const slashShadowDef = muteButton.querySelector("svg defs #wtp-svg-volume-animation-mask .wtp-svg-volume-animation-mover");
                        const hider = muteButton.querySelector(".wtp-svg-fill.wtp-svg-volume-animation-hider");
                        hider.removeAttribute("style");
                        let i = 0;
                        function animate() {
                            if (i <= 20) {
                                allocate.attribute(slashDef, "transform", `translate(${i}, ${i})`);
                                allocate.attribute(slashShadowDef, "transform", `translate(${i}, ${i})`);
                                i++;
                                requestAnimationFrame(animate);
                            } else {
                                allocate.attribute(slashShadowDef, "transform", "translate(0, 0)");
                                allocate.attribute(hider, "style", "display: none;");
                                resolve();
                            }
                        };
                        requestAnimationFrame(animate);
                    });
                },
                removeSlash: function() {
                    const slashDef = muteButton.querySelector("svg defs #wtp-svg-volume-animation-slash-mask path");
                    const slashShadowDef = muteButton.querySelector("svg defs #wtp-svg-volume-animation-mask .wtp-svg-volume-animation-mover");
                    const hider = muteButton.querySelector(".wtp-svg-fill.wtp-svg-volume-animation-hider");
                    let i = 20;
                    hider.removeAttribute("style");
                    function animate() {
                        if (i > 0) {
                            allocate.attribute(slashDef, "transform", `translate(${i}, ${i})`);
                            allocate.attribute(slashShadowDef, "transform", `translate(${i}, ${i})`);
                            i--;
                            requestAnimationFrame(animate);
                        };
                    };
                    requestAnimationFrame(animate);
                },
                expandSpeaker: function() {
                    return new Promise((resolve) => {
                        const paths = [
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,24.887973355301682 C21.956065078968944,23.968563222078192 24.117973355301682,21.235475212192434 24.117973355301682,18 C24.117973355301682,14.764524787807566 21.956065078968944,12.03143677792181 19,11.168487444039267 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,24.987062689253204 C22.011555105981795,24.068148002699473 24.217062689253204,21.290469792535532 24.217062689253204,18 C24.217062689253204,14.709530207464471 22.011555105981795,11.931851997300528 19,11.066425430069197 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.0659096448 C22.055709401088002,24.147389193024 24.2959096448,21.334229852864002 24.2959096448,18 C24.2959096448,14.665770147136 22.055709401088002,11.852610806976001 19,10.985213065856 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.163439138096905 C22.11032591733427,24.24540633378739 24.393439138096905,21.388358721643783 24.393439138096905,18 C24.393439138096905,14.611641278356219 22.11032591733427,11.754593666212612 19,10.884757687760189 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.21762050730776 C22.140667484092347,24.2998586098443 24.44762050730776,21.41842938155581 24.44762050730776,18 C24.44762050730776,14.581570618444193 22.140667484092347,11.7001413901557 19,10.828950877473005 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.306621743166318 C22.19050817617314,24.38930485188215 24.536621743166318,21.46782506745731 24.536621743166318,18 C24.536621743166318,14.532174932542693 22.19050817617314,11.61069514811785 19,10.73727960453869 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.36429834633381 C22.222807073946935,24.44726983806548 24.59429834633381,21.499835582215265 24.59429834633381,18 C24.59429834633381,14.500164417784735 22.222807073946935,11.55273016193452 19,10.677872703276174 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.418805106653718 C22.253330859726084,24.502049132186986 24.648805106653718,21.530086834192815 24.648805106653718,18 C24.648805106653718,14.469913165807187 22.253330859726084,11.497950867813014 19,10.62173074014667 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.550884890879267 C22.327295538892393,24.634789315333666 24.780884890879268,21.603391114437997 24.780884890879268,18 C24.780884890879268,14.396608885562006 22.327295538892393,11.365210684666335 19,10.485688562394353 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.615745378758284 C22.36361741210464,24.69997410565208 24.845745378758284,21.63938868521085 24.845745378758284,18 C24.845745378758284,14.360611314789152 22.36361741210464,11.300025894347923 19,10.418882259878966 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.732751516648385 C22.429140849323097,24.81756527423163 24.962751516648385,21.704327091739856 24.962751516648385,18 C24.962751516648385,14.295672908260146 22.429140849323097,11.182434725768372 19,10.29836593785216 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.83586430697355 C22.48688401190519,24.92119362850842 25.065864306973552,21.76155469037032 25.065864306973552,18 C25.065864306973552,14.238445309629679 22.48688401190519,11.07880637149158 19,10.19215976381724 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.088843005785876 C22.62855208324009,25.175437220814803 25.318843005785876,21.901957868211163 25.318843005785876,18 C25.318843005785876,14.09804213178884 22.62855208324009,10.824562779185197 19,9.93159170404055 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.23629308707538 C22.711124128762215,25.323624552510758 25.466293087075382,21.983792663326838 25.466293087075382,18 C25.466293087075382,14.016207336673164 22.711124128762215,10.676375447489242 19,9.779718120312358 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.433725953389402 C22.821686533898067,25.522044583156347 25.663725953389402,22.093367904131117 25.663725953389402,18 C25.663725953389402,13.906632095868883 22.821686533898067,10.477955416843653 19,9.576362268008918 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.728223376310027 C22.986605090733615,25.818014493191576 25.958223376310027,22.256813973852065 25.958223376310027,18 C25.958223376310027,13.743186026147937 22.986605090733615,10.181985506808424 19,9.273029922400674 L19,11.29 Z",
                            "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
                        ];
                        const speaker = muteButton.querySelector("#wtp-id-15");
                        let index = 0;
                        function animate() {
                            if (index < paths.length) {
                                speaker.setAttribute("d", paths[index]);
                                index++;
                                requestAnimationFrame(animate);
                            } else
                                resolve();
                        };
                        requestAnimationFrame(animate);
                    })
                },
                shrinkSpeaker: function() {
                    const paths = [
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.728858579478924 C22.9869608045082,25.81865287237632 25.958858579478925,22.257166511610805 25.958858579478925,18 C25.958858579478925,13.742833488389198 22.9869608045082,10.181347127623683 19,9.27237566313671 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.593396722093306 C22.911102164372252,25.682513705703773 25.823396722093307,22.181985180761785 25.823396722093307,18 C25.823396722093307,13.818014819238215 22.911102164372252,10.317486294296227 19,9.411901376243893 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.4863787648 C22.851172108288,25.574960658624 25.716378764799998,22.122590214464 25.716378764799998,18 C25.716378764799998,13.877409785536 22.851172108288,10.425039341376001 19,9.522129872256 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.3977538816 C22.801542173696003,25.485892651008 25.6277538816,22.073403404288 25.6277538816,18 C25.6277538816,13.926596595712 22.801542173696003,10.514107348992 19,9.613413501952 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.313640514896836 C22.75443868834223,25.40135871747132 25.543640514896836,22.026720485767747 25.543640514896836,18 C25.543640514896836,13.973279514232257 22.75443868834223,10.59864128252868 19,9.70005026965626 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.24396213490965 C22.715418795549407,25.3313319455842 25.47396213490965,21.988048984874858 25.47396213490965,18 C25.47396213490965,14.011951015125144 22.715418795549407,10.668668054415802 19,9.77181900104306 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.17824145468079 C22.678615214621242,25.265282661954195 25.40824145468079,21.95157400734784 25.40824145468079,18 C25.40824145468079,14.048425992652163 22.678615214621242,10.734717338045806 19,9.839511301678787 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.101359485103163 C22.635561311657774,25.18801628252868 25.331359485103164,21.90890451423226 25.331359485103164,18 C25.331359485103164,14.091095485767745 22.635561311657774,10.811983717471321 19,9.918699730343741 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.01829902464014 C22.58904745379848,25.10454051976334 25.24829902464014,21.862805958675278 25.24829902464014,18 C25.24829902464014,14.137194041324722 22.58904745379848,10.89545948023666 19,10.004252004620657 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.919853119790055 C22.533917747082434,25.005602385389007 25.149853119790055,21.808168481483484 25.149853119790055,18 C25.149853119790055,14.19183151851652 22.533917747082434,10.994397614610994 19,10.105651286616242 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.80953551565309 C22.47213988876573,24.894733193231357 25.039535515653093,21.746942211187466 25.039535515653093,18 C25.039535515653093,14.253057788812535 22.47213988876573,11.105266806768643 19,10.219278418877316 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.6639712384 C22.390623893504,24.748441094592 24.8939712384,21.666154037312 24.8939712384,18 C24.8939712384,14.333845962688 22.390623893504,11.251558905408 19,10.369209624448 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.49078322200964 C22.293638604325402,24.57438713811969 24.72078322200964,21.57003468821535 24.72078322200964,18 C24.72078322200964,14.429965311784649 22.293638604325402,11.42561286188031 19,10.54759328133007 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.287321943193668 C22.179700288188457,24.36990855290964 24.517321943193668,21.45711367847249 24.517321943193668,18 C24.517321943193668,14.542886321527513 22.179700288188457,11.630091447090363 19,10.75715839851052 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,25.040378576346992 C22.041412002754317,24.12173046922873 24.270378576346992,21.320060109872582 24.270378576346992,18 C24.270378576346992,14.679939890127418 22.041412002754317,11.878269530771272 19,11.011510066362597 L19,11.29 Z",
                        "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
                    ];
                    const speaker = muteButton.querySelector("#wtp-id-15");
                    let index = 0;
                    function animate() {
                        if (index < paths.length) {
                            speaker.setAttribute("d", paths[index]);
                            index++;
                            requestAnimationFrame(animate);
                        };
                    };
                    requestAnimationFrame(animate);
                },
            },
            action: {
                resetSvg: function() { muteButton.querySelector("svg").remove() },
                toMute: function() {
                    return new Promise((resolve) => {
                        videoItSelf.muted = true;
                        allocate.action.resetSvg();
                        
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
    
                        allocate.attribute(muteButton, "data-title-no-tooltip", "음소거 해제");
                        allocate.attribute(muteButton, "title", "음소거 해제");
                        allocate.attribute(muteButton, "aria-label", "음소거 해제 단축키 m");
                        allocate.attribute(volumePanel, "aria-valuetext", `${(localStorage.getItem("VIDEO_VOLUME") * 100)} 음소거됨`);
                        localStorage.setItem("IS_VIDEO_MUTED", "true");
                        resolve();
                    });
                },
                toUnmute: function() {
                    return new Promise((resolve) => {
                        videoItSelf.muted = false;
                        allocate.action.resetSvg();
    
                        const newSvg = create("svg");
                        const firstUse = create("use");
                        const secondUse = create("use");
                        const defs = create("defs");
                        const firstClipPath = create("clipPath");
                        const firstPathInsideFirstClipPath = create("path");
                        const secondPathInsideFirstClipPath = create("path");
                        const thirdPathInsideFirstClipPath = create("path");
                        const secondClipPath = create("clipPath");
                        const pathInsideSecondClipPath = create("path");
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
                            "d": "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z",
                            "fill": "#fff",
                            "id": "wtp-id-15"
                        });
                        allocate.attribute(secondPath, {
                            "class": "wtp-svg-fill wtp-svg-volume-animation-hider",
                            "clip-path": "url(#wtp-svg-volume-animation-slash-mask)",
                            "d": "M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z",
                            "fill": "#fff",
                            "id": "wtp-id-16",
                        });
                        newSvg.append(firstUse, secondUse, defs, firstPath, secondPath);
                        muteButton.appendChild(newSvg);
                        
                        allocate.attribute(muteButton, "data-title-no-tooltip", "음소거");
                        allocate.attribute(muteButton, "title", "음소거");
                        allocate.attribute(muteButton, "aria-label", "음소거 단축키 m");
                        allocate.attribute(volumePanel, "aria-valuetext", `${volumePanel.getAttribute("aria-valuetext").replace(" 음소거됨", "")}`);
                        localStorage.setItem("IS_VIDEO_MUTED", "false");
                        resolve();
                    });
                },
            },
            muteButtonAction: {
                toMute: async function() {
                    volumeSliderHandle.style.left = "0px";
                    await Promise.all([allocate.animation.expandSpeaker(), allocate.animation.addSlash()]);
                    allocate.action.toMute();
                    allocate.attribute(muteButton, "data-title-no-tooltip", "음소거 해제");
                    allocate.attribute(muteButton, "title", "음소거 해제");
                    allocate.attribute(muteButton, "aria-label", "음소거 해제 단축키 m");
                    allocate.attribute(volumePanel, "aria-valuetext", `${(localStorage.getItem("VIDEO_VOLUME") * 100)} 음소거됨`);
                    localStorage.setItem("IS_VIDEO_MUTED", "true");
                    videoItSelf.muted = true;
                },
                toUnmute: async function() {
                    volumeSliderHandle.style.left = `${localStorage.getItem("VIDEO_VOLUME_SLIDER_HANDLE_LEFT")}px`;
                    await allocate.action.toUnmute();
                    allocate.animation.removeSlash();
                    allocate.animation.shrinkSpeaker();
                    allocate.attribute(muteButton, "data-title-no-tooltip", "음소거");
                    allocate.attribute(muteButton, "title", "음소거");
                    allocate.attribute(muteButton, "aria-label", "음소거 단축키 m");
                    allocate.attribute(volumePanel, "aria-valuetext", `${volumePanel.getAttribute("aria-valuetext").replace(" 음소거됨", "")}`);
                    localStorage.setItem("IS_VIDEO_MUTED", "false");
                    videoItSelf.muted = false;
                },
            }
        };
        let wasVolumeZero = false, wasVolumeUnderHalf = false, wasVolumeOverHalf = false;
        async function videoVolumeUpdate(mouseEvent) {
            const volumeSliderRect = volumeSlider.getBoundingClientRect();
            const sliderHandleWidth = volumeSliderHandle.offsetWidth;
            const practicalSliderWidth = volumeSliderRect.width - sliderHandleWidth;
            let mousePositionInSlider = Math.max(
                0
                ,
                Math.min(
                    mouseEvent.clientX - volumeSliderRect.left - (sliderHandleWidth / 2)
                    ,
                    practicalSliderWidth
                )
            );
            let videoVolumeToIndicate = Math.round((mousePositionInSlider / practicalSliderWidth) * VIDEO_MAX_VOLUME);
            let actualVideoVolume = (videoVolumeToIndicate / VIDEO_MAX_VOLUME);
            let isVolumeZero = (actualVideoVolume === 0);
            let isVolumeUnderHalf = (actualVideoVolume < 0.5);

            if (actualVideoVolume < 0.1 || mousePositionInSlider < 0.4) {
                actualVideoVolume = 0;
                videoVolumeToIndicate = 0;
                mousePositionInSlider = 0;
            };

            if (isVolumeZero && !wasVolumeZero) {
                await Promise.all([allocate.animation.expandSpeaker(), allocate.animation.addSlash()]);
                setTimeout(() => { allocate.action.toMute() }, 10);
                wasVolumeZero = true;
                wasVolumeUnderHalf = false;
                wasVolumeOverHalf = false;
                return;
            };
            if (isVolumeUnderHalf && !wasVolumeUnderHalf && !isVolumeZero) {
                if (!wasVolumeOverHalf) {
                    await allocate.action.toUnmute();
                    allocate.animation.removeSlash();
                };
                allocate.animation.shrinkSpeaker();
                wasVolumeZero = false;
                wasVolumeUnderHalf = true;
                wasVolumeOverHalf = false;
                return;
            };
            if (!isVolumeUnderHalf && !isVolumeZero && (wasVolumeUnderHalf || wasVolumeZero)) {
                allocate.animation.expandSpeaker();
                wasVolumeZero = false;
                wasVolumeUnderHalf = false;
                wasVolumeOverHalf = true;
            };

            volumeSliderHandle.style.left = `${mousePositionInSlider.toFixed(2)}px`;
            videoItSelf.volume = actualVideoVolume;
            localStorage.setItem("VIDEO_VOLUME", String(actualVideoVolume));
            localStorage.setItem("VIDEO_VOLUME_SLIDER_HANDLE_LEFT", String(mousePositionInSlider.toFixed(2)));
            volumePanel.setAttribute("aria-valuenow", String(videoVolumeToIndicate));
            volumePanel.setAttribute("aria-valuetext", `${videoVolumeToIndicate}% 볼륨`);
        };
        const create = (elementInText) => document.createElementNS("http://www.w3.org/2000/svg", `${elementInText}`);
        const VIDEO_MAX_VOLUME = 100;
        let isDragging = false;
        leftControl.addEventListener("mouseleave", () => {
            chromeBottom.classList.remove("wtp-volume-slider-active");
            volumePanel.classList.remove("wtp-volume-control-hover");
        });
        [muteButton, volumePanel].forEach((element) => {
            element.addEventListener("mouseenter", () => {
                chromeBottom.classList.add("wtp-volume-slider-active");
                volumePanel.classList.add("wtp-volume-control-hover");
            });
        });
        muteButton.addEventListener("click", () => {
            if (videoItSelf.muted) {
                allocate.muteButtonAction.toUnmute();
            } else {
                allocate.muteButtonAction.toMute();
            };
        });
        document.addEventListener("mousemove", (event) => { if (isDragging) videoVolumeUpdate(event) });
        document.addEventListener("mouseup", () => { if (isDragging) isDragging = false });
        volumeSlider.addEventListener("mousedown", (event) => { isDragging = true; event.preventDefault() });
        volumeSlider.addEventListener("click", (event) => videoVolumeUpdate(event));
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
            playButton.setAttribute("data-title-no-tooltip", "일시중지");
            playButton.setAttribute("title", "일시중지(k)");
            pauseToPlay_SVG();
            videoPlayer.classList.replace("paused-mode", "playing-mode");
            videoItSelf.play();
        });
        videoItSelf.addEventListener("pause", () => {
            playButton.setAttribute("data-title-no-tooltip", "재생");
            playButton.setAttribute("title", "재생(k)");
            playToPause_SVG();
            videoPlayer.classList.replace("playing-mode", "paused-mode");
            videoItSelf.pause();
        });
    })();
    /*fullscreen button, video size adjust*/
    (function() {
        const watchFlexy = document.querySelector(".wtd-watch-flexy-html-tag");
        const playerFullBleedContainer = document.querySelector("#player-full-bleed-container.wtd-watch-flexy");
        const playerContainerInner = document.querySelector("#player-container-inner.wtd-watch-flexy");
        const playerContainer = document.querySelector("#player-container.wtd-watch-flexy");
        const moviePlayer = document.querySelector("#movie_player");
        const rightControls = document.querySelector(".wtp-chrome-bottom .wtp-right-controls");
        const settingsButton = rightControls.querySelector(".wtp-settings-button.wtp-button");
        const miniplayerButton = rightControls.querySelector(".wtp-miniplayer-button.wtp-button");
        const sizeButton = rightControls.querySelector(".wtp-size-button.wtp-button");
        const fullscreenButton = controls.querySelector(".wtp-fullscreen-button.wtp-button");
        const buttonSvg = fullscreenButton.querySelector("svg");
        const corners = buttonSvg.querySelectorAll("g");
        const videoItSelf = document.querySelector("#wtd-player .html5-video-container video");
        const playerContainerOuter = document.querySelector(".wtd-watch-flexy-html-tag #columns #player-container-outer");
        const chromeBottom = document.querySelector("#movie_player .wtp-chrome-bottom");
        const chapterHover = chromeBottom.querySelector(".wtp-chapter-hover-container");
        const playProgress = chapterHover.querySelector(".wtp-play-progress.wtp-swatch-background-color");
        let resizeTimeout = null, IS_FULL_SCREEN = false;
        let aspectRatio, videoWidth;

        function fullscreenResize() {
            aspectRatio = (videoItSelf.videoWidth / videoItSelf.videoHeight);

            if (window.innerHeight * aspectRatio <= window.innerWidth)
                videoWidth = window.innerHeight * aspectRatio;
            else
                videoWidth = window.innerWidth;

            videoItSelf.style.width = `${videoWidth}px`;
            videoItSelf.style.height = `${window.innerHeight}px`;
            videoItSelf.style.left = `${(window.innerWidth - videoWidth) / 2}px`;
        };
        function defaultPlayerAdjust() {
            const { width: w, height: h } = playerContainerOuter.getBoundingClientRect();
            const controllerWidth = playerContainerOuter.getBoundingClientRect().width;

            videoItSelf.style.width = `${w}px`;
            videoItSelf.style.height = `${h}px`;
            chromeBottom.style.width = `${controllerWidth - 24}px`;
            chapterHover.style.width = `${controllerWidth - 24}px`;
            playProgress.style.backgroundSize = `${controllerWidth - 24}px`;
        };
        function onVideoResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(defaultPlayerAdjust, 100);
        };
        function EXIT_FULLSCREEN_ACTION() {
            document.exitFullscreen();
    
            corners.forEach((eachCorner) => buttonSvg.removeChild(eachCorner));
            [0, 1, 2, 3].forEach((index) => buttonSvg.appendChild(corners[index]));
            corners[0].style.transform = "translate(0, 0)";
            corners[1].style.transform = "translate(0, 0)";
            corners[2].style.transform = "translate(0, 0)";
            corners[3].style.transform = "translate(0, 0)";
    
            settingsButton.insertAdjacentElement("afterend", miniplayerButton);
            miniplayerButton.insertAdjacentElement("afterend", sizeButton);

            watchFlexy.removeAttribute("fullscreen");
            watchFlexy.removeAttribute("full-bleed-player");
            moviePlayer.setAttribute("aria-label", "WeTube 동영상 플레이어");
            videoPlayer.classList.remove("wtp-fullscreen");
            videoPlayer.classList.remove("wtp-big-mode");
            videoPlayer.classList.remove("wtp-large-width-mode");
            videoPlayer.classList.add("wtp-hide-info-bar");

    
            document.body.classList.remove("no-scroll");

            playerContainerInner.appendChild(playerContainer);

            window.removeEventListener("resize", fullscreenResize);
            window.addEventListener("resize", onVideoResize);

            localStorage.setItem("IS_FULL_SCREENING", "false");

            IS_FULL_SCREEN = false;
        };
        function ENTER_FULLSCREEN_ACTION() {
            playerFullBleedContainer.appendChild(playerContainer);
    
            corners.forEach((eachCorner) => buttonSvg.removeChild(eachCorner));
            [2, 3, 0, 1].forEach((index) => buttonSvg.appendChild(corners[index]));
            corners[0].style.transform = "translate(10px, 10px)";
            corners[1].style.transform = "translate(-10px, 10px)";
            corners[2].style.transform = "translate(-10px, -10px)";
            corners[3].style.transform = "translate(10px, -10px)";

            [miniplayerButton, sizeButton].forEach((element) => element.remove());
    
            watchFlexy.setAttribute("fullscreen", "");
            watchFlexy.setAttribute("full-bleed-player", "");
            moviePlayer.setAttribute("aria-label", "WeTube 동영상 플레이어 전체화면 모드");
            videoPlayer.classList.add("wtp-fullscreen");
            videoPlayer.classList.add("wtp-big-mode");
            videoPlayer.classList.add("wtp-large-width-mode");
            videoPlayer.classList.remove("wtp-hide-info-bar");

            document.body.classList.add("no-scroll");
    
            localStorage.setItem("IS_FULL_SCREENING", "true");

            window.removeEventListener("resize", onVideoResize);
            window.addEventListener("resize", fullscreenResize);

            playerContainer.requestFullscreen();
            IS_FULL_SCREEN = true;
        };
        function fullscreenToggle() {
            if (IS_FULL_SCREEN) 
                EXIT_FULLSCREEN_ACTION();
            else
                ENTER_FULLSCREEN_ACTION();
        };
        function onKeydown(event) {
            if (event.key === "f") {
                event.preventDefault();
                if (IS_FULL_SCREEN) 
                    EXIT_FULLSCREEN_ACTION();
                else
                    ENTER_FULLSCREEN_ACTION();                
            };
            if (event.key === " ") {

                event.preventDefault();
            };
            /*
            if (event.key === "m")
            if (event.key === "j")
            if (event.key === "k")
            if (event.key === "l")
            if (event.key === "ArrowUp")
            if (event.key === "ArrowDown")
            */
        };
        function onFullscreenChange() {
            if (document.fullscreenElement) {
                videoItSelf.style.height = `${window.innerHeight}px`;
                videoItSelf.style.width = `${window.innerWidth}px`;
                chromeBottom.style.width = `${window.innerWidth - 48}px`;
                chromeBottom.style.left = "24px";
            } else {
                videoItSelf.style.left = "0px";
                chromeBottom.style.left = "12px";
            };
        };
        document.addEventListener("keydown", onKeydown);
        document.addEventListener("fullscreenchange", onFullscreenChange);
        fullscreenButton.addEventListener("click", fullscreenToggle);
        videoItSelf.addEventListener("loadeddata", defaultPlayerAdjust);
        window.addEventListener("resize", onVideoResize);
    })();
    /*chrome bottom, top vanish*/
    (function() {
        const playerContainer = document.querySelector("#player-container.wtd-watch-flexy");
        const moviePlayer = document.querySelector("#movie_player");
        let cursorStopTimePassed;
        function showChromeBottom() {
            moviePlayer.classList.remove("wtp-autohide");
            clearTimeout(cursorStopTimePassed);
            cursorStopTimePassed = setTimeout(hideChromeBottom, 3000);
        };
        function hideChromeBottom() {
            if (videoItSelf.paused)
                moviePlayer.classList.remove("wtp-autohide");    
            else
                moviePlayer.classList.add("wtp-autohide");
        };
        playerContainer.addEventListener("mousemove", showChromeBottom);
        playerContainer.addEventListener("mouseleave", hideChromeBottom);
    })();
});
/*video description*/
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
                [nbsp, expandSizer, expand].forEach((element) => element.setAttribute("hidden", ""));
                [collapse, structuredDescription].forEach((element) => element.removeAttribute("hidden"));
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
                [nbsp, expandSizer, expand].forEach((element) => element.removeAttribute("hidden"));
                [collapse, structuredDescription].forEach((element) => element.setAttribute("hidden", ""));
                isExpanded = false;
            };
        });
    })();
});
