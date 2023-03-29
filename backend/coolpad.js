const Gpio = require('onoff').Gpio;
const relay7 = new Gpio(15, 'out');
relay7.writeSync(Gpio.LOW)
