const Gpio = require('onoff').Gpio;
const relay4 = new Gpio(24, 'out');
relay4.writeSync(Gpio.LOW)
