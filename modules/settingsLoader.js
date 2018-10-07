/**
 * load and validate settingsLoader file
 */
const path = require('path');
const DEFAULT_SETTINGS_PATH = './sample'; // relative to app root
const SETTINGS_FILE_NAME = 'settings';

const settingsPath = process.argv[2];
const settingsDir = path.join(global.appRoot, settingsPath || DEFAULT_SETTINGS_PATH);
const settingFile = path.join(settingsDir, SETTINGS_FILE_NAME);
if (!settingsPath) {
    console.log('No setting file declared. Application will use default settings');
}

const settings = require(settingFile);
settings.settingsDir = settingsDir;

// Mandatory paths
['staticPath', 'viewsPath', 'partialsPath', 'dbPath', 'fileUploadPath'].forEach((pathString) => {
    if (!settings[pathString]) {
        console.error(`${pathString} must be declared`);
    } else {
        settings[pathString] = constructDir(settings[pathString]);
        console.log(`${pathString}: ${settings[pathString]}`);
    }
});

function constructDir(pathString) {
    const dir = path.join(settingsDir, pathString);
    // todo check dir exists
    return dir;
}

module.exports = settings;