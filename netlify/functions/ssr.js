// netlify/functions/server.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.handler = async (event, context) => {
    const currentDir = path.resolve(__dirname);

    const levelsUp = 2; // Change this number to go up more levels

    // Get parent directories
    const parentDirs = getParentDirectories(currentDir, levelsUp);

    // Log each parent directory
    console.log(`Parent directories up to ${levelsUp} levels:`);
    parentDirs.forEach((dir, index) => {
        console.log(`Level ${index + 1}: ${dir}`);
        const files = fs.readdirSync(dir);
        console.log('Files under __dirname:');
        files.forEach(file => {
            console.log(file);
        });

    });
    const serverPath = path.resolve(__dirname, '../../dist/server.js');

    // Spawn the node process to run the server.js in the background
    const child = spawn('node', [serverPath], {
        stdio: 'inherit',
        detached: true,
    });

    child.unref();

    return {
        statusCode: 200,
        body: 'Server is running!',
    };
};

function getParentDirectories(dir, levels = 1) {
    const parentDirs = [];
    let current = dir;

    for (let i = 0; i < levels; i++) {
        current = path.dirname(current);
        parentDirs.push(current);
    }

    return parentDirs;
}
