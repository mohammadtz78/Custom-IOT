const Gpio = require('onoff').Gpio;
const relay2 = new Gpio(8, 'out');
relay2.writeSync(Gpio.HIGH)
