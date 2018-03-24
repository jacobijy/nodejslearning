exports.checkURL = function(URL) {
  var str=URL;
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp=new RegExp(Expression);
  if (objExp.test(str)==true) {
    return true;
  } 
  else {
    console.log('----------不是url-----------');
    return false;
  }
}

exports.getIPAdress = function(){  
  var interfaces = require('os').networkInterfaces();  
  for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
             var alias = iface[i];  
             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                   return alias.address;  
             }  
        }  
  }  
} 
