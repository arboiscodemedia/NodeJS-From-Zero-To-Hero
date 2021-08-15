
 exports.single_upload = function(req,res){
     console.log(req.file.path)
     var response = '<a href="/">Home</a><br>'
     response += "Files uploaded sucessfully.<br>"
     response += `<img src="${req.file.path}" /><br>`
     return res.send(response)
 }

 exports.mutliple_upload = function(req,res){
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded sucessfully.<br>"
    for(var i=0; i<req.files.length; i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    return res.send(response)
 }