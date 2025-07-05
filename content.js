class SteamAvatarDownloader {
    constructor() {
        this.initDownloadButtons();
        this.setupObserver();
    }

    initDownloadButtons() {
        this.addDownloadButtons();
    }

    addDownloadButtons() {
        const avatarImages = document.querySelectorAll(
            '.imgWrap img, img[src^="/img/"], img[alt*="avatar"], img[src*="steamavatar"]'
        );

        avatarImages.forEach((img, index) => {
            if (img.classList.contains("download-button-added")) return;

            if (this.isValidAvatarImage(img)) {
                const downloadOverlay = this.createDownloadOverlay(img);
                this.insertDownloadOverlay(img, downloadOverlay);
                img.classList.add("download-button-added");
            }
        });
    }

    createDownloadOverlay(img) {
        const overlay = document.createElement("div");
        overlay.className = "steam-avatar-download-overlay";
        overlay.innerHTML = "📥";
        overlay.title = "Click to download this avatar";

        overlay.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.downloadImage(img);
        });

        return overlay;
    }

    insertDownloadOverlay(img, overlay) {
        const imgWrap = img.closest(".imgWrap");

        if (imgWrap) {
            imgWrap.style.position = "relative";
            imgWrap.appendChild(overlay);
        } else {
            const wrapper = document.createElement("div");
            wrapper.className = "steam-avatar-wrapper";
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";

            img.parentNode.insertBefore(wrapper, img);

            wrapper.appendChild(img);
            wrapper.appendChild(overlay);
        }
    }

    async downloadImage(img) {
        try {
            const imageUrl = this.getFullImageUrl(img.src);

            chrome.runtime.sendMessage({
                action: "downloadImage",
                imageUrl: imageUrl,
                originalSrc: img.src,
            });

            this.showDownloadFeedback(img);
        } catch (error) {
            console.error("Error downloading image:", error);
            this.showErrorFeedback(img);
        }
    }

    getFullImageUrl(src) {
        if (src.startsWith("/")) {
            return "https://steamavatar.io" + src;
        }
        return src;
    }

    showDownloadFeedback(img) {
        const container = img.closest(".imgWrap") || img.parentElement;
        const feedback = document.createElement("div");
        feedback.className = "download-feedback success";
        feedback.textContent = "✅ Downloaded!";
        container.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    showErrorFeedback(img) {
        const container = img.closest(".imgWrap") || img.parentElement;
        const feedback = document.createElement("div");
        feedback.className = "download-feedback error";
        feedback.textContent = "❌ Error!";
        container.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    isValidAvatarImage(img) {
        if (!img.src || img.src === "") return false;

        const parentDiv = img.closest(".imgWrap");
        const hasImgPath = img.src.includes("/img/");

        const rect = img.getBoundingClientRect();
        const isReasonableSize = rect.width >= 50 && rect.height >= 50;

        return (parentDiv || hasImgPath) && isReasonableSize;
    }

    setupObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const newImages = node.querySelectorAll
                                ? node.querySelectorAll(
                                      '.imgWrap img, img[src^="/img/"], img[alt*="avatar"], img[src*="steamavatar"]'
                                  )
                                : [];

                            if (newImages.length > 0) {
                                setTimeout(
                                    () => this.addDownloadButtons(),
                                    100
                                );
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        new SteamAvatarDownloader();
    });
} else {
    new SteamAvatarDownloader();
}
