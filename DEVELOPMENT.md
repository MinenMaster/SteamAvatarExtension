# Development Guide

## Quick Start

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Validate extension**:

    ```bash
    npm run validate
    ```

3. **Load in browser**:
    - Chrome/Edge: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked"
    - Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on"

## Development Workflow

### Making Changes

1. **Edit files** (content.js, background.js, popup.js, etc.)
2. **Reload extension** in browser extensions page
3. **Refresh steamavatar.io tabs** to test content script changes
4. **Test functionality** by downloading avatars

### Testing

-   **Content Script**: Test on various steamavatar.io pages
-   **Download Functionality**: Verify files are saved with correct numbering
-   **Settings**: Test popup settings persistence
-   **Counter Logic**: Verify counter continues from last download

### Key Files

-   `manifest.json` - Extension configuration and permissions
-   `content.js` - Adds download buttons to steamavatar.io pages
-   `background.js` - Handles downloads and storage management
-   `popup.html/js` - Extension popup interface and settings

### Browser APIs Used

-   **Chrome Storage API**: Settings and counter persistence
-   **Chrome Downloads API**: File downloads and naming
-   **Content Scripts**: DOM manipulation on target website
-   **Chrome Runtime API**: Message passing between scripts

### Common Issues

1. **Downloads not working**: Check permissions in manifest.json
2. **Buttons not appearing**: Check content script injection
3. **Counter not persisting**: Check storage permissions
4. **Cross-origin issues**: Verify host_permissions in manifest

## Packaging for Distribution

```bash
npm run package
```

This creates `steam-avatar-downloader.zip` ready for browser extension stores.

## Browser Compatibility

-   **Chrome**: Full support (Manifest V3)
-   **Edge**: Full support (Chromium-based)
-   **Firefox**: Compatible (with minor API differences)

## Security Considerations

-   Only requests permissions needed for core functionality
-   No external API calls or data collection
-   Local storage only for settings and counters
-   Content script isolated to steamavatar.io domain
