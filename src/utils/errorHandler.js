window.onerror=function(

message,
source,
line,
column,
error

){

console.group("%cApplication Error","color:red;font-size:18px");

console.error("Message :",message);

console.error("File :",source);

console.error("Line :",line);

console.error("Column :",column);

console.error("Stack :",error?.stack);

console.groupEnd();

return false;

};

window.onunhandledrejection=function(event){

console.group("%cUnhandled Promise","color:orange;font-size:18px");

console.error(event.reason);

console.groupEnd();

};