// function deployFunc(hre) {
//     const { getNamedAccounts, deployments } = hre
// }

// module.exports.default = deployFunc

/******************** OR ************************/

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
// }

/******************** OR ************************/

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()
const { verify } = require("../utils/verify.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log("Chain ID: " + chainId)

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[4]["ethUsdPriceFeed"]
    }

    log("Deploying FundMe...")
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("Deployed FundMe!")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("--------------------------------------")
}

module.exports.tags = ["all", "fundme"]
