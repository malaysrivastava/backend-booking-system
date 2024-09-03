// netlify/functions/server.js
const { spawn } = require('child_process');
const path = require('path');

exports.handler = async (event, context) => {
    console.log(__dirname);
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
