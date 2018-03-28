var zlib = require('zlib');

//compress
exports.gZip = function(strText, cb) {
  zlib.gzip(strText, function(err, buffData) {
    cb(err, buffData);
  })
}

exports.unZip = function(buffer, cb) {
  zlib.unzip(buffer, function(err, buf) {
    cb(err, buf);
  })
}