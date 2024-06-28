const { glob } = require('glob'); const path = require('path');

/**
 * @param {String} file
 */
function deleteCache(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) { delete require.cache[filePath]; }
}

/**
 * @param {String} folderName
 */
async function loadFiles(folderName) {
    const files = await glob(path.join(process.cwd(), folderName, '**/*.js').replace(/\\/g, '/'));
    await Promise.all(files.map(deleteCache));
    return files;
}

module.exports = { loadFiles }
