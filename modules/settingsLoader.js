/**
 * load and validate settingsLoader file
 */
const path = require('path');
const DEFAULT_SETTINGS_PATH = './settings'; // relative to app root

console.log(process.argv);
const settingsPath = process.argv[2];
const settingsDir = path.join(global.appRoot, settingsPath || DEFAULT_SETTINGS_PATH);
if (!settingsPath) {
    console.log('No setting file declared. Application will use default settings');
}

const settings = require(settingsDir);

module.exports = settings;