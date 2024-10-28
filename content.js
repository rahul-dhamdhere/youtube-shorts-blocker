// Function to block YouTube Shorts
function blockYouTubeShorts() {
    // Remove existing Shorts
    function removeShorts() {
        // Remove Shorts from home page
        const shortsItems = document.querySelectorAll('ytd-rich-item-renderer');
        shortsItems.forEach(item => {
            if (item.querySelector('a[href^="/shorts"]')) {
                item.remove();
            }
        });

        // Remove Shorts button from sidebar
        const shortsTab = document.querySelector('ytd-guide-entry-renderer a[title="Shorts"]');
        if (shortsTab) {
            shortsTab.closest('ytd-guide-entry-renderer').remove();
        }

        // Redirect if on a Shorts page
        if (window.location.pathname.startsWith('/shorts')) {
            window.location.href = 'https://www.youtube.com';
        }
    }

    // Create and observe DOM changes
    const observer = new MutationObserver(() => {
        removeShorts();
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial removal
    removeShorts();
}

// Run when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', blockYouTubeShorts);
} else {
    blockYouTubeShorts();
}
chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled !== false) {
        blockYouTubeShorts();
    }
});