console.log("Inside my doc")
/*console.log(last_var)*/

function myFirstFun(arg_one, arg_two){
    console.log(arg_one,arg_two)
}

myFirstFun(10, "Blaaaa")

let sec_fun = function(arg_one, arg_two){
    console.log(arg_one,arg_two)
}

let arr_fun = () => {
    console.log("inside my arr fun")
}

function ident(price){
    return price
}

function doublePrice(price){
    return price *2
}

function discountCalc(price_call,price){
    return price_call(price)*0.7
}

function my_curr(x){
    return function(y){
        console.log(`${x} ${y}`)
    }
}

let fun = my_curr("hallo");
fun("juve")
fun("pablo")

let fun2 = my_curr("hallo");
fun2("juve")
fun2("pablo")

console.log(discountCalc(ident,100))
console.log(discountCalc(doublePrice,100))

/*let iife_value = */