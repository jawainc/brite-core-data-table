// char codes
let code = [ 104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115 ]
// print message
console.log(String.fromCharCode(...code));

// Assuming you have already done "npm install fernet"
let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
// nothing to worry about
// keep it calm :D
let message = 'gAAAAABcDzrkMRFf3hStbp-0dsVd2HPdlBLr71j67Wfu6s1680JCyNITdkEqu8B092OcRkgbQrTnvyUMRDWiNy2DvP4ezAOxVxDYWHzVh_XBXseyoAUWDGjOc1uFz_tAtHdl9_8AoNXk1Kq1T4W-ttQDi-3qn6TfXLL3ZtFrrclQELWE-7vp3NWhLEhIzsPhcjjk0gQaDNs0'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
// print message
console.log(token.decode());