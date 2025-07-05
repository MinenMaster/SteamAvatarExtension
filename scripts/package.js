const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

function createZip() {
    const distDir = path.join(__dirname, "..", "dist");
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const outputPath = path.join(distDir, "steam-avatar-downloader.zip");
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
        zlib: { level: 9 },
    });

    output.on("close", function () {
        console.log(`Extension packaged: ${archive.pointer()} total bytes`);
        console.log(`Package created: dist/steam-avatar-downloader.zip`);
    });

    archive.on("error", function (err) {
        throw err;
    });

    archive.pipe(output);

    const filesToInclude = [
        "manifest.json",
        "content.js",
        "content.css",
        "background.js",
        "popup.html",
        "popup.js",
        "icons/",
    ];

    filesToInclude.forEach((file) => {
        const filePath = path.join(__dirname, "..", file);
        if (fs.existsSync(filePath)) {
            if (fs.statSync(filePath).isDirectory()) {
                archive.directory(filePath, file);
            } else {
                archive.file(filePath, { name: file });
            }
        }
    });

    archive.finalize();
}

if (require.main === module) {
    createZip();
}
