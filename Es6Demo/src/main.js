/**
 * Created by cheilchina on 2017/4/19.
 */
window.addEventListener('resize', (e)=> {
    // console.log("e:" + e);
    console.log("height:" + window.innerHeight + "\t width:" + window.innerWidth);
    // console.log("width:" + window.innerWidth);
});

console.log(1111);

// for (let i = 0; i < 10; i++) {
//     console.log(i);
// }

let arr = [1, 2, 3, "a", "b", "c"];

let set = new Set([1, 2, 3, 2, 1, "hello", "world", true, false]);
set.add({name: "xiaoming", age: 11});
if (set.has("world")) {
    set.delete("world");
}
console.log(set);

// for (let e of set) {
//     console.log(e);
// }


// let arr = [1, 2, 3, 2, 1];
console.log("arr:" + arr);
console.log("set ...:" + [...new Set(arr)]);
// console.log("set from:" + Array.from(new Set(arr)));

let map = new Map();
map.set(arr, set);
console.log(map);


//遍历
// for (let key of set.keys()) {
//     console.log(key);
// }
//
// for (let value of set.values()) {
//     console.log(value);
// }
//
// for (let item of set.entries()) {
//     console.log(item);
// }

set.forEach((value)=> {
    console.log(value)
});

//class test
class Animal {
    constructor(name,) {
        this.name = name;
        // this.age = age;
    }

    toString() {
        return "(name:" + this.name + ")";
    }
}


let pig = new Persion("小明", 11);
console.log(pig);

class Persion extends Animal {

    constructor(name, age) {
        super(name);
        this.age = age;
    }

    toString() {
        return "(name:" + this.name + "\t age:" + this.age + ")";
    }
}