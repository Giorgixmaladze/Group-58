const os = require('os')


const local = {
    type:os.type(),
    architecture:os.arch(),
    networkInterfaces: os.networkInterfaces(),
    homeDir:os.homedir(),
    hostName:os.hostname(),
    uptime:os.uptime()
}

console.log(local)