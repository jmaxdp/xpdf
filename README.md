# @aynode/xpdf
This package is originally made by www.xpdfreader.com. This package includes Xpdf tools. The tools convert pdf files to html, png, ppm, ops, text. This package also includes pdf detach, fonts, images and info. For more info, please visit the owner at www.xpdfreader.com.

###### How to use:-
First install via npm: `npm i @aynode/xpdf --save`.

> To loop extraction / conversion please see the below example:-
```
let xpdf = require("@aynode/xpdf");

let i = 4;
let options = [];
let loop = () => {
    options = [
        "./bin/test/test.pdf",
        "your/out/put/path" //e.g. ./hello.txt, C:/hello.ops, other.ppm, other.png, other.html, other.json (txt | ops | ppm | png | html | json)
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
```

> To extract pdf to raw text
```
let xpdf = require("@aynode/xpdf");

let options = [
    "./bin/test/test.pdf",
    true //true = json format, false text format
];
xpdf.extract(options, (callback)=>{
    console.log(callback)
})
```

> To convert and save to file
```
let xpdf = require("@aynode/xpdf");

let options = [
    "./bin/test/test.pdf",
    "your/out/put/path" //e.g. ./hello.txt, C:/hello.ops, other.ppm, other.png, other.html, other.json (txt | ops | ppm | png | html | json)
];
xpdf.convert(options, (callback)=>{
    if(callback){
        console.log(callback)
    }
})
```
