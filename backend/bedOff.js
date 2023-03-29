const Gpio = require('onoff').Gpio;
const relay3 = new Gpio(25, 'high')
relay3.writeSync(Gpio.HIGH)
