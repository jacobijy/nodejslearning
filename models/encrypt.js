var crypto = require('crypto');

var consts = {  
  cryptkey: 'S62rgt9rf!nYS5b3',  
  iv: "Og'Y6Jm-'i#io9Op"  
}; 

exports.md5 = function (str) {  
  var md5sum = crypto.createHash('md5');  
  md5sum.update(str);  
  str = md5sum.digest('hex');  
  return str;  
};  

exports.aesEncrypt = function (content) {  
  var cipher = crypto.createCipheriv('aes-128-cbc', consts.cryptkey, consts.iv);  
  cipher.setAutoPadding(true);  
  var bf = [];  
  bf.push(cipher.update(content));  
  bf.push(cipher.final());  
  return Buffer.concat(bf);  
};  

exports.aesDecrypt = function (content) {  
  var decipher = crypto.createDecipheriv('aes-128-cbc', consts.cryptkey, consts.iv);  
  decipher.setAutoPadding(true);  
  try {  
      var a = [];  
      a.push(decipher.update(content));  
      a.push(decipher.final());  
      return Buffer.concat(a);  
  } catch (e) {  
      console.error('decode error:', e.message);  
      return null;  
  }  
};