require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-solhint")
require("dotenv").config()
require("hardhat-deploy")
// require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://nothing"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xsecretKey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "ethKey"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "COINSSS"

module.exports = {
    // solidity: "0.8.9",
    solidity: {
        compilers: [
            { version: "0.8.9" },
            // {version: "0.6.6"}, // in order to work with multiple solidity versions
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            chainID: 4,
            accounts: [PRIVATE_KEY],
            blockConfirmations: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainID: 31337,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            // 4: 1, // account[1] on rinkeby(chaidId:4)
        },
        user: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
