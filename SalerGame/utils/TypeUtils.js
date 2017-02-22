/**
 * Created by cheilchina on 2017/2/21.
 */
function isArray(value) {
    return Array.isArray(value) || Object.prototype.toString.call(value) == "[object Array]";
}

function isType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]"
    }
}