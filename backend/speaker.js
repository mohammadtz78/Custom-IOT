const Gpio = require('onoff').Gpio;
const relay8 = new Gpio(14, 'out');
relay8.writeSync(Gpio.LOW)
