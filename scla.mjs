import WQueue from './src/WQueue.mjs'
//import WQueue from './dist/w-queue.umd.js'


//wq
let wq = new WQueue() //default takeNumLimit=1


//message
wq.on('message', function(qs) {
    console.log('message', qs)

    //get
    let v = wq.get()
    if (!v) {
        return
    }
    console.log('get', v)

    setTimeout(function() {
        console.log('cb', v)

        //cb
        wq.cb()

    }, 1000)

})


//n
let n = 0


//queues push 1~5
setTimeout(function() {
    console.log('queues push 1~5')
    let t = setInterval(function() {
        n += 1
        wq.push('$' + n)
        if (n === 5) {
            clearInterval(t)
        }
    }, 50)
}, 1)


//queues push 6~10 by delay 1s
setTimeout(function() {
    console.log('queues push 6~10')
    let t = setInterval(function() {
        n += 1
        wq.push('$' + n)
        if (n === 10) {
            clearInterval(t)
        }
    }, 50)
}, 1000)
