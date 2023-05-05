import gpio from 'rpi-gpio'

gpio.setup(7, gpio.DIR_IN, gpio.EDGE_RISING, () => {
  console.log('button pressed')
})


process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => {
  console.log(data);
})

process.on('SIGINT', function () {
  console.log('Ctrl-C...');
  gpio.destroy(()=>{console.log('gpio destroyed')})
  process.exit(2);
});