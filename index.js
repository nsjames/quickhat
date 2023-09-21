#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
let destinationPath = path.join(process.cwd());
let inquirer;
let manager;

const askForPath = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'answer',
            message: 'Where do you want to install hardhat?',
            default: destinationPath,
        },
    ]).then(x => path.resolve(x.answer));
}
const askWithList = async (question, choices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: question,
            choices: choices,
        },
    ]).then(x => x.answer);
}

const formatPath = (_path) => {
    return path.join(destinationPath, _path);
}
const createAndCopy = (folder) => {
    fs.mkdirSync(formatPath(folder), { recursive: true });
    fs.cpSync(`./copy/${folder}`, formatPath(folder), { recursive: true });
}

const main = async () => {
    inquirer = (await import ('inquirer')).default;

    destinationPath = await askForPath();
    if(!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }
    console.log(`Installing hardhat in ${destinationPath}`);

    manager = await askWithList('What package manager do you use?', ['npm', 'yarn', 'pnpm']);

    console.log(`Installing dependencies with ${manager}`);
    fs.writeFileSync(formatPath('./package.json'), JSON.stringify({
            "name": "hardhat-project",
            "version": "1.0.0",
            "description": "",
            "scripts": {
                "test": "npx hardhat test",
                "compile": "npx hardhat compile",
                "deploy": "npx hardhat run scripts/deploy.ts"
            },
            "author": "",
            "devDependencies": {
                "@nomicfoundation/hardhat-chai-matchers": "^1.0.0",
                "@nomicfoundation/hardhat-network-helpers": "^1.0.0",
                "@nomicfoundation/hardhat-toolbox": "^2.0.0",
                "@nomiclabs/hardhat-ethers": "^2.0.0",
                "@nomiclabs/hardhat-etherscan": "^3.0.0",
                "@typechain/ethers-v5": "^10.1.0",
                "@typechain/hardhat": "^6.1.2",
                "@types/chai": "^4.2.0",
                "@types/mocha": ">=9.1.0",
                "hardhat": "^2.14.0",
                "ts-node": "^10.9.1",
                "typescript": "^5.2.2",
                "chai": "^4.2.0",
                "hardhat-gas-reporter": "^1.0.8",
                "solidity-coverage": "^0.8.1",
                "typechain": "^8.1.0",
                "dotenv": "^16.3.1",
            }
        }, null, 2
    ));

    // install packages
    execSync(`${manager} install`, {
        cwd: destinationPath,
        stdio: 'inherit',
    });

    // copy hardhat.config.ts
    fs.writeFileSync(formatPath('./hardhat.config.ts'), fs.readFileSync('./copy/hardhat.config.ts', 'utf8'));
    fs.writeFileSync(formatPath('./tsconfig.json'), fs.readFileSync('./copy/tsconfig.json', 'utf8'));
    fs.writeFileSync(formatPath('./.env'), fs.readFileSync('./copy/.env', 'utf8'));
    createAndCopy('contracts');
    createAndCopy('scripts');
    createAndCopy('test');
}

main();
