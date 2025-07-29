// ==UserScript==
// @name         TeaBag - Threads Filter
// @namespace    https://www.threads.com
// @version      1.0
// @description  Filter out unwanted content on threads: hide verified users with optional whitelist, block users without blocking them by just filtering all their posts, filter specific words or phrases
// @author       artificialsweetener.ai, https://artificialsweetener.ai
// @match        https://www.threads.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    // Set to 1 if you want to know how many posts that have been filtered. It will be a big number after just a little scrolling!
    const ENABLE_FILTER_COUNT = 0;
    // If you want to hide checkmarks even in situations where verified users are visible to you - like on profiles or if they're whitelisted - keep this at 1. 0 will bring back the checkmarks for whitelisted verified users.
    const ENABLE_HIDE_CHECKMARKS = 1;
    // You can set this to 0 and filter verified posts even on profile pages. You might want this so you don't see reposts of verified users BUT if you ever visit a verified user's profile the script will just recursively eat all their posts which is... slow and pointless.
    const ENABLE_NO_FILTER_ON_PROFILES = 1;

    // --- Whitelist, Blacklist, & Text Filter ---
    // List of Threads usernames - the part after the @. These are verified users you don't want to be filtered. They will appear without their checkmark.
    const whitelist = new Set(['goodperson1', 'goodperson2'].map(u => u.toLowerCase()));
    // List of Threads usernames - the part after the @. These are users you don't want to see, even ones that are not verified. They will be filtered just like verified users are.
    const blacklist = new Set(['badperson1', 'badperson2'].map(u => u.toLowerCase()));
    // List of words or phrases you want the filter to take out of the feed. These will be matched verbatim but not case sensitive.
    const textFilterList = new Set(['giveaway'].map(t => t.toLowerCase()));

    // --- Script State ---
    let filteredCount = 0;
    let normalUserPostCount = 0;
    let verifiedUserPostCount = 0;
    let counterDisplay = null;
    let lastUrl = location.href;
    let debounceTimer;

    // --- Core Functions ---

    /**
     * Calculates the Greatest Common Divisor of two numbers for ratio simplification.
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    function injectGlobalCSS() {
        const css = `
            /*
             * This single rule sets the cursor for the entire post container back to the default.
             * This makes the post text easily selectable and removes the "click hand" from the header.
             * Links inside the post (like the timestamp and username) will still have their natural pointer cursor.
             */
            div[data-pressable-container="true"] {
                cursor: default !important;
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);
    }

    function updateCounterDisplay() {
        if (!ENABLE_FILTER_COUNT) return;
        if (!counterDisplay) {
            counterDisplay = document.createElement('div');
            Object.assign(counterDisplay.style, {
                position: 'fixed', top: '10px', right: '10px', backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white', padding: '5px 10px', borderRadius: '5px', zIndex: '1000',
                fontSize: '14px', fontFamily: 'sans-serif'
            });
            document.body.appendChild(counterDisplay);
        }
        const isOnProfilePage = location.pathname.startsWith('/@');
        if (ENABLE_NO_FILTER_ON_PROFILES && isOnProfilePage) {
            counterDisplay.innerText = `[Filter paused on profiles]`;
        } else {
            let ratioText = '0:0';
            // Calculate the simplified ratio of Normal:Verified posts
            if (normalUserPostCount > 0 || verifiedUserPostCount > 0) {
                const divisor = gcd(normalUserPostCount, verifiedUserPostCount);
                const simplifiedNormal = normalUserPostCount / divisor;
                const simplifiedVerified = verifiedUserPostCount / divisor;
                ratioText = `${simplifiedNormal}:${simplifiedVerified}`;
            }
            counterDisplay.innerText = `[Filtered: ${filteredCount} | Ratio: ${ratioText}]`;
        }
    }

    function processPost(post) {
        post.dataset.filtered = 'true';
        const userLink = post.querySelector('a[href^="/@"]');
        if (!userLink) return;

        const username = userLink.getAttribute('href').substring(2).toLowerCase();
        const verifiedBadge = post.querySelector('svg[aria-label="Verified"]');
        const isOnProfilePage = ENABLE_NO_FILTER_ON_PROFILES && location.pathname.startsWith('/@');

        // Increment counts for every post processed, regardless of other conditions.
        if (verifiedBadge) {
            verifiedUserPostCount++;
        } else {
            normalUserPostCount++;
        }

        if (isOnProfilePage) {
            if (verifiedBadge && ENABLE_HIDE_CHECKMARKS) verifiedBadge.style.display = 'none';
            return;
        }

        if (blacklist.has(username)) {
            post.style.display = 'none';
            filteredCount++;
            return;
        }

        const postText = post.innerText.toLowerCase();
        for (const filterText of textFilterList) {
            if (postText.includes(filterText)) {
                post.style.display = 'none';
                filteredCount++;
                return;
            }
        }

        if (whitelist.has(username)) {
            if (verifiedBadge && ENABLE_HIDE_CHECKMARKS) verifiedBadge.style.display = 'none';
            return;
        }

        if (verifiedBadge) {
            post.style.display = 'none';
            filteredCount++;
        }
    }

    function runFilter() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (!location.pathname.startsWith('/@')) {
                filteredCount = 0;
                normalUserPostCount = 0;
                verifiedUserPostCount = 0;
            }
        }

        const postSelector = 'div.x1ypdohk.x1n2onr6.xwag103';
        document.querySelectorAll(`${postSelector}:not([data-filtered])`).forEach(processPost);
        updateCounterDisplay();
    }

    const debouncedRunFilter = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runFilter, 150);
    };

    window.addEventListener('DOMContentLoaded', () => {
        injectGlobalCSS();
        const observer = new MutationObserver(debouncedRunFilter);
        observer.observe(document.body, { childList: true, subtree: true });
        runFilter();
    });

})();
