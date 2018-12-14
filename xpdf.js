const fs = require("fs"),
    path = require("path"),
    { spawn } = require('child_process'),
    os = require("os");
let xpdf_bin = ``;
let pdftotxt = "pdftotext.exe",
    pdftops = "pdftops.exe",
    pdftoppm = "pdftoppm.exe",
    pdftopng = "pdftopng.exe",
    pdftohtml = "pdftohtml.exe";

let setPaths = (callback) => {
    pdftotxt = path.join(xpdf_bin, pdftotxt);
    pdftops = path.join(xpdf_bin, pdftops);
    pdftoppm = path.join(xpdf_bin, pdftoppm);
    pdftopng = path.join(xpdf_bin, pdftopng);
    pdftohtml = path.join(xpdf_bin, pdftohtml);
    callback();
}

let _check_compatibility = (callback) => {
    if(os.arch()=="x64" || os.arch()=="x32"){
        xpdf_bin = path.resolve(`${__dirname}/bin/bin${os.arch().charAt(1)}${os.arch().charAt(2)}`)
        callback({
            "err": 0,
            "message": xpdf_bin
        })
    }else{
        callback({
            "err": 1,
            "message": "Sorry, xpdf uses exe files and compatible with windows x32 and x64 bits."
        })
    }
}
let _validate_path = (options,callback) => {
    let opt = options[0];
    fs.access(opt, fs.F_OK, (err) => {
        if (err || path.extname(options[0]) != ".pdf") {
            callback(1)
        }else{
            callback(0);
        }        
    })
}

let _extract = (options,callback) => {
    _check_compatibility((cb_check_compatibility)=>{
        if(cb_check_compatibility.err == 0){
            setPaths(()=>{
                const cmd = spawn(pdftotxt, [options[0], '-']);
                cmd.stdout.on('data', (data) => {
                    callback(data.toString());
                });
                cmd.stderr.on('data', (data) => {
                    callback(data.toString());
                });
            })
        }else{
           callback(cb_check_compatibility.message) 
        }
    })
}
let _convert = (options,callback) => {
    _check_compatibility((cb_check_compatibility)=>{
        if(cb_check_compatibility.err == 0){
            setPaths(()=>{

                // console.log(path.extname(options[0]))
                // console.log(path.extname(options[1]))

                callback('sorry to tell you this, this part is in development and is commenced to finish on 16 Dec 2018!')
            })
        }else{
           callback(cb_check_compatibility.message)     
        }
    })
}

exports.extract = (options,callback) => {
    _validate_path(options,(cb_validate_path)=>{
        if(cb_validate_path == 0){
            _extract(options,(cb_extract)=>{callback(cb_extract)})
        }else{
            callback(options[0] + ": path not valid or file extension is wrong!")
        }
    })
}
exports.convert = (options,callback) => {
    if(options[1]){
        _validate_path(options,(cb_validate_path)=>{
            if(cb_validate_path  == 0){
                _convert(options,(cb_convert)=>{callback(cb_convert)})
            }else{
                callback(options[0] + " path not valid or file extension is wrong!")
            }
        })
    }else{
        callback("Please provide the output file path! for e.g. c:/etc etc/output.txt")
    }
}