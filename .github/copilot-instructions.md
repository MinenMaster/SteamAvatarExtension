<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Steam Avatar Downloader Extension

This is a browser extension project for downloading Steam avatars from steamavatar.io with automatic numbering and folder organization.

## Project Context

-   **Project Type**: Browser Extension (Chrome/Firefox compatible)
-   **Target Website**: steamavatar.io
-   **Primary Function**: Download avatar images with incremental numbering
-   **Tech Stack**: Vanilla JavaScript, Manifest V3, Chrome Extension APIs

## Key Features to Maintain

1. **Auto-numbering**: Always increment from the last downloaded image number
2. **Folder organization**: Save to a configurable subfolder in Downloads
3. **One-click downloads**: Overlay download buttons on avatar images
4. **Settings management**: Popup interface for configuration
5. **Cross-browser compatibility**: Chrome and Firefox support

## Code Guidelines

-   Use modern JavaScript (ES6+) features
-   Follow Chrome Extension Manifest V3 standards
-   Ensure proper error handling for downloads and storage
-   Maintain responsive UI in popup interface
-   Use CSS that doesn't conflict with host website styles

## API Usage

-   Chrome Storage API for settings persistence
-   Chrome Downloads API for file management
-   Content Scripts for DOM manipulation
-   Background Service Worker for download coordination

## File Naming Convention

-   Downloaded files: `{counter}.{extension}` (e.g., 1.png, 2.png, 3.png)
-   Folder structure: `Downloads/{configurable_folder_name}/`
-   Counter should always continue from the last number found

## Testing Considerations

-   Test on various steamavatar.io page layouts
-   Verify download counter persistence across browser sessions
-   Check cross-browser compatibility
-   Ensure proper permission handling
