# svg--sprite-generator
## _svg sprite maker, and Vuejs svg cmp_

svg--sprite-generator is a 3-part proj.

- Vue2 cmp to display and manipulate svgs
- Gulp file that creates svg sprite from folder
- Node script that create HTML file with folder name and svgs

## How to use

To run the gulp file that creates the sprites

```sh
npm run gulp
```

To run the Node script and create the html page that shows the svgs and folders

```sh
cd '.\svg vanila\'
node 'index.js'
```

#### svg-cmp

Vue2 component for displaying svg
props:
- icon: { type: String, required: true }
- classList: { type: String, default: "" }
- title: { type: String }
- size: { default:{ width: 64, height: 64 }}
- fileName: { type: String, required: true, default: "svgs" }
- viewBox: { type: String, default: "0 0 32 32" }
 

Read the sprites from "src/assets/imgs/sprite/"
