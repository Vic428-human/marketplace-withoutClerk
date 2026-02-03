# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast) 通知訊息
- [react-redux](https://react-redux.js.org/introduction/getting-started) 它本身不負責建立或管理 store，只是讓 React 能「連接」Redux
- [@reduxjs/toolkit](https://redux-toolkit.js.org/introduction/getting-started) 傳統 Redux 需要自己寫 createStore、middleware、reducers 合併等樣板程式碼，Toolkit 幫你包好，它是「建立和管理 Redux store」的工具，讓 Redux 更好上手。


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
