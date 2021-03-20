if (typeof $dora == 'undefined') {
  console.error('This project runs only in Dora.js.')
  console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}

console.info('Congratulation, your addon runs successfully!')
// "art-template": "^4.13.2",
// [转发自用户 qin hector]
const oldConsoleLog = console.log;
global.console.log = function (msg) {
  // 忽略 pnp 日志
  if (msg === 'dependencyNameMatch') {
    return;
  }
  if (typeof msg === 'object') {
    if (msg.issuer && msg.dependencyNameMatch) {
      return;
    }
    if (msg.issuerInformation || msg.issuerLocator || msg.dependencyName || msg.dependencyReference) {
      return;
    }
  }
  oldConsoleLog.apply(oldConsoleLog, arguments);
};

// 深度拷贝
global.clone=(o)=>{
    var s = {};
    for (var k in o)
        s[k] = typeof o[k] === 'object' ? clone(o[k]) : o[k];
    return s;
}

