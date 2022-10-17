const upload = require("../helpers/uploader");
const util = require("util");

exports.index = (req, res) => {
    return res.render('index', { message: req.flash() });
}

exports.uploadSingle = (req, res) => {
    if (req.file) {
        console.log(req.file)

        req.flash('success', 'File Uploaded.');
    }
    return res.redirect('/');
}

exports.uploadMultiple = async (req, res) => {
    if (req.files.length) {
        console.log(req.files)
     
         

        const PDFkitDocument = require('pdfkit');
        let fs = require('fs');
        const PDFLibDocument = require('pdf-lib').PDFDocument;
        const doc = new PDFkitDocument();
        req.files.forEach((file) => {
            doc.image(file.path, {
                align: 'center',
                valign: 'center'
            });
            doc
        .addPage()
          });
          doc.pipe(fs.createWriteStream('example1.pdf'));
          doc.end();
        //   const allFilesBuffer = []
        //   req.files.forEach(async (file) => {
        //     allFilesBuffer.push(fs.readFileSync(file.path));
        //   });
         
        // const mergedPdf = await PDFLibDocument.create(); 
        // for (const pdfBytes of allFilesBuffer) { 
        //     const pdf = await PDFLibDocument.load(pdfBytes); 
        //     const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        //     copiedPages.forEach((page) => {
        //          mergedPdf.addPage(page); 
        //     }); 
        // } 
        
        // const buf = await mergedPdf.save();        // Uint8Array
        
        // let path = 'merged.pdf'; 
        // fs.open(path, 'w', function (err, fd) {
        //     fs.write(fd, buf, 0, buf.length, null, function (err) {
        //         fs.close(fd, function () {
        //             console.log('wrote the file successfully');
        //         }); 
        //     }); 
        // }); 

        // req.flash('success', 'Files Uploaded.');
    }
    return res.redirect('/');
}

exports.uploadSingleV2 = async (req, res) => {
    const uploadFile = util.promisify(upload.single('file'));
    try {
        await uploadFile(req, res);
        console.log(req.file)
        
        req.flash('success', 'File Uploaded.');
    } catch (error) {
        console.log(error)
    }
    return res.redirect('/');
}