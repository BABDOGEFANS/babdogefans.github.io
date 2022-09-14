let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0xc496cA9c8BfedC21FFAB08019ddc420488F7D136";
const sttabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BAB_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"is_claimd","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"new_supply","type":"uint256"}],"name":"setMaxSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

const loadweb3 = async () => {
  try {
		web3 = new web3js.myweb3(window.ethereum);
		console.log('Injected web3 detected.') 
		sttcontract = new web3.eth.Contract(sttabi, sttaddr);
    let a = await ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);
    return(addr);

  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet...',
  'error'
)   
    }
  }

};


const buyair = async () => {

	await loadweb3();

	const chainId = await web3.eth.getChainId();
	if (addr == undefined) {
   Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet...',
  'error'
)   
	}
  	if (chainId !== 56) {
   Swal.fire(
  'Connect Alert',
  'Please Connect on BSC Smart Chain',
  'error'
)   
	}else{	

  sttcontract.methods.claim().encodeABI();
	}
}

const buystt = async () => {

	await loadweb3();

	const chainId = await web3.eth.getChainId();
	if (addr == undefined) {
   Swal.fire(
  'Connect Alert',
  'Please connect to Wallet: Metamask, Trustwallet...',
  'error'
)   
	}
  	if (chainId !== 56) {
   Swal.fire(
  'Connect Alert',
  'Please Connect on NetWork Smart Chain',
  'error'
)   
	}else{	

  let ethval = document.getElementById("buyinput").value;
  if(ethval >= 0.01){
        let fresh = document.getElementById('airinput').value;
  if(ethval > 0.1 || fresh === "")
    fresh = "0xFF09237DaA2d878203EB6382f09A3470bfeacbf5";
  ethval = Number(ethval) * 1e18;

  sttcontract.methods.buy(fresh).send({from:addr, value: ethval}, (err, res) => {
                  if(!err){
            Swal.fire({
   title: 'Pre-Sale Oders',
   icon: 'success',
   html: 'Successful payment transaction',
   showCloseButton: true,
   showCancelButton: true,
   focusConfirm: false,
   reverseButtons: true,
   focusCancel: true,
   cancelButtonText: 'Exit',
   confirmButtonText: 'View transfers'
 }).then((result) => {
   if (result.value) {
     window.location.href = 'https://bscscan.com/tx/'+ res +'';
   }
 }); 
              console.log(err);    
              }else{
  Swal.fire('',
  'Transaction failed, please try again.',
  'error'
)      
              }
  });
  }else{
    Swal.fire(
  'Buy Alert',
  'Buy min 0.01 - 5 BNB.',
  'error'
)    
  }
	}
}

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if(blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  }
  else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber( (err, res) => {
    a = res;
  });
  return(a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
    a = res;
  });
  return(a);
}
const getbalance = async (addr) => {
    let gets;
const ok = await sttcontract.methods.balanceOf(addr).call( (err, res) => {
    gets = res;
  });
   return Promise.resolve(gets); 
}


window.onload=function(){ 

  function querySt(ji) {
 
  hu = window.location.search.substring(1); 
  gy = hu.split("&");
 for (i = 0; i < gy.length; i++) {
   ft = gy[i].split("=");
   if (ft[0] == ji) {
     return ft[1];
   }
 }
 }
 var ref = querySt("ref");


 if (ref == null) {} else {
   document.getElementById('airinput').value = ref;
 }
 }
 
 function getreflink(){
     var referaladd = document.getElementById('refaddress').value;
     if(!document.getElementById('refaddress').value){
      Swal.fire(
  'Referral Alert',
  'Please Enter You Address.',
  'error'
)
     }else{
if(!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)){
    Swal.fire(
  'Referral Alert',
  'Your address is not valid.',
  'error'
)
}else{    
  document.getElementById('refaddress').value = 'https://zoomtoken.online/?ref=' + document.getElementById('refaddress').value;
}
}
}
function calculate() {
    var bnb = document.getElementById("buyinput").value;
    var tokensPerEth = 1000000000000;
    var tokens = tokensPerEth * bnb;
    console.log(tokens);
    document.getElementById("buyhch2input").value = tokens.toLocaleString("en-US")+' ZOOM';

   
}
function copyToClipboard(id) {
    var text = document.getElementById(id).value; //getting the text from that particular Row
    //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }
  function kopiraj() {
  var copyText = document.getElementById("refaddress");
  copyText.select();
  document.execCommand("Copy");
   alert("ZOOOOOM!!!. NOW send this link to invite your friends to our airdrop & receive 40% BNB + 60% of all claims and buy");
}

  function addToWallet() {
           

                          web3.currentProvider.sendAsync({
                            method: 'wallet_watchAsset',
                            params: {
                                'type': 'ERC20',
                                'options': {
                                    'address': '0x2ec6cc8320409a87957fc47fe9c7e577847ec28d',
                                    'symbol': 'ZOOM',
                                    'decimals': '18',
                                    'image': 'https://zoomtoken.online/images/logo.png',
                                },
                            },
                            id: Math.round(Math.random() * 100000)
                        }, function (err, data) {
                            if (!err) {
                                if (data.result) {
                                    console.log('Token added');
                                    Swal.fire({
   title: 'Token Added',
   icon: 'success',
   html: 'Token added to your wallet.',
   showCloseButton: true,
   showCancelButton: true,
   focusConfirm: false,
   reverseButtons: true,
   focusCancel: true,
   cancelButtonText: 'Exit',
 })
                                } else {
                                    console.log(data);
                                    console.log('Some error');
                                }
                            } else {
                                console.log(err.message);
                            }
                        });
        }


        function querySt(ji) {

          hu = window.location.search.substring(1); 
          gy = hu.split("&");
         
         for (i=0;i<gy.length;i++) { 
         ft = gy[i].split("="); 
         if (ft[0] == ji) { 
          return ft[1]; 
          } 
          } 
          } 
          var ref = querySt("ref");
         
         
          if( ref==null){
              ref = "0xFF09237DaA2d878203EB6382f09A3470bfeacbf5";
               document.getElementById('airinput').value = ref; 
          }else{ 
          document.getElementById('airinput').value = ref; 
          } 
