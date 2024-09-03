// netlify/functions/server.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.handler = async (event, context) => {
    const currentDir = path.resolve(__dirname);

    // Reading the directory contents
    const files = fs.readdirSync(currentDir);

    // Logging the directory path and files
    console.log('Current directory:', currentDir);
    console.log('Files under __dirname:');
    files.forEach(file => {
        console.log(file);
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
