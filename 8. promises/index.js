function delayFn(time){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

console.log('Promise here', )
delayFn(2000).then(() => {
     console.log('after 2 seconds')
})
console.log("end")

function divideFn(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject('Can not perform division by 0')
        } else {
            resolve(num1 / num2)
        }
    })
}

divideFn(4, 0)
.then((result) => {
    console.log(result);
}).catch(error => console.error(error))