const Gpio = require('onoff').Gpio;
const led8 = new Gpio(14, 'out');
const led7 = new Gpio(15, 'out');
const led6 = new Gpio(18, 'out');
const led5 = new Gpio(23, 'out');
const led4 = new Gpio(24, 'out');
const led3 = new Gpio(25, 'out');
const led2 = new Gpio(8, 'out');
const led1 = new Gpio(7, 'out');

let leds = [led1,led2,led3,led4,led5,led6,led7,led8]
for (led of leds){
    led.writeSync(0)
    console.log(led);
}




for (led of leds){
    console.log(led.readSync());
    led.unexport();

}