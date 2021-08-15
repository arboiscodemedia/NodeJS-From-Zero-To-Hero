 const photoController = require("../controller/photoController")
module.exports = function(app, upload){

     app.post('/single-upload',upload.single('single-file') , photoController.single_upload)
     app.post('/multiple-upload', upload.array('multiple-files', 12),photoController.mutliple_upload )
}