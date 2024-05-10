const Web3 = require('web3');
const urlRPC=""; // your url rpc blockchain network
const web3 = new Web3(urlRPC);

module.exports = function(app){

    app.get("/", function(req, res){
        res.render("login");
    });

    app.post("/verifyAccount", function(req, res){
        if(!req.body.hashString || !req.body.randS ){
            res.json({result:0, message:"Lack of parameters"});
        }else{
            let key = web3.eth.accounts.recover(req.body.randS,req.body.hashString);
            res.json({result:1, account:key});
        }
    });

};