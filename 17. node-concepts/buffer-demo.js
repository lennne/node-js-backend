//objects -> for handling binary data
//file system operations, cryptography, image processing

const buffOne = Buffer.alloc(10) // this allocates a buffer of 10 bytes -> a byte being 8 bits
console.log(buffOne)
//<Buffer 00 00 00 00 00 00 00 00 00 00>

const buffFromString = Buffer.from('Hello')
console.log(buffFromString) //creates aa buffer from a string
// <Buffer 48 65 6c 6c 6f>

const buffFromArrayOfIntegers = Buffer.from([1,2,3,4,5])
console.log(buffFromArrayOfIntegers)
// <Buffer 01 02 03 04 05>

// say i want to use one of these buffers
buffOne.write('Node js')
console.log('After writing Node js to buffOne', buffOne.toString())
// After writing Node js to buffOne Node js

 console.log(buffFromString[0])

console.log(buffFromString.subarray(0,3))

const concatBuffs = Buffer.concat([buffOne, buffFromString])
console.log(concatBuffs)

console.log(concatBuffs.toJSON())