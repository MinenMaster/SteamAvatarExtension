class DownloadManager {
    constructor() {
        this.setupMessageListener();
        this.initializeStorage();
    }

    async initializeStorage() {
        const result = await chrome.storage.local.get([
            "downloadCounter",
            "downloadFolder",
        ]);

        if (!result.downloadCounter) {
            await chrome.storage.local.set({
                downloadCounter: await this.getLastImageNumber(),
            });
        }

        if (!result.downloadFolder) {
            await chrome.storage.local.set({ downloadFolder: "SteamAvatar" });
        }
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener(
            (message, sender, sendResponse) => {
                if (message.action === "downloadImage") {
                    this.handleDownload(message.imageUrl, message.originalSrc);
                    sendResponse({ success: true });
                }
                return true;
            }
        );
    }

    async handleDownload(imageUrl, originalSrc) {
        try {
            const settings = await chrome.storage.local.get([
                "downloadCounter",
                "downloadFolder",
            ]);
            const counter =
                settings.downloadCounter || (await this.getLastImageNumber());
            const folder = settings.downloadFolder || "SteamAvatar";

            const nextNumber = counter + 1;
            const extension = this.getImageExtension(imageUrl);
            const filename = `${folder}/${nextNumber}.${extension}`;

            const downloadId = await chrome.downloads.download({
                url: imageUrl,
                filename: filename,
                saveAs: false,
            });

            await chrome.storage.local.set({ downloadCounter: nextNumber });

            console.log(`Downloaded: ${filename} (ID: ${downloadId})`);
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    getImageExtension(url) {
        const match = url.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i);
        return match ? match[1].toLowerCase() : "png";
    }

    async getLastImageNumber() {
        try {
            const downloads = await chrome.downloads.search({
                filenameRegex: "SteamAvatar/\\d+\\.(jpg|jpeg|png|gif|webp)$",
                limit: 100,
            });

            let maxNumber = 0;
            downloads.forEach((download) => {
                const match = download.filename.match(
                    /(\d+)\.(jpg|jpeg|png|gif|webp)$/i
                );
                if (match) {
                    const number = parseInt(match[1], 10);
                    if (number > maxNumber) {
                        maxNumber = number;
                    }
                }
            });

            return maxNumber;
        } catch (error) {
            console.error("Error getting last image number:", error);
            return 0;
        }
    }
}

new DownloadManager();
