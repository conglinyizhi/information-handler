module.exports = {
    type: 'topTab',
    fetch() {
        return [
            {title:'[用户]快速使用文档',route:$route('indexView/show',{mod:'user'})},
            {title:'[开发]源编写文档',route:$route('indexView/show',{mod:'dev'})}
        ]
    }
}
