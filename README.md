# w-queue
An operator for queues.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![npm version](http://img.shields.io/npm/v/w-queue.svg?style=flat)](https://npmjs.org/package/w-queue) 
[![Build Status](https://travis-ci.org/yuda-lyu/w-queue.svg?branch=master)](https://travis-ci.org/yuda-lyu/w-queue) 
[![license](https://img.shields.io/npm/l/w-queue.svg?style=flat)](https://npmjs.org/package/w-queue) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-queue/master/dist/w-queue.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-queue)
[![npm download](https://img.shields.io/npm/dt/w-queue.svg)](https://npmjs.org/package/w-queue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-queue.svg)](https://www.jsdelivr.com/package/npm/w-queue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-queue/global.html).

## Installation
### Using npm(ES6 module):
> **Note:** `w-queue` does't depend on any package.
```alias
npm i w-queue
```
#### Example for geting messages one by one:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-queue/blob/master/scla.mjs)]
```alias
import WQueue from 'w-queue'


//wq
let wq = new WQueue({ takeNumLimit: 1 })


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


// queues push 1~5
// message [ '$1' ]
// get $1
// queues push 6~10
// cb $1
// message [ '$2', '$3', '$4', '$5', '$6' ]
// get $2
// cb $2
// message [ '$3', '$4', '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $3
// cb $3
// message [ '$4', '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $4
// cb $4
// message [ '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $5
// cb $5
// message [ '$6', '$7', '$8', '$9', '$10' ]
// get $6
// cb $6
// message [ '$7', '$8', '$9', '$10' ]
// get $7
// cb $7
// message [ '$8', '$9', '$10' ]
// get $8
// cb $8
// message [ '$9', '$10' ]
// get $9
// cb $9
// message [ '$10' ]
// get $10
// cb $10
```
#### Example for parallel, messages are limited by 2 events:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-queue/blob/master/sclb.mjs)]
```alias
import WQueue from 'w-queue'


//wq
let wq = new WQueue({ takeNumLimit: 2 })


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


// queues push 1~5
// message [ '$1' ]
// get $1
// message [ '$2' ]
// get $2
// queues push 6~10
// cb $1
// message [ '$3', '$4', '$5', '$6' ]
// get $3
// cb $2
// message [ '$4', '$5', '$6', '$7' ]
// get $4
// cb $3
// message [ '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $5
// cb $4
// message [ '$6', '$7', '$8', '$9', '$10' ]
// get $6
// cb $5
// message [ '$7', '$8', '$9', '$10' ]
// get $7
// cb $6
// message [ '$8', '$9', '$10' ]
// get $8
// cb $7
// message [ '$9', '$10' ]
// get $9
// cb $8
// message [ '$10' ]
// get $10
// cb $9
// cb $10
```
#### Example for parallel, get messages with no restriction:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-queue/blob/master/sclb.mjs)]
```alias
import WQueue from 'w-queue'


//wq
let wq = new WQueue() //default takeNumLimit=0, not limit


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


//queues push 1~10
setTimeout(function() {
    console.log('queues push 1~10')
    let t = setInterval(function() {
        n += 1
        wq.push('$' + n)
        if (n === 10) {
            clearInterval(t)
        }
    }, 50)
}, 1)


// queues push 1~10
// message [ '$1' ]
// get $1
// message [ '$2' ]
// get $2
// message [ '$3' ]
// get $3
// message [ '$4' ]
// get $4
// message [ '$5' ]
// get $5
// message [ '$6' ]
// get $6
// message [ '$7' ]
// get $7
// message [ '$8' ]
// get $8
// message [ '$9' ]
// get $9
// message [ '$10' ]
// get $10
// cb $1
// cb $2
// cb $3
// cb $4
// cb $5
// cb $6
// cb $7
// cb $8
// cb $9
// cb $10
```

### In a browser(UMD module):
> **Note:** `w-queue` does't depend on any package.

[Necessary] Add script for w-queue.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-queue@1.0.2/dist/w-queue.umd.js"></script>
```
#### Example:
> **Link:** [[dev source code](https://github.com/yuda-lyu/w-queue/blob/master/web.html)]
```alias
//wq
let WQueue = window['w-queue']
let wq = new WQueue({ takeNumLimit: 1 })


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


// queues push 1~5
// message [ '$1' ]
// get $1
// queues push 6~10
// cb $1
// message [ '$2', '$3', '$4', '$5', '$6' ]
// get $2
// cb $2
// message [ '$3', '$4', '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $3
// cb $3
// message [ '$4', '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $4
// cb $4
// message [ '$5', '$6', '$7', '$8', '$9', '$10' ]
// get $5
// cb $5
// message [ '$6', '$7', '$8', '$9', '$10' ]
// get $6
// cb $6
// message [ '$7', '$8', '$9', '$10' ]
// get $7
// cb $7
// message [ '$8', '$9', '$10' ]
// get $8
// cb $8
// message [ '$9', '$10' ]
// get $9
// cb $9
// message [ '$10' ]
// get $10
// cb $10
```