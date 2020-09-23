const set_cookie = function (arg1, arg2, arg3) {
  const key = arg1, value = arg2, expiry = arg3
  var d = new Date();
  d.setTime(d.getTime() + (expiry*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/;secure";
}

const get_cookie = function (arg1) {
  const key = arg1
  var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export {
  set_cookie,
  get_cookie
}
