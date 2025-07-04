const str = "hello";
String.prototype.newFn = function () {
  let newStr = "";
  for (const char of this) {
    newStr += char + "-";
  }
  return newStr.slice(0, newStr.length-1); 
};

console.log(str.newFn()); 