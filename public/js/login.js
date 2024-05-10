const web3 = new Web3(window.ethereum);
var currentAccount = null;

$(document).ready(function () {
    check_Metamask();
    deleteAllCookies();
});

function LoginMetaMask() {
    connectToMetamask().then((data) => {
        currentAccount = data[0];
        web3.eth.net.getId().then((net) => {
            if (net != 97) {
                alert("Please connect BSC Mainnet");
                window.location = "./";
            } else {
                var randS = "SecretNumber:" + RandomString(24);
                web3.eth.personal.sign(randS, currentAccount, (err, sign) => {
                    setCookie("RAND", randS, 1);
                    setCookie("HASH", sign, 1);
                    //window.location="./game";
                    $.post("./verifyAccount", { hashString: getCookie("HASH"), randS: getCookie("RAND") }, function (data) {
                        if (data.result != "1") {
                            alert("Wrong authentication!");
                            window.location = "./";
                        } else {
                            currentAccount = data.account;
                            $("#btn_connect_MM").fadeOut(500);
                            $(".txt").html("..." + data.account.slice(-10));
                        }
                    });
                });
            }
        });

    });
}

var getETH = function (address) {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address).then((data) => {
            resolve(parseFloat(web3.utils.fromWei(data, "ether")).toFixed(4));
        });
    });
}

window.ethereum.on("accountsChanged", function (accounts) {
    window.location = "./";
});

async function connectToMetamask() {
    const accounts = ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function check_Metamask() {
    if (typeof window.ethereum !== 'undefined') {
        $("#btn_connect_MM").show();
        $("#installMM").hide();
        $("#btn_connect_MM").fadeOut(0, function () {
            $("#btn_connect_MM").fadeIn(3000);
        });
    } else {
        $("#btn_connect_MM").hide();
        $("#installMM").show();
    }
}

function RandomString(dai) {

    var mang = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "y", "u", "v", "x", "y", "z", "w",
        "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "Q", "R", "S", "Y", "U", "V", "X", "Y", "Z", "W",
        "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    //[i, l, I, L, o, 0, O]

    var kq = "";
    for (var i = 0; i < dai; i++) {
        kq = kq + mang[Math.floor(Math.random() * mang.length)]
    }

    return kq;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}