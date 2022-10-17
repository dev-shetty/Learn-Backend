const os = require("os");

console.log(os.uptime());
console.log(os.userInfo());
console.log(os.version());
console.log(os.endianness());
console.log(os.platform());

const cpus = os.cpus();
cpus.map((cpu) => console.log(cpu.model));

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
};
console.log(currentOS);
