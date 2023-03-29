const Gpio = require('onoff').Gpio;
const relay6 = new Gpio(18, 'out');
relay6.writeSync(Gpio.LOW)
