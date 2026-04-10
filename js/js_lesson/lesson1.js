let xrc = {
    xq:1000000,
    name:'熊睿晨',
    hometown:'南昌',
    hobbies:['学习','打游戏'],
    sendFlower:function(target){
        console.log('熊睿晨给'+target.name+'送花了')
        target.receiveFlower(xrc)
    },
    getRecall:function(caller){
        console.log('啥意思啊')
        if(caller.name === '小美'){
            console.log('666还有第二关')
        }
        setTimeout(function(){
            this.xq = 0;
            console.log('扫码')
        },3000)
    }
}
let xm={
    xq:80,
    name:'小美',
    hometown:'鹰潭',
    receiveFlower:function(sender){
        console.log('小美收到了'+sender.name+'的花')
        if(sender.name === '熊睿晨'){
            console.log('扫码了.......')
            sender.getRecall(xm)
        }
        else {
            if(sender.xq < 80){
                console.log('不约,瓦达西是纯爱达')
            }
            else{
                console.log('纯扫码')
            }
        }
    }
}
let xh={
    xq:100,
    name:'小红',
    hometown:'南昌',
    receiveFlower:function(sender){
        console.log('小红收到了'+sender.name+'的花')
        xm.receiveFlower(sender)
    }
}
let xs={
    xq:100000,
    name:'小帅',
    hometown:'上饶',
    sendFlower:function(target){
        console.log('小帅给'+target.name+'送花了')
        target.receiveFlower(xs)
    }
}
xrc.sendFlower(xh)
