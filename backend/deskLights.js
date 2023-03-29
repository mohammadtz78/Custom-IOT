const Gpio = require('onoff').Gpio;
const relay5 = new Gpio(23, 'out');
relay5.writeSync(Gpio.LOW)
