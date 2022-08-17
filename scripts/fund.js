const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const sendValue = ethers.utils.parseEther("1")

    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding contract...")
    const txResponse = await fundMe.fund({ value: sendValue })
    const txReceipt = await txResponse.wait(1)
    console.log("Funded!")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
