const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

exports.login = async (username, password) => {
    let users = JSON.parse(await readFile('./users.json'));

    if (!users[username]) { return }
    if (users[username].password !== password) { return }
    return {
        name: username,
        password: password
    };
}

const writeJSON = async (json) => {
    try {
        await writeFile('./users.json', json);
    } catch(err) {
        console.log(`An error occurred: ${err}`);
    }
}

const signup = async (username, password) => {
    const now = Date.now();
    let users = JSON.parse(await readFile('./users.json'));

    try {
        users[username] = {
            password: password
        };
        await writeJSON(JSON.stringify(users));
        const done = Date.now();
        console.log(`Done in ${(done - now)/1000} seconds`);
        console.log(`Usr: ${username}`);
        console.log(`Pwd: ${password}`);
    } catch(error) {
        console.error(`An error occurred: ${error}`);
    }
    return {
        name: username,
        password: password
    }
}

exports.signup = signup;