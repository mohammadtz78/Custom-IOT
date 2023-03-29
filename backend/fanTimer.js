const Gpio = require('onoff').Gpio;
const relay4 = new Gpio(24, 'out');
let num = process.argv[2]
let suffix = process.argv[3]
switch (num) {
    case "one" :
        num=1
        break
    case "two" :
        num=2
        break
    case "three" :
        num=3
        break
    case "four" :
        num=4
        break
    case "five" :
        num=5
        break
    case "six" :
        num=6
        break
    case "seven" :
        num=7
        break
    case "eight" :
        num=8
        break
    case "nine" :
        num=9
        break
    case "ten" :
        num=10
        break
}

switch (suffix) {
    case "seconds" :
        num*=1000
        break
    case "minutes" :
        num*=60*1000
        break
    case "minute" :
        num*=60*1000
        break
    case "hour" :
        num*=60*60*1000
        break
    case "hours" :
        num*=60*60*1000
        break
}
relay4.writeSync(Gpio.LOW)
let timer = setTimeout(()=>relay4.writeSync(Gpio.HIGH),num)
