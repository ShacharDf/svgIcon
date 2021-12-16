const fs = require('fs')

fs.readdir('../src/assets/svgs/', {
    withFileTypes: true
}, async (err, files) => {
    const svgFolders = files.filter((file) => file.isDirectory()).map((dir) => dir.name)
    const prms = svgFolders.map((folder) => {
        return new Promise((resolveFolder, rejectFolder) => {
            fs.readdir(`./svgs/${folder}`, async (err, svgNames) => {
                svgNames = svgNames.filter((file) => file.includes('.svg'))
                const filesPrms = svgNames.map((fileName) => {
                    return new Promise((resolve, reject) => {
                        fs.readFile(`./svgs/${folder}/${fileName}`, 'utf-8', (err, data) => {
                            resolve(data)
                        })
                    })
                })
                const files = await Promise.all(filesPrms)
                resolveFolder({
                    files,
                    svgNames: svgNames
                })
            })
        })
    })

    let folders = await Promise.all(prms)
    folders = folders.flat(1)
    const stream = fs.createWriteStream('./index.html');
    stream.once('open', function (fd) {
        const html = createHtml(folders, svgFolders)
        stream.end(html);
    });
})

function createHtml(foldersContent, foldersName) {
    const head = `<!DOCTYPE html>
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
    let body =
        `<body>
    <div class="main-container">
        <h1>32px Preview</h1>`
    body += foldersContent.map((svgContent, idx) => {
        let strHTML = `<h2>${foldersName[idx]}</h2>
        <section class="svgs-container">`
        strHTML += svgContent.files.map((svg, idx) => {
            return `<div class="svg-preview">
            <div class="svg-container">${svg}</div>
            <h4> ${svgContent.svgNames[idx].replace('.svg', '')} </h4>
            </div>`
        }).join('')
        strHTML += `</section>`
        return strHTML
    }).join('')
    body += `</div></body></html>`
    return head + body
}