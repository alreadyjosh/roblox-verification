const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function bloxlink(userid) {
    return new Promise(function(resolve, reject) {
        fetch(`https://api.blox.link/v1/user/${userid}`, {
            method: "GET"
        }).then(async (response) => {
            let json = await response.json()
            if(json.status === "error") return resolve("not_linked")
            resolve(json.primaryAccount)
        })
    });
}

async function getUsernameById(robloxId) {
    return new Promise(function(resolve, reject) {
        fetch(`https://users.roblox.com/v1/users/${robloxId}`, {
            method: "GET"
        }).then(async (response) => {
            let json = await response.json()
            resolve(json.name)
        })
    });
}

module.exports = { bloxlink, getUsernameById };