module.exports = {
    type: 'topTab',
    fetch() {
        return [
            {title:'[用户]快速使用文档',route:$route('indexView/show',{mod:'user'})},
            {title:'[开发]源编写文档',route:$route('indexView/show',{mod:'dev'})},
            {title:'[特例]不同框架的特性',route:$route('indexView/show',{mod:'framework'})}
        ]
    }
}
