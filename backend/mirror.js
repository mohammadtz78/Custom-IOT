const Gpio = require('onoff').Gpio;
const relay6 = new Gpio(18, 'out');
const relay1 = new Gpio(7, 'out');
relay1.writeSync(Gpio.LOW)
relay6.writeSync(Gpio.LOW)

