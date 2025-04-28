import "../scss/components/watch-video.scss";

document.addEventListener("DOMContentLoaded", () => {
    const wtdWatchFlexyHtmlTag = document.querySelector(".wtd-watch-flexy-html-tag");
    const fullBleedContainer = document.querySelector("#full-bleed-container");
    const playerContainerOuter = document.querySelector("#player-container-outer");
    const playerContainerInner = document.querySelector("#player-container-inner");
    const playerContainer = document.querySelector("#player-container");
    const moviePlayer = document.querySelector("#movie_player");
    const videoItSelf = document.querySelector("video.html5-main-video");
    const chromeBottom = moviePlayer.querySelector(".wtp-chrome-bottom");
    const progressBar = chromeBottom.querySelector(".wtp-progress-bar");
    const chapterHoverContainer = progressBar.querySelector(".wtp-chapter-hover-container");
    const wtpPlayProgress = chapterHoverContainer.querySelector(".wtp-play-progress");
    const wtpLoadProgress = chapterHoverContainer.querySelector(".wtp-load-progress");
    const wtpHoverProgress = chapterHoverContainer.querySelector(".wtp-hover-progress");
    const wtpScrubberContainer = progressBar.querySelector(".wtp-scrubber-container");
    const wtpLeftControls = chromeBottom.querySelector(".wtp-left-controls");
    const wtpRightControls = chromeBottom.querySelector(".wtp-right-controls");
    const wtpPlayButton = wtpLeftControls.querySelector(".wtp-play-button.wtp-button");
    const playButtonSvgPath = wtpPlayButton.querySelector("svg path");
    const wtpMuteButton = wtpLeftControls.querySelector(".wtp-mute-button.wtp-button");
    const wtpVolumePanel = wtpLeftControls.querySelector(".wtp-volume-panel");
    const wtpVolumeSlider = wtpVolumePanel.querySelector(".wtp-volume-slider");
    const wtpVolumeSliderHandle = wtpVolumePanel.querySelector(".wtp-volume-slider-handle");
    const wtpTimeCurrent = wtpLeftControls.querySelector(".wtp-time-current");
    const wtpAutonavButton = wtpRightControls.querySelector(".wtp-autonav-toggle-button");
    const wtpSubtitleButton = wtpRightControls.querySelector(".wtp-subtitle-button");
    const wtpSettingsButton = wtpRightControls.querySelector(".wtp-settings-button");
    const wtpMiniplayerButton = wtpRightControls.querySelector(".wtp-miniplayer-button");
    const wtpSizeButton = wtpRightControls.querySelector(".wtp-size-button");
    const wtpFullscreenButton = wtpRightControls.querySelector(".wtp-fullscreen-button");
    const description = document.querySelector("#bottom-row #description");
    const descriptionInlineExpander = description.querySelector("#description-inline-expander");
    const expandedUserInput = description.querySelector("wt-attributed-string[user-input]");
    const snippet = description.querySelector("#snippet");
    const snippetText = snippet.querySelector("#snippet-text");
    const snippetGap = snippet.querySelector(".wtd-text-inline-expander:nth-child(2):not([user-input])");
    const expandSizer = snippet.querySelector("#expand-sizer");
    const expandButton = description.querySelector("#expand");
    const collapseButton = description.querySelector("#collapse");
    const structuredDescription = description.querySelector("#structured-description");
    let WINDOW_RESIZE_TIMEOUT;
    let CURSOR_STOP_TIMEOUT;
    let IS_CURSOR_OVER_CONTROLLER = false;
    let IS_VOLUME_SLIDER_ACTIVE = false;
    let VOLUME_SLIDER_DRAGGING = false;
    let VOLUME_WAS_ZERO = false, VOLUME_WAS_UNDER_HALF = false, VOLUME_WAS_OVER_HALF = false;
    let IS_AUTONAV_ACTIVE = true;
    let IS_SUBTITLE_ACTIVE = false;
    let IS_FULL_SCREEN = false;
    let IS_DESCRIPTION_EXPANDED = false;
    let IS_PROGRESS_BAR_DRAGGING = false;
    let WAS_VIDEO_PAUSE_BEFORE_ADJUST;
    let videoAspectRatio, videoWidth;
    let hoverProgressMousePosition;

    (function() {
        const pathArrays = {
            pauseToPlayPaths: [
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
            ],
            playToPausePaths: [
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
            ],
            speakerExpand: [
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
            ],
            speakerShrink: [
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
            ],
        };
        //global functions
        const glo_f = {
            /**
             * if (argument.length > 2)
             * if there's a single attribute to apply
             * @param {HTMLElement | SVGElement} a[0]
             * @param {String} a[1] attr key
             * @param {String} a[2] attr value
             * 
             * else
             * if there's a multiple attributes to apply
             * @param {HTMLElement | SVGElement} a[0]
             * @param {Object<{attrKey1: attrValue1, attrKey2: attrValue2, ...}>} a[1]
             */
            setAttr: function() {
                const a = arguments;
                if (a.length > 2)
                    a[0].setAttribute(`${a[1]}`, `${a[2]}`);
                else {
                    let k;
                    for (k in a[1])
                        a[0].setAttribute(k, a[1][k]);
                };
            },
            /** @returns {SVGElement} */
            create: function(elementName) {
                return document.createElementNS("http://www.w3.org/2000/svg", `${elementName}`);
            },
            /**
             * @param {Number} num
             * @returns {String}
             */
            padZero: function(num) {
                return String(num).padStart(2, "0");
            },
            /**
             * @param {Number} time 
             * @returns {String}
             */
            getTimeString: function(time) {
                const h = Math.floor(time / 3600);
                const m = Math.floor((time % 3600) / 60);
                const s = Math.floor(time % 60);

                return (h > 0)
                    ? `${h}시 ${m}분 ${s}초`
                    : `${m}분 ${s}초`;
            },
        };

        function videoAndControllerSizeAdjust() {
            const { 
                width: w, height: h
            } = playerContainerOuter.getBoundingClientRect();

            videoItSelf.style.width = `${w}px`;
            videoItSelf.style.height = `${h}px`;
            chromeBottom.style.width = `${w - 24}px`;
            chapterHoverContainer.style.width = `${w - 24}px`;
            wtpPlayProgress.style.backgroundSize = `${w - 24}px`;
        };
        function onNoFullscreenResize() {
            clearTimeout(WINDOW_RESIZE_TIMEOUT);
            WINDOW_RESIZE_TIMEOUT = setTimeout(videoAndControllerSizeAdjust, 100);
        };
        function onVideoEnded() {
            const videoId = wtdWatchFlexyHtmlTag.getAttribute("video-id");
            fetch(
                `/api/${videoId}/record_views`,
                {
                    method: "POST",
                }
            );
        };
        function onFullscreenResize() {
            videoAspectRatio = videoItSelf.videoWidth / videoItSelf.videoHeight;

            if (window.innerHeight * videoAspectRatio <= window.innerWidth) {
                videoWidth = window.innerHeight * videoAspectRatio;
            } else {
                videoWidth = window.innerWidth;
            };
            
            videoItSelf.style.width = `${videoWidth}px`;
            videoItSelf.style.height = `${window.innerHeight}px`;
            videoItSelf.style.left = `${((window.innerWidth - videoWidth) / 2)}px`;
        };

        function onLoadProgress() {
            if (videoItSelf.duration > 0 && videoItSelf.buffered.length > 0) {
                wtpLoadProgress.style.transform = `scaleX(${
                    videoItSelf.buffered.end(videoItSelf.buffered.length - 1) / videoItSelf.duration
                })`;
            };
        };
        function videoTimeUpdate() {
            function formatTime(currentTime) {
                const h = Math.floor(currentTime / 3600);
                const m = Math.floor((currentTime % 3600) / 60);
                const s = Math.floor(currentTime % 60);

                const padM = glo_f.padZero(m);
                const padS = glo_f.padZero(s);

                return (h > 0)
                    ? `${h}:${padM}:${padS}`
                    : `${m}:${padS}`;
            };
            const playProgress = videoItSelf.currentTime / videoItSelf.duration;
            const progressBarWidth = progressBar.offsetWidth;
            const playProgressWidth = progressBarWidth * playProgress;
            const now = Math.floor(videoItSelf.currentTime);

            if (IS_PROGRESS_BAR_DRAGGING) videoItSelf.pause();

            wtpPlayProgress.style.transform = `scaleX(${playProgress})`;
            wtpScrubberContainer.style.transform = `translateX(${playProgressWidth}px)`;
            wtpHoverProgress.style.left = `${playProgressWidth}px`;

            if (moviePlayer.classList.contains("wtp-progress-bar-hover")) {
                wtpHoverProgress.style.transform = `scaleX(${
                    (hoverProgressMousePosition / progressBarWidth) - playProgress
                })`;
            };
            
            wtpTimeCurrent.textContent = formatTime(videoItSelf.currentTime);
            progressBar.setAttribute("aria-valuenow", String(now));
            progressBar.setAttribute(
                "aria-valuetext",
                `${glo_f.getTimeString(now)}/${glo_f.getTimeString(videoItSelf.duration)}`
            );
        };
        


        function onPlayerContainerClick() {
            if (!IS_CURSOR_OVER_CONTROLLER) {
                if (videoItSelf.paused) {
                    video_PP.pauseToPlay();
                } else {
                    video_PP.playToPause();
                };
            };
        };
        function showChromeTopBottom() {
            moviePlayer.classList.remove("wtp-autohide");
            clearTimeout(CURSOR_STOP_TIMEOUT);
            CURSOR_STOP_TIMEOUT = setTimeout(hideChromeTopBottom, 3000);
        };
        function hideChromeTopBottom() {
            if (videoItSelf.paused)
                moviePlayer.classList.remove("wtp-autohide");
            else
                moviePlayer.classList.add("wtp-autohide");
        };

        function onMouseHoverProgressBar(event) {
            const PBWidth = progressBar.offsetWidth;
            const progress = videoItSelf.currentTime / videoItSelf.duration;
            hoverProgressMousePosition = Math.max(
                (PBWidth * progress),
                Math.min(event.offsetX, PBWidth)
            );
            const hoverScaleX = (hoverProgressMousePosition / PBWidth) - progress;

            wtpHoverProgress.style.transform = `scaleX(${hoverScaleX})`;
            moviePlayer.classList.add("wtp-progress-bar-hover");
        };
        function onMouseLeaveProgressBar() {
            moviePlayer.classList.remove("wtp-progress-bar-hover");
        };
        function adjustVideoProgress(mouseEvent) {
            if (!IS_PROGRESS_BAR_DRAGGING) return;
            
            const PB_rect = progressBar.getBoundingClientRect();
            const clickX = mouseEvent.clientX - PB_rect.left;
            let seekTime = (clickX / PB_rect.width) * videoItSelf.duration;

            seekTime = Math.max(0, Math.min(seekTime, videoItSelf.duration));

            videoItSelf.currentTime = seekTime;
            videoTimeUpdate();
        };
        function onProgressbarMousedown(event) {
            event.preventDefault();

            IS_PROGRESS_BAR_DRAGGING = true;
            WAS_VIDEO_PAUSE_BEFORE_ADJUST = !videoItSelf.paused;

            if (videoItSelf.paused)
                WAS_VIDEO_PAUSE_BEFORE_ADJUST = true;
            else {
                WAS_VIDEO_PAUSE_BEFORE_ADJUST = false;
                video_PP.playToPause();
            };
            
            adjustVideoProgress(event);
        };

        //video_play/pause
        const video_PP = {
            animation: function(paths) {
                let index = 0;
                function animate() {
                    if (index < paths.length) {
                        playButtonSvgPath.setAttribute("d", paths[index]);
                        index++;
                        requestAnimationFrame(animate);
                    };
                };
                requestAnimationFrame(animate);
            },
            pauseToPlay: function() {
                videoItSelf.play();
                wtpPlayButton.setAttribute("data-title-no-tooltip", "일시중지");
                wtpPlayButton.setAttribute("title", "일시중지(k)");
                moviePlayer.classList.replace("paused-mode", "playing-mode");
                this.animation(pathArrays.pauseToPlayPaths);
            },
            playToPause: function() {
                videoItSelf.pause();
                wtpPlayButton.setAttribute("data-title-no-tooltip", "재생");
                wtpPlayButton.setAttribute("title", "재생(k)");
                moviePlayer.classList.replace("playing-mode", "paused-mode");
                this.animation(pathArrays.playToPausePaths);
            },
        };
        function onPlayButtonClick() {
            if (videoItSelf.paused) {
                video_PP.pauseToPlay();
            } else {
                video_PP.playToPause();
            };
        };
        
        function showVolumePanel() {
            chromeBottom.classList.add("wtp-volume-slider-active");
            wtpVolumePanel.classList.add("wtp-volume-control-hover");
            IS_VOLUME_SLIDER_ACTIVE = true;
        };
        function hideVolumePanel() {
            if (IS_VOLUME_SLIDER_ACTIVE) {
                chromeBottom.classList.remove("wtp-volume-slider-active");
                wtpVolumePanel.classList.remove("wtp-volume-control-hover");
                IS_VOLUME_SLIDER_ACTIVE = false;
            };
        };
        //video_mute/unmute
        const video_MU = {
            animation: {
                /**
                 * when speaker gets mute step, the speaker expand
                 * animation must be done before change of svg structure
                 * @argument {Array} paths Arrangement of paths to show in animation
                 * @returns {Promise<speakerAnimation>}
                 */
                speaker: function(paths) {
                    return new Promise((resolve) => {
                        const speaker = wtpMuteButton.querySelector("#wtp-id-15");
                        if (speaker) {
                            let index = 0;
                            function animate() {
                                if (index < paths.length) {
                                    speaker.setAttribute("d", paths[index]);
                                    index++;
                                    requestAnimationFrame(animate);
                                } else {
                                    resolve();
                                };
                            };
                            requestAnimationFrame(animate);
                        };
                    });
                },
                /**
                 * when speaker gets unmute step, remove slash animation
                 * should be done before change of svg structure
                 */
                slash: {
                    /** @returns {Promise<speakerSlashAnimation>} */
                    add: function() {
                        return new Promise((resolve) => {
                            const slash = wtpMuteButton.querySelector("svg defs #wtp-svg-volume-animation-slash-mask path");
                            const shadow = wtpMuteButton.querySelector("svg defs #wtp-svg-volume-animation-mask .wtp-svg-volume-animation-mover");
                            const hider = wtpMuteButton.querySelector(".wtp-svg-fill.wtp-svg-volume-animation-hider");
                            let i = 0;
                            hider.removeAttribute("style");
                            function animate() {
                                if (i <= 20) {
                                    slash.setAttribute("transform", `translate(${i}, ${i})`);
                                    shadow.setAttribute("transform", `translate(${i}, ${i})`);
                                    i++;
                                    requestAnimationFrame(animate);
                                } else
                                    resolve();
                            };
                            requestAnimationFrame(animate);
                        });
                    },
                    /** @returns {Promise<speakerSlashAnimation>} */
                    remove: function() {
                        const slash = wtpMuteButton.querySelector("svg defs #wtp-svg-volume-animation-slash-mask path");
                        const shadow = wtpMuteButton.querySelector("svg defs #wtp-svg-volume-animation-mask .wtp-svg-volume-animation-mover");
                        const hider = wtpMuteButton.querySelector(".wtp-svg-fill.wtp-svg-volume-animation-hider");
                        let i = 19;
                        hider.removeAttribute("style");
                        function animate() {
                            if (i > 0) {
                                slash.setAttribute("transform", `translate(${i}, ${i})`);
                                shadow.setAttribute("transform", `translate(${i}, ${i})`);
                                i--;
                                requestAnimationFrame(animate);
                            } else {
                                hider.setAttribute("style", "display: none;")
                            };
                        };
                        requestAnimationFrame(animate);
                    },
                },
            },
            /** @argument {String} animationType "justSlash" or "expandAndSlash" */
            mute: async function(animationType) {
                let LS_wpv = JSON.parse(localStorage.getItem("wt-player-volume"));
                videoItSelf.muted = true;
                LS_wpv.data.muted = true;
                wtpVolumeSliderHandle.style.left = "0px";
                if (animationType === "justSlash")
                    await this.animation.slash.add();
                else if (animationType === "expandAndSlash") {
                    await Promise.all([
                        this.animation.slash.add(),
                        this.animation.speaker(pathArrays.speakerExpand)
                    ]);
                };
                wtpMuteButton.querySelector("svg").remove();
                const newSvg = glo_f.create("svg");
                const newUse = glo_f.create("use");
                const newPath = glo_f.create("path");
                glo_f.setAttr(newSvg, { "height": "100%", "version": "1.1", "viewBox": "0 0 36 36", "width": "100%" });
                glo_f.setAttr(newUse, { "class": "wtp-svg-shadow", "href": "#wtp-id-253" });
                glo_f.setAttr(newPath, {
                    "class": "wtp-svg-fill", "id": "#wtp-id-253",
                    "d": "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z"
                });
                newSvg.append(newUse, newPath);
                wtpMuteButton.append(newSvg);
                glo_f.setAttr(wtpMuteButton, "data-title-no-tooltip", "음소거 해제");
                glo_f.setAttr(wtpMuteButton, "title", "음소거 해제");
                glo_f.setAttr(wtpMuteButton, "aria-label", "음소거 해제 단축키 m");
                
                glo_f.setAttr(wtpVolumePanel, "aria-valuetext", `${Math.round(LS_wpv.data.volume * 100)}% 볼륨 음소거됨`);
                localStorage.setItem("wt-player-volume", JSON.stringify(LS_wpv));
            },
            unmute: async function() {
                let LS_wpv = JSON.parse(localStorage.getItem("wt-player-volume"));
                wtpVolumeSliderHandle.style.left = `${LS_wpv.data.sliderHandleLeft}px`
                videoItSelf.muted = false;
                LS_wpv.data.muted = false;
                await new Promise((resolve) => {
                    wtpMuteButton.querySelector("svg").remove();
                    const newSvg = glo_f.create("svg");
                    const firstUse = glo_f.create("use");
                    const secondUse = glo_f.create("use");
                    const defs = glo_f.create("defs");
                    const firstCP = glo_f.create("clipPath");
                    const firstPathInFirstCP = glo_f.create("path");
                    const secondPathInFirstCP = glo_f.create("path");
                    const thirdPathInFirstCP = glo_f.create("path");
                    const secondCP = glo_f.create("clipPath");
                    const pathInSecondCP = glo_f.create("path");
                    const firstPath = glo_f.create("path");
                    const secondPath = glo_f.create("path");
                    
                    glo_f.setAttr(newSvg, { "height": "100%", "version": "1.1", "viewBox": "0 0 36 36", "width": "100%" });
                    glo_f.setAttr(firstUse, { "class": "wtp-svg-shadow", "href": "#wtp-id-15" });
                    glo_f.setAttr(secondUse, { "class": "wtp-svg-shadow", "href": "#wtp-id-16" });
                    glo_f.setAttr(firstCP, "id", "wtp-svg-volume-animation-mask");
                    glo_f.setAttr(firstPathInFirstCP, "d", "m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z");
                    glo_f.setAttr(secondPathInFirstCP, "d", "M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z");
                    glo_f.setAttr(thirdPathInFirstCP, {
                        "class": "wtp-svg-volume-animation-mover",
                        "d": "M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z",
                        "transform": "translate(20, 20)"
                    });
                    firstCP.append(firstPathInFirstCP, secondPathInFirstCP, thirdPathInFirstCP);
                    glo_f.setAttr(secondCP, "id", "wtp-svg-volume-animation-slash-mask");
                    glo_f.setAttr(pathInSecondCP, {
                        "class": "wtp-svg-volume-animation-mover",
                        "d": "m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z",
                        "transform": "translate(20, 20)"
                    });
                    secondCP.append(pathInSecondCP);
                    defs.append(firstCP, secondCP);
                    glo_f.setAttr(firstPath, {
                        "class": "wtp-svg-fill wtp-svg-volume-animation-speaker",
                        "clip-path": "url(#wtp-svg-volume-animation-mask)",
                        "d": "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z",
                        "fill": "#fff",
                        "id": "wtp-id-15"
                    });
                    glo_f.setAttr(secondPath, {
                        "class": "wtp-svg-fill wtp-svg-volume-animation-hider",
                        "clip-path": "url(#wtp-svg-volume-animation-slash-mask)",
                        "d": "M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z",
                        "fill": "#fff",
                        "id": "wtp-id-16"
                    });
                    newSvg.append(firstUse, secondUse, defs, firstPath, secondPath);
                    wtpMuteButton.appendChild(newSvg);
                    resolve();
                });
                this.animation.slash.remove();
                glo_f.setAttr(wtpMuteButton, "data-title-no-tooltip", "음소거");
                glo_f.setAttr(wtpMuteButton, "title", "음소거");
                glo_f.setAttr(wtpMuteButton, "aria-label", "음소거 단축키 m");
                glo_f.setAttr(wtpVolumePanel, "aria-valuetext", `${wtpVolumePanel.getAttribute("aria-valuetext").replace(" 음소거됨", "")}`);
                localStorage.setItem("wt-player-volume", JSON.stringify(LS_wpv));
            },
        };
        function muteButtonToggle() {
            if (videoItSelf.muted)
                video_MU.unmute();
            else {
                video_MU.mute(
                    videoItSelf.volume < 0.5 ? "expandAndSlash" : "justSlash"
                );
            };
        };

        async function volumeAndButtonAnimationUpdate(mousePositionEvent) {
            const sliderRect = wtpVolumeSlider.getBoundingClientRect();
            const sliderHandleWidth = wtpVolumeSliderHandle.offsetWidth;
            const practicalSliderWidth = sliderRect.width - sliderHandleWidth;
            let mousePositionInSlider = Math.max(
                0,
                Math.min(
                    mousePositionEvent.clientX - sliderRect.left - (sliderHandleWidth / 2),
                    practicalSliderWidth
                )
            );
            let actualVolume = (mousePositionInSlider / practicalSliderWidth);
            let volumeInPercentage = Math.round((actualVolume) * 100);
            let IS_VOLUME_ZERO = (actualVolume === 0);
            let IS_VOLUME_UNDER_HALF = (actualVolume < 0.5);

            let wpv_obj = {
                data: {
                    volume: actualVolume,
                    sliderHandleLeft: mousePositionInSlider,
                    muted: false,
                }
            };
            //exclude the small gap between mute and audibility
            let VOLUME_THRESHOLD = 0.00999908447265625,
                SLIDER_HANDLE_LEFT_THRESHOLD = 0.39996337890625
            ;
            if (actualVolume <= VOLUME_THRESHOLD + Number.EPSILON || mousePositionInSlider <= SLIDER_HANDLE_LEFT_THRESHOLD + Number.EPSILON) {
                actualVolume = 0;
                volumeInPercentage = 0;
                mousePositionInSlider = 0;
            };

            if (IS_VOLUME_ZERO && !VOLUME_WAS_ZERO) {
                await video_MU.mute("expandAndSlash");
                wpv_obj.data.muted = true;

                VOLUME_WAS_ZERO = true;
                VOLUME_WAS_UNDER_HALF = false;
                VOLUME_WAS_OVER_HALF = false;
            } else if (IS_VOLUME_UNDER_HALF && !IS_VOLUME_ZERO && !VOLUME_WAS_UNDER_HALF) {
                if (!VOLUME_WAS_OVER_HALF || videoItSelf.muted)
                    await video_MU.unmute();
                wpv_obj.data.muted = false;
                video_MU.animation.speaker(pathArrays.speakerShrink);

                VOLUME_WAS_ZERO = false;
                VOLUME_WAS_UNDER_HALF = true;
                VOLUME_WAS_OVER_HALF = false;
            } else if ((VOLUME_WAS_ZERO || VOLUME_WAS_UNDER_HALF) && !IS_VOLUME_ZERO && !IS_VOLUME_UNDER_HALF) {
                video_MU.animation.speaker(pathArrays.speakerExpand);
                wpv_obj.data.muted = false;

                VOLUME_WAS_ZERO = false;
                VOLUME_WAS_UNDER_HALF = false;
                VOLUME_WAS_OVER_HALF = true;
            };
            
            wtpVolumeSliderHandle.style.left = `${mousePositionInSlider}px`;
            videoItSelf.volume = actualVolume;
            wtpVolumePanel.setAttribute("aria-valuenow", String(volumeInPercentage));
            wtpVolumePanel.setAttribute("aria-valuetext", `${volumeInPercentage}% 볼륨`);
            localStorage.setItem("wt-player-volume", JSON.stringify(wpv_obj));
        };
        function onVolumeSliderMousedown(event) {
            VOLUME_SLIDER_DRAGGING = true;
            event.preventDefault();
            volumeAndButtonAnimationUpdate(event);
        };

        function onAutonavButtonClick() {
            if (IS_AUTONAV_ACTIVE) {
                wtpAutonavButton.setAttribute("aria-checked", "false");
                IS_AUTONAV_ACTIVE = false;
            } else {
                wtpAutonavButton.setAttribute("aria-checked", "true");
                IS_AUTONAV_ACTIVE = true;
            };
        };
        function onSubtitleButtonClick() {
            if (IS_SUBTITLE_ACTIVE) {
                wtpSubtitleButton.setAttribute("aria-pressed", "false");
                IS_SUBTITLE_ACTIVE = false;
            } else {
                wtpSubtitleButton.setAttribute("aria-pressed", "true");
                IS_SUBTITLE_ACTIVE = true;
            };
        };
        //video_fullscreen
        const video_FS = {
            enterFull: function() {
                fullBleedContainer.appendChild(playerContainer);
                
                [wtpMiniplayerButton, wtpSizeButton]
                .forEach((element) => element.remove());
                
                wtdWatchFlexyHtmlTag.setAttribute("fullscreen", "");
                wtdWatchFlexyHtmlTag.setAttribute("full-bleed-container", "");
                moviePlayer.setAttribute("aria-label", "WeTube 동영상 플레이어 전체화면 모드");
                
                ["wtp-fullscreen", "wtp-big-mode", "wtp-large-width-mode"]
                .forEach((classes) => moviePlayer.classList.add(classes));
                
                moviePlayer.classList.remove("wtp-hide-info-bar");
                document.body.classList.add("no-scroll");
                
                window.removeEventListener("resize", onNoFullscreenResize);
                window.addEventListener("resize", onFullscreenResize);
                
                playerContainer.requestFullscreen();
                IS_FULL_SCREEN = true;
            },
            exitFull: function() {
                document.exitFullscreen();
                playerContainerInner.appendChild(playerContainer);
                
                wtpSettingsButton.insertAdjacentElement("afterend", wtpMiniplayerButton);
                wtpMiniplayerButton.insertAdjacentElement("afterend", wtpSizeButton);
                
                wtdWatchFlexyHtmlTag.removeAttribute("fullscreen");
                wtdWatchFlexyHtmlTag.removeAttribute("full-bleed-container");
                moviePlayer.setAttribute("aria-label", "WeTube 동영상 플레이어");
                
                ["wtp-fullscreen", "wtp-big-mode", "wtp-large-width-mode"]
                .forEach((classes) => moviePlayer.classList.remove(classes));
                
                moviePlayer.classList.add("wtp-hide-info-bar");
                document.body.classList.remove("no-scroll");
                
                window.removeEventListener("resize", onFullscreenResize);
                window.addEventListener("resize", onNoFullscreenResize);

                IS_FULL_SCREEN = false;
            },
        };
        function fullscreenButtonToggle() {
            if (IS_FULL_SCREEN)
                video_FS.exitFull();
            else
                video_FS.enterFull();
        };

        function onFullscreenChange() {
            if (document.fullscreenElement) {
                videoItSelf.style.height = `${window.innerHeight}px`;
                videoItSelf.style.width = `${window.innerWidth}px`;
                chromeBottom.style.width = `${window.innerWidth - 48}px`
                chromeBottom.style.left = "24px";
                chapterHoverContainer.style.width = `${window.innerWidth - 48}px`
            } else {
                videoItSelf.style.left = "0px";
                chromeBottom.style.left = "12px";
                chapterHoverContainer.style.width = `${window.innerWidth - 24}px`
            };
        }
        function onDocumentMousemove(event) {
            if (VOLUME_SLIDER_DRAGGING) {
                volumeAndButtonAnimationUpdate(event);
            };
            if (IS_PROGRESS_BAR_DRAGGING) {
                adjustVideoProgress(event);
            };
        };
        function onDocumentMouseup() {
            if (VOLUME_SLIDER_DRAGGING) {
                VOLUME_SLIDER_DRAGGING = false;
            } else if (IS_PROGRESS_BAR_DRAGGING) {
                IS_PROGRESS_BAR_DRAGGING = false;
                if (!WAS_VIDEO_PAUSE_BEFORE_ADJUST)
                    video_PP.pauseToPlay()
                else 
                    video_PP.playToPause()
            };
        };
        
        function onExpandButtonClick() {
            if (!IS_DESCRIPTION_EXPANDED) {
                descriptionInlineExpander.setAttribute("is-expanded", "");
                expandedUserInput.removeAttribute("hidden");
                snippetText.setAttribute("hidden", "");
                snippet.removeAttribute("style");
                [snippetGap, expandSizer, expandButton]
                    .forEach((element) => element.setAttribute("hidden", ""));
                [collapseButton, structuredDescription]
                    .forEach((element) => element.removeAttribute("hidden"));
                IS_DESCRIPTION_EXPANDED = true;
            };
        };
        function onCollapseButtonClick() {
            if (IS_DESCRIPTION_EXPANDED) {
                descriptionInlineExpander.removeAttribute("is-expanded");
                expandedUserInput.setAttribute("hidden", "");
                snippetText.removeAttribute("hidden");
                snippet.style.overflow = "hidden";
                snippet.style.maxHeight = "6rem";
                [snippetGap, expandSizer, expandButton]
                    .forEach((element) => element.removeAttribute("hidden"));
                [collapseButton, structuredDescription]
                    .forEach((element) => element.setAttribute("hidden", ""));
                IS_DESCRIPTION_EXPANDED = false;
            };
        };

        // WATCH VIDEO INITIAL ACTIONS //
        (function() {
            videoItSelf.addEventListener("canplay", () => {
                videoItSelf
                    .play()
                    .catch((error) => {
                        console.error(error);
                        wtpPlayButton.click();
                    });
                });

            const LS_wpv = JSON.parse(localStorage.getItem("wt-player-volume"));
            const speaker = wtpMuteButton.querySelector("#wtp-id-15");
            if (!LS_wpv) {
                wtpVolumeSliderHandle.style.left = "20px";
                videoItSelf.volume = 0.5;
            } else {
                if (LS_wpv.data.volume < 0.5 && LS_wpv.data.sliderHandleLeft < 20) {
                    speaker.setAttribute("d", "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z")
                } else if (LS_wpv.data.muted) {
                    video_MU.mute("justSlash");
                };
                wtpVolumeSliderHandle.style.left = `${LS_wpv.data.sliderHandleLeft}px`;
                videoItSelf.volume = LS_wpv.data.volume;
            };
            
            expandButton.style.left = `${expandSizer.offsetLeft}px`;
        })();
        
        videoItSelf.addEventListener("loadedmetadata", videoAndControllerSizeAdjust);
        videoItSelf.addEventListener("ended", onVideoEnded);
        window.addEventListener("resize", onNoFullscreenResize);
        
        videoItSelf.addEventListener("progress", onLoadProgress);
        videoItSelf.addEventListener("timeupdate", videoTimeUpdate);
        
        playerContainer.addEventListener("click", onPlayerContainerClick);
        playerContainer.addEventListener("mousemove", showChromeTopBottom);
        playerContainer.addEventListener("mouseleave", hideChromeTopBottom);

        chromeBottom.addEventListener("mousemove", () => IS_CURSOR_OVER_CONTROLLER = true);
        chromeBottom.addEventListener("mouseleave", () => IS_CURSOR_OVER_CONTROLLER = false);
        
        progressBar.addEventListener("mousemove", onMouseHoverProgressBar);
        progressBar.addEventListener("mouseleave", onMouseLeaveProgressBar);
        progressBar.addEventListener("mousedown", onProgressbarMousedown);
        
        wtpPlayButton.addEventListener("click", onPlayButtonClick);
        
        wtpMuteButton.addEventListener("mouseenter", showVolumePanel);
        wtpLeftControls.addEventListener("mouseleave", hideVolumePanel);
        wtpMuteButton.addEventListener("click", muteButtonToggle);
        
        wtpVolumeSlider.addEventListener("mousedown", onVolumeSliderMousedown);
        
        wtpAutonavButton.addEventListener("click", onAutonavButtonClick);
        wtpSubtitleButton.addEventListener("click", onSubtitleButtonClick);
        wtpFullscreenButton.addEventListener("click", fullscreenButtonToggle);
        
        document.addEventListener("fullscreenchange", onFullscreenChange);
        document.addEventListener("mousemove", onDocumentMousemove);
        document.addEventListener("mouseup", onDocumentMouseup);

        expandButton.addEventListener("click", onExpandButtonClick);
        collapse.addEventListener("click", onCollapseButtonClick);
    })();
});