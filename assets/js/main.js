'use strict';

let isIP = (ipaddress) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
}

let ipvalue, iplength, sendButton, binaryIP;

//values
let pIP, pMask, pNetwork, pBroadcast, pFirst, pLast, pNb

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

let getMasque = (length) => {
    let s = "";
    for (let i = 0; i < 32; i++) {
        if (i != 0 && i != "0" && i != 32 && i != "32" && i % 8 == 0) {
            s += "."
        }
        if (i >= length) {
            s += "0"
        } else {
            s += "1"
        }
    }
    return binaryToIP(s)
}

let getNetwork = (ipBIN, length) => {
    let iv = (Math.floor(length / 8));
    let s = ipBIN.substring(0, parseInt(length) + parseInt(iv));
    console.log(s);
    for (let i = parseInt(length) + parseInt(iv) + 1; i < 32; i++) {
        console.log(" i : " + i);
        if (i != 0 && i != "0" && i != 32 && i != "32" && i % 8 == 0) {
            console.log("add . at " + i);
            s += "."
        }
        console.log("add 0 at " + i);
        s += "0"
    }
    console.log(s);
    return binaryToIP(s)
}

let getBroadcast = (ip, length) => {
    let s = ip.substring(0, length + 2);
    for (let i = 32; i >= length; i--) {
        s += "1"
    }
    console.log("resobin : " + s);
    return binaryToIP(s)
}

let getF = (ip, length) => {
    let s = ip.substring(0, length);
    for (let i = 32; i > length; i--) {
        s += "0"
    }
    s += "1"
    console.log("first : " + s);
    return binaryToIP(s)
}
let getL = (ip, length) => {
    let s = ip.substring(0, length);
    for (let i = 32; i > length; i--) {
        s += "1"
    }
    s += 0
    console.log("last : " + s);
    return binaryToIP(s)
}
let getNb = (length) => {
    return Math.pow((32 - length), 2) - 2;
}


window.onload = () => {
    ipvalue = document.getElementById("ip");
    iplength = document.getElementById("length");
    sendButton = document.getElementById("sendBtn");

    pIP = document.getElementById("Aip")
    pMask = document.getElementById("mask")
    pNetwork = document.getElementById("network")
    pBroadcast = document.getElementById("broadcast")
    pFirst = document.getElementById("first")
    pLast = document.getElementById("last")
    pNb = document.getElementById("nbmachines")

    sendButton.addEventListener("click", () => {
        if (isIP(ipvalue.value)) {
            let binaryIP = ipToBinary(ipvalue.value)
            pIP.innerHTML = `Adresse : ${ipvalue.value}/${iplength.value}`;
            pMask.innerHTML = `Masque : ${getMasque(iplength.value)}`;
            pNetwork.innerHTML = `Network : ${getNetwork(binaryIP, iplength.value)}`;
            /*pBroadcast.innerHTML = `Broadcast : ${getBroadcast(ip.value, length)}`;
            pFirst.innerHTML = `First : ${getF(ip.value, length)}`;
            pLast.innerHTML = `Last : ${getL(ip.value, length)}`;
            pNb.innerHTML = `Nb de machines : ${getNb(length)}`;*/
        }
    })
}