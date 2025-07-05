const fs = require("fs");
const path = require("path");

function validateExtension() {
    console.log("Validating Steam Avatar Downloader extension...\n");

    const requiredFiles = [
        "manifest.json",
        "content.js",
        "content.css",
        "background.js",
        "popup.html",
        "popup.js",
    ];

    let allValid = true;

    console.log("Checking required files:");
    requiredFiles.forEach((file) => {
        const filePath = path.join(__dirname, "..", file);
        if (fs.existsSync(filePath)) {
            console.log(`✅ ${file}`);
        } else {
            console.log(`❌ ${file} - MISSING`);
            allValid = false;
        }
    });

    console.log("\nValidating manifest.json:");
    try {
        const manifestPath = path.join(__dirname, "..", "manifest.json");
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

        if (manifest.manifest_version === 3) {
            console.log("✅ Manifest V3 format");
        } else {
            console.log("❌ Invalid manifest version");
            allValid = false;
        }

        if (manifest.permissions && manifest.permissions.length > 0) {
            console.log("✅ Permissions defined");
        } else {
            console.log("❌ No permissions defined");
            allValid = false;
        }

        if (manifest.content_scripts && manifest.content_scripts.length > 0) {
            console.log("✅ Content scripts defined");
        } else {
            console.log("❌ No content scripts defined");
            allValid = false;
        }
    } catch (error) {
        console.log("❌ Invalid manifest.json format");
        allValid = false;
    }

    const iconsPath = path.join(__dirname, "..", "icons");
    if (fs.existsSync(iconsPath)) {
        console.log("✅ Icons directory exists");
    } else {
        console.log("⚠️  Icons directory missing (recommended)");
    }

    console.log("\n" + "=".repeat(50));
    if (allValid) {
        console.log("🎉 Extension validation passed!");
        console.log("\nNext steps:");
        console.log(
            "1. Load the extension in Chrome/Edge at chrome://extensions/"
        );
        console.log('2. Enable Developer mode and click "Load unpacked"');
        console.log("3. Test on steamavatar.io");
    } else {
        console.log("❌ Extension validation failed!");
        console.log("Please fix the issues above before using the extension.");
    }
}

if (require.main === module) {
    validateExtension();
}
