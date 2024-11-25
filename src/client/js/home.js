import "../scss/components/home.scss";

document.addEventListener("DOMContentLoaded", () => {
    const wtdFeedFilterChipBarRenderer = document.querySelector(".wtd-feed-filter-chip-bar-renderer-html-tag.wtd-rich-grid-renderer");
    const wtdAppDiv = document.querySelector(".wtd-app-html-tag")
    const clientWidth = document.body.clientWidth;
    let appDrawerWidth = 240;
    wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - 240}px`);
    wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-top", `56px`);
    const wtdAppAttributeObserver = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
                appDrawerWidth = (wtdAppDiv.getAttribute("guide-persistent-and-visible") === "") ? 240 : 72;
                wtdFeedFilterChipBarRenderer.style.setProperty("--wtd-rich-grid-chips-bar-width", `${clientWidth - appDrawerWidth}px`);
            };
        };
    });
    wtdAppAttributeObserver.observe(wtdAppDiv, { attributes: true });
});
document.addEventListener("DOMContentLoaded", () => {
    const elementsPerRowIs = document.querySelector(".wtd-rich-grid-renderer-html-tag.wtd-two-column-browse-results-renderer").getAttribute("elements-per-row");
    const homeContentItems = document.querySelectorAll("#contents.wtd-rich-grid-renderer .wtd-rich-item-renderer-html-tag.wtd-rich-grid-renderer");
    if (elementsPerRowIs === "3") {
        homeContentItems.forEach((item, index) => {
            if ((index + 1) % 3 === 1) item.setAttribute("is-in-first-column", "");
        });
    };
});



/*

'use strict'
const timeInArray = videoInfo.meta.videoLength.split(":");
const timeDigit = timeInArray.length;
let ariaLabelDuration = "";
if (timeDigit === 2) ariaLabelDuration = `${timeInArray[0]}분 ${timeInArray[1]}초`
else if (timeDigit === 3) ariaLabelDuration = `${timeInArray[0]}시간 ${timeInArray[1]}분 ${timeInArray[2]}초`

const n=new Date(),ud=videoInfo.meta.createdAt.split("_")[0],ut=videoInfo.meta.createdAt.split("_")[1],cm=n.getTime(),um=new Date(`${ud}T${ut}`).getTime(),ct=()=>{const dis=Math.floor((cm-um)/1e3);if(dis<0)return "FUTURE_VIDEO_ERROR";const yd=Math.floor(dis/31536000),mod=Math.floor(dis/2629800),wd=Math.floor(dis/604800),dd=Math.floor(dis/86400),hd=Math.floor(dis/3600),md=Math.floor(dis/60);return yd>0?`${yd}년 전`:mod>0?`${mod}달 전`:wd>0?`${wd}주 전`:dd>0?`${dd}일 전`:hd>0?`${hd}시간 전`:md>0?`${md}분 전`:`${dis}초 전`;},ago=ct();

each videoInfo in DBVIDEO
        +videoItSelf(videoInfo)
    else
        span NO_VIDEO_EXIST
*/