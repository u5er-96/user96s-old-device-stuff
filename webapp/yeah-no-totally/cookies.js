function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function encode(s) {
 t=""
 for(var i=0;i<s.length;++i) {
  ch=s.charAt(i)
  if(ch=="/") t += "//"
  else if(ch==" ")  t += "/b"
  else if(ch==",")  t += "/."
  else if(ch==";")  t += "/:"
  else if(ch=="\n") t += "/n"
  else if(ch=="\r") t += "/r"
  else if(ch=="\t") t += "/t"
  else if(ch=="\b") t += "/b"
  else t += ch
 }
 return t
}

function decode(s) {
 // Decode the encoded cookie value
 t=""
 if(s==null) return t
 for(var i=0;i<s.length;++i) {
  var ch=s.charAt(i)
  if(ch=="/") {
   ++i
   if(i<s.length){
    ch=s.charAt(i)
    if(ch=="/") t += ch
    else if(ch==".") t += ","
    else if(ch==":") t += ";"
    else if(ch=="n") t += "\n"
    else if(ch=="r") t += "\r"
    else if(ch=="t") t += "\t"
    else if(ch=="b") t += " "
   }
  }else t += ch
 }
 return t
}
