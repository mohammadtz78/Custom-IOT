const Gpio = require('onoff').Gpio;
const relay1 = {name: "relay1", pin: new Gpio(7, 'high')};
const relay2 = {name: "relay2", pin: new Gpio(8, 'high')};
const relay3 = {name: "relay3", pin: new Gpio(25, 'high')};
const relay4 = {name: "relay4", pin: new Gpio(24, 'high')};
const relay5 = {name: "relay5", pin: new Gpio(23, 'high')};
const relay6 = {name: "relay6", pin: new Gpio(18, 'high')};
const relay7 = {name: "relay7", pin: new Gpio(15, 'high')};
const relay8 = {name: "relay8", pin: new Gpio(14, 'high')};

let relays = [relay1, relay2, relay3, relay4, relay5, relay6, relay7, relay8];

for (let relay of relays) {
    relay.pin.writeSync(Gpio.HIGH)
}