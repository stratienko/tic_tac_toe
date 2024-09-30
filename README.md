# Tic Tac Toe

## Requirements

In order to run the game you will need to install:

1. [Node.js](https://nodejs.org/en/download/package-manager)
2. NVM for [MacOS/Linux](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows)
3. [PNPM](https://pnpm.io/installation)
4. [Git](https://git-scm.com/downloads)

## Clone the repo

Run the following command:

`git clone https://github.com/stratienko/tic_tac_toe.git`

## Server Setup

1. Go to the `server` folder (`cd ./server`)
2. Create the `.env` file in the `server` directory and assign the `PORT=` variable. (`3000` by default)
3. Run `nvm install && nvm use` to make sure your Node.js version is correct
4. Run `pnpm install` to install dependencies
5. Run `pnpm start` to run the server or `pnpm dev` to run it in the watch mode

## Client Setup

1. Go to the `server` folder (`cd ./client`)
2. Creat the `.env` file in the `client` directory and assign the `VITE_API_URL=` variable. (`http://localhost:3000` by default)
3. Run `nvm install && nvm use` to make sure your Node.js version is correct
4. Run `pnpm install` to install dependencies
5. Run `pnpm build` to build the project
6. Run `pnpm start`
