const pageobj = require('../page')
const indexobj = require('../old_index')
module.exports = {
    type: 'list',
    async fetch({args,page}) {
        if(page&&page.end)return[{title:"我是有底线的",style:"category"},{title:"感谢您使用信息直通车插件",style:"category"}]
        function getPageindex(){
            return (page&&page.index||0)
        }
        const data = (page&&page.data)|| await indexobj.indexArray();
        let index = (getPageindex()||0)
        let nextPage = {
            data,
            index
        }
        let _cofing = data[getPageindex()]
        let View = [{title:`源 ${_cofing.showName}`,style:"category"}].concat(
            await pageobj._drawCardList({args:_cofing})
        )
        if(getPageindex() == data.length -1){
            nextPage = {
                end:true
            }
        }else{
            nextPage.index = getPageindex() + 1
        }
        return {
            nextPage,
            items:View
        }
    }
}