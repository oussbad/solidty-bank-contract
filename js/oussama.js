import { fundingContractConfig } from "./config.js"
let web3;
let fundingContract;
const MyWall=document.getElementById("MyWall");

const main = async () => {
    if (window.ethereum == undefined)
        return alert("please install metamask or any other comptabile ethereum provider")

    console.log("metamask or other providers are installed")
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        let myAddress = await getMyAddress()
        myAddressEle.innerText = myAddress
       
        web3 = new Web3(window.ethereum)
        fundingContract = new web3.eth.Contract(fundingContractConfig.ABI, fundingContractConfig.address)

        web3.eth.getBalance(myAddress).then(data => {
            MyWall.innerText = parseFloat(data) / (10 ** 18) + " ETH"
        }).catch(e => console.log(e))


        await loadInfo()

    }
    catch (e) {
        alert(e.message)
    }


}

btnConnect.addEventListener("click", async () => {
    await main()

})

const loadInfo = async () => {
    //Configuration
    
    fundingContract.methods.min().call()
        .then(data => {
            console.log(typeof (data))
            MinDepot.innerText = parseFloat(data) / (10 ** 18) + " ETH"
        }).catch(e => console.log(e))

        fundingContract.methods.Users(await getMyAddress()).call()
        .then(data => {
            console.log(typeof (data))
            YourDepot.innerText = parseFloat(data) / (10 ** 18) + " ETH"
        }).catch(e => console.log(e))





    
    //liste donations
    
}

btnDepo.addEventListener("click", async () => {
    //showLoading()
    fundingContract.methods.depot().send({
        from: await getMyAddress(),
        to: fundingContractConfig.address,
        value: amountInput.value
    }).then(async receipt => {

        console.log(receipt)
        amountInput.value = ""
        await loadInfo()
    })
        .catch(e => {
            console.log(e)
        })
        .finally(() => hideLoading())


})

btnRe.addEventListener("click", async () => {
    //showLoading()
    fundingContract.methods.retrait().send({
        from: await getMyAddress(),
        to: fundingContractConfig.address,
        value: amountInput.value
    }).then(async receipt => {

        console.log(receipt)
        amountInput.value = ""
        await loadInfo()
    })
        .catch(e => {
            console.log(e)
        })
        .finally(() => hideLoading())


})




const getMyAddress = async () => {
    return (await window.ethereum.request({ method: "eth_accounts" }))[0]
}

const hideLoading = () => {
    loading.classList.add("hidden")
}
const showLoading = () => {
    loading.classList.remove("hidden")
}