/**
 * 事件觸發器
 *
 * @returns {Object} 回傳事件觸發器物件，包含on與emit事件，on為註冊監聽事件，emit為觸發事件
 */
function EventEmitter() {

    //handles
    let handles = {}

    //on
    function on(eventName, callback) {
        if (!handles[eventName]) {
            handles[eventName] = []
        }
        handles[eventName].push(callback)
    }

    //emit
    function emit(eventName, ...arg) {
        if (handles[eventName]) {
            for (let i = 0; i < handles[eventName].length; i++) {
                handles[eventName][i](...arg)
            }
        }
    }

    return {
        on,
        emit,
    }
}


/**
 * 佇列處理器，單生產者單消費者模式，核心使用迭代器，具有消息堵塞與可限定同時處理上限數量功能
 *
 * @param {*} [opt={}] 輸入設定物件，預設{}
 * @param {Number} [opt.takeNumLimit=0] 輸入同時處理上限數量整數，預設0，代表無限制
 * @returns {Object} 回傳佇列處理器物件，包含事件on、push、get、cb。on為監聽事件，需自行監聽message事件，push為加入最新佇列消息，get為回傳當前最早佇列消息，cb為於message事件內回調使迭代器可取得下一個佇列消息
 */
function WQueue(opt = {}) {

    //default
    if (!opt.takeNumLimit) {
        opt.takeNumLimit = 0
    }

    //takeNum
    let takeNum = 0

    //qs
    let qs = []

    //ee
    let ee = new EventEmitter()

    //get, like iterator
    function get() {
        if (qs.length > 0) {

            //add takeNum
            takeNum += 1

            //take first
            let v = qs.splice(0, 1)[0]

            //r
            //let r = { value: v, done: false }
            let r = v

            return r
        }
        else {

            //r
            //let r = { value: undefined, done: true }
            let r = null

            return r
        }
    }
    ee.get = get

    //cb
    function cb() {

        //minu takeNum
        takeNum -= 1

        //emit
        if (qs.length > 0) {
            ee.emit('message', qs)
        }

    }
    ee.cb = cb

    //push
    function push(v) {

        //push
        qs.push(v)
        //console.log('push', qs)

        //emit
        if (opt.takeNumLimit <= 0 || takeNum < opt.takeNumLimit) {
            ee.emit('message', qs)
        }

    }
    ee.push = push

    return ee
}


export default WQueue
