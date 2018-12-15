let xpdf = require("./xpdf");
let options = [];

options = [
    "./bin/test/test.pdf",
    true //true = json format, false text format
];
xpdf.extract(options, (callback)=>{
    console.log(callback)
})

options = [
    "./bin/test/test.pdf",
    "your/out/put/path" //txt, ops, ppm, png, html, json
];
xpdf.convert(options, (callback)=>{
    if(callback){
        console.log(callback)
    }
})

let i = 5;
let loop = () => {
    options = [
        "./bin/test/test.pdf",
        "your/out/put/path" //txt, ops, ppm, png, html, json
    ];

    xpdf.convert(options, (callback)=>{
        if(callback){ console.log(callback) }

        if(i != 0){
            i--;
            loop();
        }else{
            console.log("finished!")
        }
    })
}
loop();








// EXTRACT = [
//     "./bin/test/test.pdf",
//     true, //true = json format, false text format
//     true, //debug output
// ];
// xpdf.extract(EXTRACT, (cb)=>{
//     console.log(cb)
// });

// CONVERT = [
//     "./bin/test/test.pdf",
//     "C:/Users/micha/Desktop/out put/pdadsfasdfasdf.json", //txt, ops, ppm, png, html, json
//     true //debug output as json [] if no warning / error, then [] would be the output
// ];
// xpdf.convert(CONVERT, (cb)=>{
//     console.log(cb)
// });

// let i = 4;
// let loop = () => {
//     let options = [
//     "./bin/test/test.pdf",
//     true, //true = json format, false text format
//     true, //debug output
//     ];

//     xpdf.extract(options, (cb)=>{
//         console.log(cb) //returns raw text and with warnings if enables in options
//         if(i != 0){
//             i--;
//             loop();
//         }else{
//             console.log("finished!")
//         }
//     })
// }
// loop();

