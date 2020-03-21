const childProcess = require('child_process')

// childProcess.fork('2.js')
let ls = childProcess.spawn('ls', ['-lh', '/'])
ls.stdout.on('data', chunk => {
    console.log(chunk);

})

ls.stderr.on('data', chunk => {
    console.error(`stderr: ${chunk}`);
})

ls.on('close', (code) => {
    console.log(`子进程退出，使用退出码 ${code}`);
});
// console.log(1);