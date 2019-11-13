function getStream(req, res, filepath, statObj) {
    let start = 0;
    let end = statObj.size - 1;
    let range = req.headers['range'];
    if (range) {
        res.setHeader('Accept-Range', 'bytes');
        res.statusCode = 206;
        let result = range.match(/bytes=(\d*)-(\d*)/);
        if (result) {
            start = isNaN(result[1]) ? start : parseInt(result[1]);
            end = isNaN(result[2]) ? end : parseInt(result[2]) - 1;
        }
    }
    return fs.createReadStream(filepath, {
        start, end
    });
}