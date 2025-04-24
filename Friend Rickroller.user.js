// ==UserScript==
// @name         Friend Rickroller (12-Hour Timer)
// @namespace    This is a rickroll!
// @version      0.5
// @description  Rickroll once every 12 hours for debugging
// @icon         https://raw.githubusercontent.com/githubkorean/Friend-Rickroller/refs/heads/main/icon.png
// @author       Rick Astley
// @match        *://*/*
// @supportURL   https://github.com/githubkorean/Friend-Rickroller
// @homepageURL  https://github.com/githubkorean/Friend-Rickroller
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    const targetUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const now = Date.now();
    const twelveHours = 12 * 60 * 60 * 1000; // 12시간을 밀리초로 계산

    let clicked = GM_getValue('clicked', 0);
    const lastRollTime = GM_getValue('lastRollTime', 0);

    // 12시간이 지났으면 카운트 초기화
    if (now - lastRollTime > twelveHours) {
        clicked = 0;
        GM_setValue('clicked', 0);
        GM_setValue('lastRollTime', 0);
    }

    // 페이지 로드시 한 번만 링크 바꿈 (이미지 X)
    if (clicked === 0) {
        document.querySelectorAll('a[href]').forEach(a => {
            a.href = targetUrl;
            a.target = '_blank';
        });
    }

    // 클릭 이벤트 전체 가로채기
    document.addEventListener('click', e => {
        if (clicked === 0) {
            e.preventDefault();
            e.stopImmediatePropagation();

            GM_setValue('clicked', 1);
            GM_setValue('lastRollTime', Date.now());

            window.open(targetUrl, '_blank');
            location.reload();
        }
    }, true); // 캡처 단계에서 가로채기

})();
