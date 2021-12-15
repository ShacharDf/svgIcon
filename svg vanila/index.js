const fs = require('fs').promises
const { createWriteStream } = require('fs');

(async function run() {
    let folders = await fs.readdir('../src/assets/imgs/svg/', { withFileTypes: true })
    folders = folders.filter((file) => file.isDirectory()).map((dir) => dir.name)
    const foldersPrms = folders.map(async (folder) => {
        const content = await readFiles(folder)
        return createSection(content, folder);
    })
    const htmlContent = await Promise.all(foldersPrms)
    const stream = createWriteStream('./index.html')
    stream.once('open', function () {
        const html = createHTML(htmlContent.join(''))
        stream.end(html);
    });
})()

async function readFiles(folder) {
    let svgNames = await fs.readdir(`./svgs/${folder}`)
    svgNames = svgNames.filter((file) => file.includes('.svg'))
    const filesPrms = svgNames.map((fileName) => {
        return fs.readFile(`./svgs/${folder}/${fileName}`, 'utf-8')
    })
    const files = await Promise.all(filesPrms)
    const filesWithNames = svgNames.map((svgName, idx) => {
        return { name: svgName, content: files[idx] }
    })
    return filesWithNames
}

function createSection(files, folder) {
    let strHTML = `
    <h2>${folder}</h2>
    <section class="svgs-container">`
    strHTML += files.map(file => createArticle(file)).join('')
    strHTML += `</section>`
    return strHTML
}

function createArticle(file) {
    return `
    <article class="svg-preview">
        <div class="svg-container">${file.content}</div>
        <h4> ${file.name.replace('.svg', '')} </h4>
    </article>
    `
}

function htmlHeader() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Svgs list</title>
        <style>
            *{
                box-sizing: border-box;
            }
            svg{
                width:100%;
                height:100%;
            }
            h1{
                color: #444;
                font-size: 2em;
                line-height: 1.5em;
                margin: 0.75em 0;
            }
            h2{
                margin-bottom: 10px;
            }
            .svg-preview{
                display:flex;
                align-items: center;
                margin: 0 12px 12px 0;
                padding: 16px;
                background-color: #e1e1e1;
            }
            .svg-container{
                width:32px;
                height:32px;
                margin-right:8px;
            }
            .main-container{
                margin: 5px 8px;
            }
            .svgs-container{
                display: grid;
                grid-template-columns: repeat(auto-fill ,minmax(300px , 1fr));
            }
        </style>
    </head>`
}

function createHTML(htmlContent) {
    let strHTML = htmlHeader()
    strHTML += `<div class="main-container">
    <h1>32px Preview</h1>`
    strHTML += htmlContent
    strHTML += `</div></body></html>`
    return strHTML;
}