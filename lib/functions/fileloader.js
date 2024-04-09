const { glob } = require('glob'); const path = require('path');

/**
 * @param {String} file
 * @returns 
 * 
 */
function deleteCache(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) { delete require.cache[filePath]; }
}

/**
 * @param {String} folderName 
 * @returns 
 * 
 */
async function loadFiles(folderName) {
    const files = await glob(path.join(process.cwd(), folderName, '**/*.js').replace(/\\/g, '/'));
    await Promise.all(files.map(file => deleteCache(file)));
    return files;
}

module.exports = { loadFiles }