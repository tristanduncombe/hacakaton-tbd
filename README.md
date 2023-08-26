# Polocrosse Draw Generator

Insert Text Here

## Major technologies

- [React.js 18](https://reactjs.org/)
- [Electron 19](https://www.electronjs.org/)
- [MUI 5](https://mui.com/) (formerly Material-UI)
- [Webpack 5](https://webpack.js.org/)
- Typescript, ESLint, and Prettier are used to improve the developer experience

## Requires

- [Node.js 16.x](https://nodejs.org/en/)
- [NPM >= 7.x](https://github.com/npm/cli)

## Recommended tools

- [Visual Studio Code](https://code.visualstudio.com/)
  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (formatting)
  - [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (error checking)
- [NVM](https://github.com/nvm-sh/nvm) (mac only. helps to manage multiple node.js versions on your machine)

## Getting Started

1. Download this repo or run the following command to clone it

```sh
git clone https://github.com/hellosoftware-io/electron-typescript-react-material-ui myapp
```

2. Navigate to the project root

```sh
cd myapp
```

3. Using NPM 7+, run the following command to install dependencies

```sh
npm install
```

4. Run the following command to build and start the development version of your app with live reloading.

```sh
npm run dev
```

## Packaging

Run `npm run package` to build and package your electron app.

## Common issues

### xcrun: error: invalid active developer path

This is caused when elecron-builder tries to sign a build. Run `xcode-select --install` to install the necessary Xcode tools.