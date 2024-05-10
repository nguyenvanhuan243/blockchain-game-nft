# blockchain-game-nft
blockchain-game-nft
Node version: 18

```
function LoginMetaMask() {
    fconnectToMetamask().then((data) => {
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

```