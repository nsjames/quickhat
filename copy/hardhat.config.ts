import dotenv from 'dotenv';
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accounts = (process.env.PRIVATE_KEY || '').split(',');

const config: HardhatUserConfig = {
    solidity: "0.8.18",

    networks: {
        eosevm: {
            url: process.env.EOSEVM_URL ?? "https://api.evm.eosnetwork.com",
            accounts,
        },
        eosevm_testnet: {
            url: process.env.EOSEVM_TESTNET_URL ?? "https://api.testnet.evm.eosnetwork.com",
            accounts,
        },
        ethereum: {
            url: process.env.ETHEREUM_URL ?? '',
            accounts,
        },
        goerli: {
            url: process.env.GOERLI_URL ?? '',
            accounts,
        },
        matic: {
            url: process.env.POLYGON_URL ?? '',
            gasPrice: 2e11,
            accounts,
        },
        mumbai: {
            url: process.env.MUMBAI_URL ?? '',
            accounts,
        },
        bsc: {
            url: process.env.BSC_URL ?? '',
            accounts,
        },
        'bsc-testnet': {
            url: process.env.BSC_TESTNET_URL ?? '',
            accounts,
        },
        avalanche: {
            url: process.env.AVALANCHE_URL ?? '',
            accounts,
        },
        'avalanche-fuji': {
            url: process.env.AVALANCHE_FUJI_URL ?? '',
            accounts,
        },
        arbitrum: {
            url: process.env.ARBITRUM_URL ?? '',
            accounts,
        },
        'arbitrum-goerli': {
            url: process.env.ARBITRUM_GOERLI_URL ?? '',
            accounts,
        },
        optimism: {
            url: process.env.OPTIMISM_URL ?? '',
            accounts,
        },
        'optimism-goerli': {
            url: process.env.OPTIMISM_GOERLI_URL ?? '',
            accounts,
        },
        fantom: {
            url: process.env.FANTOM_URL ?? '',
            accounts,
        },
        'fantom-testnet': {
            url: process.env.FANTOM_TESTNET_URL ?? '',
            accounts,
        },
        zkEVM: {
            url: process.env.ZKEVM_URL ?? '',
            accounts,
        },
        'zkEVM-testnet': {
            url: process.env.ZKEVM_TESTNET_URL ?? '',
            accounts,
        },
        zkSync: {
            url: process.env.ZKSYNC_URL ?? '',
            accounts,
        },
        'zkSync-testnet': {
            url: process.env.ZKSYNC_TESTNET_URL ?? '',
            accounts,
        },
    }
};

export default config;
