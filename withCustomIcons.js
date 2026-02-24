const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    const elements = fs.readdirSync(from);
    for (const element of elements) {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isFile()) {
            if (element.endsWith('.png')) {
                const webpPath = path.join(to, element.replace('.png', '.webp'));
                if (fs.existsSync(webpPath)) {
                    fs.unlinkSync(webpPath);
                }
            }
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    }
}

const withCustomIcons = (config) => {
    return withDangerousMod(config, [
        'android',
        async (config) => {
            const resPath = path.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res');
            const customIconsPath = path.join(config.modRequest.projectRoot, 'custom-icons');

            // Directories to copy
            const dirsToCopy = [
                'drawable',
                'mipmap-anydpi-v26',
                'mipmap-hdpi',
                'mipmap-mdpi',
                'mipmap-xhdpi',
                'mipmap-xxhdpi',
                'mipmap-xxxhdpi'
            ];

            for (const dir of dirsToCopy) {
                const src = path.join(customIconsPath, dir);
                const dest = path.join(resPath, dir);
                if (fs.existsSync(src)) {
                    copyFolderSync(src, dest);
                }
            }

            return config;
        },
    ]);
};

module.exports = withCustomIcons;
