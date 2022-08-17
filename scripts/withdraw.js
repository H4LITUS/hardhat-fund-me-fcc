const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const sendValue = ethers.utils.parseEther("1")

    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("Withdrawing funds...")
    const txResponse = await fundMe.withdraw()
    const txReceipt = await txResponse.wait(1)
    console.log("Withdrawn!")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
