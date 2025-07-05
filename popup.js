class PopupManager {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
    }

    initializeElements() {
        this.elements = {
            status: document.getElementById("status"),
            downloadCounter: document.getElementById("downloadCounter"),
            folderName: document.getElementById("folderName"),
            saveSettings: document.getElementById("saveSettings"),
            resetCounter: document.getElementById("resetCounter"),
            setCounter: document.getElementById("setCounter"),
            setCounterValue: document.getElementById("setCounterValue"),
        };
    }

    async loadSettings() {
        try {
            const settings = await chrome.storage.local.get([
                "downloadCounter",
                "downloadFolder",
            ]);

            this.elements.folderName.value =
                settings.downloadFolder || "SteamAvatar";
            this.elements.downloadCounter.textContent =
                settings.downloadCounter || 0;
        } catch (error) {
            console.error("Error loading settings:", error);
            this.showStatus("Error loading settings", "warning");
        }
    }

    setupEventListeners() {
        this.elements.saveSettings.addEventListener("click", () => {
            this.saveSettings();
        });

        this.elements.resetCounter.addEventListener("click", () => {
            this.resetCounter();
        });

        this.elements.setCounter.addEventListener("click", () => {
            this.setCounter();
        });

        this.elements.folderName.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.saveSettings();
            }
        });

        this.elements.setCounterValue.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.setCounter();
            }
        });
    }

    async saveSettings() {
        try {
            const folderName =
                this.elements.folderName.value.trim() || "SteamAvatar";

            await chrome.storage.local.set({
                downloadFolder: folderName,
            });

            this.showStatus("Settings saved successfully!", "success");
        } catch (error) {
            console.error("Error saving settings:", error);
            this.showStatus("Error saving settings", "warning");
        }
    }

    async resetCounter() {
        try {
            await chrome.storage.local.set({ downloadCounter: 0 });
            this.elements.downloadCounter.textContent = "0";
            this.showStatus("Counter reset to 0", "success");
        } catch (error) {
            console.error("Error resetting counter:", error);
            this.showStatus("Error resetting counter", "warning");
        }
    }

    async setCounter() {
        try {
            const value = parseInt(this.elements.setCounterValue.value, 10);

            if (isNaN(value) || value < 0) {
                this.showStatus("Please enter a valid number", "warning");
                return;
            }

            await chrome.storage.local.set({ downloadCounter: value });
            this.elements.downloadCounter.textContent = value.toString();
            this.elements.setCounterValue.value = "";
            this.showStatus(`Counter set to ${value}`, "success");
        } catch (error) {
            console.error("Error setting counter:", error);
            this.showStatus("Error setting counter", "warning");
        }
    }

    showStatus(message, type = "success") {
        this.elements.status.textContent = message;
        this.elements.status.className = `status ${type}`;
        this.elements.status.style.display = "block";

        setTimeout(() => {
            this.elements.status.style.display = "none";
        }, 3000);
    }

    async checkCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            if (tab.url && tab.url.includes("steamavatar.io")) {
                this.showStatus("Ready to download avatars!", "success");
            } else {
                this.showStatus(
                    "Navigate to steamavatar.io to download avatars",
                    "warning"
                );
            }
        } catch (error) {
            console.error("Error checking current tab:", error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new PopupManager();
});
