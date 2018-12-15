const fs = require("fs"),
    path = require("path"),
    { spawn } = require('child_process'),
    os = require("os");
let bin = ``;
let pdftotxt = "pdftotext.exe",
    pdftops = "pdftops.exe",

    pdftoppm = "pdftoppm.exe",
    pdftopng = "pdftopng.exe",
    pdftohtml = "pdftohtml.exe";

if(os.arch()=="x64" || os.arch()=="x32"){
    bin = path.resolve(`${__dirname}/bin/bin${os.arch().charAt(1)}${os.arch().charAt(2)}`)
    pdftotxt = path.join(bin, pdftotxt);
    pdftops = path.join(bin, pdftops);
    pdftoppm = path.join(bin, pdftoppm);
    pdftopng = path.join(bin, pdftopng);
    pdftohtml = path.join(bin, pdftohtml);
}else{
    throw "Sorry, xpdf uses exe files and compatible with windows x32 and x64 bits."
}

class XPDF  {
    constructor(options){
        this.in = options[0],
        this.out = options[1]
    }
    resolve(callback){
        fs.access(path.resolve(this.in), fs.F_OK, (err) => {
            if (err) { throw "Path not found!" }
            else if(path.extname(path.resolve(this.in)) != ".pdf"){ throw "File is not a property of .pdf extension!" }
            else{ this.in = path.resolve(this.in); this.out = typeof(this.out) == "boolean"? this.out = this.out: path.resolve(this.out); callback() }     
        })
    }
    convert(callback){
        this.resolve(()=>{
            let run = (exe,callback) => {
                let cmd = "";
                if(path.extname(path.resolve(this.out)) == ".json"){
                    cmd = spawn(exe, [this.in, '-']);
                    cmd.stdout.on('data', (data) => { 
                        let temp = data.toString().split('\r\n'), output = [];
                        for (let i = 0; i <= temp.length - 1; i++) {
                            if(temp[i]){ output.push(temp[i]) }
                            if(i == temp.length - 1){ fs.writeFile(this.out, JSON.stringify(output, null, 2), function(err, data){ if (err) throw err }) }
                        }
                     });
                }else{ cmd = spawn(exe, [this.in, this.out]) }
                cmd.stderr.on('data', (data) => { throw data });
                cmd.on('exit', () => { callback() });
            }
            switch (path.extname(path.resolve(this.out))) {
                case ".txt": run(pdftotxt,()=>{callback()}); break;
                case ".json": run(pdftotxt,()=>{callback()}); break;
                case ".html": run(pdftohtml,()=>{callback()}); break;
                case ".ops": run(pdftops,()=>{callback()}); break;
                case ".ppm": run(pdftoppm,()=>{callback()}); break;
                case ".png": run(pdftopng,()=>{callback()}); break;
                default: callback('Please make sure your output file extension is one of the .txt .html .ops .ppm .png .json!'); break;
            }
        })
    }
    extract(callback){
        this.resolve(()=>{
            let cmd = spawn(pdftotxt, [this.in, '-']);
            cmd.stdout.on('data', (data) => { 
                if(this.out){
                    let temp = data.toString().split('\r\n'), output = [];
                    for (let i = 0; i <= temp.length - 1; i++) {
                        if(temp[i]){ output.push(temp[i]) }
                        if(i == temp.length - 1){ callback(output) }
                    }
                }else{ callback(data.toString()) }
                
            });
            cmd.stderr.on('data', (data) => { throw data });
        })
    }
}

module.exports = {
    convert: (options, callback) => {
        let xpdf = new XPDF(options);   
        xpdf.convert((cb)=>{
            callback(cb)
        })
    },
    extract: (options, callback) => {
        let xpdf = new XPDF(options);   
        xpdf.extract((cb)=>{
            callback(cb)
        })
    }
 }