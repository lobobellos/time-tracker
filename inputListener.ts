import gpio from 'rpi-gpio'

gpio.on('change', (pin, value) => {
  console.log(pin, value)
})

gpio.setup(7, gpio.DIR_IN, gpio.EDGE_RISING)


process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => {
  console.log(data);
})