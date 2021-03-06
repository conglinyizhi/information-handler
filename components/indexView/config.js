module.exports = {
    type: 'list',
    async fetch({ args }) {
        let View = [drawListBlock("源配置模块",[
            {title:"本地源",onClick(){
                pushStorage("")
            }},
            {title:"网络源 1 - 稳定版",onClick(){
                pushStorage("https://gitee.com/conglinyizhi/API/raw/master/Dora/infoData.json")
            }},
            {title:"网络源 2 - 开发版",onClick(){
                pushStorage("https://gitee.com/conglinyizhi/API/raw/debug/Dora/infoData.json")
            }},
            {title:"自定义",onClick(){
                $ui.toast("请在配置项中输入详细信息")
                $prefs.open()
            }}
        ])];
        
        return View 
    }
}

function drawListBlock(title,actions){
    return {title,style:"chips",actions}
}

function pushStorage(data){
    $ui.toast("配置完成~")
    $prefs.set("url",data)
}