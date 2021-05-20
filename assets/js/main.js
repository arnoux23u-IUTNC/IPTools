'use strict';

let isIP = (ipaddress) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
}

let ipvalue, iplength, sendButton;

let decompose = (ip, length) => {
    if (isNaN(length) || typeof length === undefined || length === null) {
        length = 24;
    }

}

let ipToBinary = (input) => {
    const fields = input.split('.');
    const f1 = ("00000000" + parseInt(fields[0]).toString(2)).slice(-8);
    const f2 = ("00000000" + parseInt(fields[1]).toString(2)).slice(-8);
    const f3 = ("00000000" + parseInt(fields[2]).toString(2)).slice(-8);
    const f4 = ("00000000" + parseInt(fields[3]).toString(2)).slice(-8);
    return f1 + "." + f2 + "." + f3 + "." + f4;
}

let binaryToIP = (input) => {
    const fields = input.split('.');
    const f1 = parseInt(fields[0], 2)
    const f2 = parseInt(fields[1], 2)
    const f3 = parseInt(fields[2], 2)
    const f4 = parseInt(fields[3], 2)
    return f1 + "." + f2 + "." + f3 + "." + f4;
}

window.onload = () => {
    ipvalue = document.getElementById("ip");
    iplength = document.getElementById("length");
    sendButton = document.getElementById("sendBtn");
    sendButton.addEventListener("click", () => {
        if (isIP(ipvalue.value)) {
            console.log("ip : "+ipvalue.value)
            const bin = ipToBinary(ipvalue.value)
            console.log("bin : "+bin)
            console.log(binaryToIP(bin))
        } else {
            console.log("incorrect ip")
        }
    })
}