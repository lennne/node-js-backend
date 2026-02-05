//url versioning -> checks the version passed in the header
const urlVersioning = (version) => (req, res, next) => {
    if(req.path.startsWith(`/api/${version}`)){
        next()
    }else{
        return res.status(400).json({
            success: failure,
            error: 'API version is not supported'
        })
    }
}

//header versioning -> checks the 'Accept-Version' header
const headerVersioning = (version) => (req, res, next) => {
    if(req.get('Accept-Version') === version ){
        next()
    }else {
          return res.status(400).json({
            success: failure,
            error: 'API version is not supported'
        })
    }
}
//content-type versioning
const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get('Content-Type');

    if(contentType && contentType.includes(`application/vnd.api.${version}+json`)){
        next()
    }else {
          return res.status(400).json({
            success: failure,
            error: 'API version is not supported'
        })
    }
}

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning}