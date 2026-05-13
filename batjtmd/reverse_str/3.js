// 递归
function reverseStr(str){
    if(str === ""){
        return "";
    }else{
        return reverseStr(str.substring(1)) + str.charAt(0);
    }
}