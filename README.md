# xpdf
This package is originally made by www.xpdfreader.com. This package includes Xpdf tools. The tools convert pdf files to html, png, ppm, ops, text. This package also includes pdf detach, fonts, images and info. For more info, please visit the owner at www.xpdfreader.com.

###### How to use:-


> To extract pdf to raw text
```
let xpdf = require("xpdf");

let extractoptions = [
    "your/path/to/pdf.pdf"
];

xpdf.extract(extractoptions, (cb)=>{
    console.log(cb) //returns raw text
})
```

> To convert and save to file
...
let xpdf = require("xpdf");

let convertoptions = [
    "your/path/to/pdf.pdf",
    "your/path/to/output.txt" //.txt, .opx, .ppm, .png, .html
];

xpdf.convert(convertoptions, (cb)=>{
    console.log(cb) //returns path of export and if success
})
...
