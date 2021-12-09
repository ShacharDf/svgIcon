const fs = require('fs')

fs.readdir('./svgs/', (err, svgFiles) => {
    svgFiles = svgFiles.filter((file) => {
        return file.includes('.svg')
    })

    const prms = svgFiles.map((fileName) => {
        return new Promise((resolve, reject) => {
            fs.readFile(`./svgs/${fileName}`, 'utf-8', (err, data) => {
                // console.log(data);
                resolve(data)
            })
        })
    })

    Promise.all(prms)
        .then((svgs) => {
            const stream = fs.createWriteStream('./index.html');
            stream.once('open', function (fd) {
                const html = createHtml(svgs, svgFiles)
                stream.end(html);
            });
        })
})

function createHtml(svgs, svgFiles) {
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
                margin:0;
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
        <h1>32px Preview</h1>
            <section class="svgs-container">`
    body += svgs.map((svg, idx) => {
        return `<div class="svg-preview">
                    <div class="svg-container">${svg}</div>
                    <h2> ${svgFiles[idx].replace('.svg', '')} </h2>
                </div>`
    }).join('')
    body += `
                <section>
            </div>
        </body>
    </html>`

    return head + body
}