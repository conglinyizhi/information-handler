module.exports = {
    type: 'topTab',
    fetch() {
        return [
            drawRoute("[用户]快速使用文档",'user'),
            drawRoute("[开发]源编写文档",'dev'),
            drawRoute("[特例]不同框架的特性",'framework'),
            {title:'[配置]设置页面？',route:$route('indexView/config')}

        ]
    }
}

function drawRoute(title,mod){
    return {title,route:$route('indexView/show',{mod})}
}