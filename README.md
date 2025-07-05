# SteamAvatar Downloader Extension

Browser extension for downloading Steam avatars from steamavatar.io with automatic numbering

## Features

-   **One-click downloads**: Hover over any avatar image and click the download button
-   **Auto-numbering**: Incremental naming (1.png, 2.png, 3.png, etc.)

## Installation

1. **Chrome/Edge**: Go to `chrome://extensions/`, enable "Developer mode", click "Load unpacked", select extension folder
2. **Firefox**: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", select `manifest.json`

## Usage

1. Navigate to steamavatar.io
2. Hover over any avatar image to see the download button
3. Click "📥" to save the image
4. Images are saved to Downloads/SteamAvatar/ with incremental numbering

**Extension Popup**: Click the extension icon to view stats, change folder name, or reset counter.

## How It Works

-   **Content Script**: Adds download buttons to images on steamavatar.io
-   **Background Worker**: Handles downloads and manages incremental counter
-   **Storage**: Remembers settings and counters using Chrome storage API

## Troubleshooting

-   **Downloads not working**: Check extension permissions, verify you're on steamavatar.io, refresh page
-   **Counter not incrementing**: Reset counter in popup or check download permissions
-   **Buttons not appearing**: Refresh page, check console for errors

## Development

1. Make changes to source files
2. Reload extension in `chrome://extensions/`
3. Refresh steamavatar.io tabs
4. Test functionality

## License

Educational purposes only. Please respect steamavatar.io's terms of service.
