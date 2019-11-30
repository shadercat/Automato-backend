var cluster = require('cluster');
var CPUCount = require("os").cpus().length;

cluster.on('disconnect', (worker, code, signal) => {
    console.log(`Worker ${worker.id} died`);
    cluster.fork();
});

cluster.on('online', (worker) => {
    console.log(`Worker ${worker.id} running`);
});

cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
});

for (let i = 0; i < CPUCount; ++i) {
    cluster.fork();
}