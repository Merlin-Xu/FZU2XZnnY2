function formatTime(date) {
  if(!date){
    date = new Date();
  }

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDistance(distance) {
  distance = +distance;
  return distance < 1000 ? Math.round(distance) + 'm' : (distance/1000).toFixed(1) + 'km';
}

function isPlainObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

function isPhoneNumber(num) {
  return /^1\d{10}$/.test(num);
}

function isEmail(str){
  return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(str);
}

function isloyalT(str){
  return /^[0-9]{12}/.test(str);  
}
module.exports = {
  formatTime: formatTime,
  isPlainObject: isPlainObject,
  isPhoneNumber: isPhoneNumber,
  isEmail: isEmail,
  isloyalT: isloyalT,
  formatDistance: formatDistance
}


