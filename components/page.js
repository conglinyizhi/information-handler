let axios = $axios||$http||require('axios')  // 高版本兼容，不过这两玩意都一样
let template = require('art-template');
let cheerie = require("cheerio")
let httpReturn
let debug = false;

module.exports = {
    type: 'list',
    async fetch({ args }) {
        // 隐藏启动页
        $prefs.set('showWelcome', false)
        if(!$prefs.get('closeMessage') && args.message && !args.gotodebug){
            return [{title:args.message,
                summary:"继续使用请点击我，我们将尝试在新窗口展示数据\n\n若不希望再次看到这种提示，请长按，我们会永久隐藏他（除非您从配置项中再次启用）",
                onClick(){
                    GoinDebug({args})
                },onLongClick(){
                    $prefs.set('closeMessage',true)
                    GoinDebug({args})
                }
            }]
        }
        // 隐藏标题
        this.title=''
        return [{title:"加载完成",style:"category"}].concat(await this._drawCardList({args},{
            mode:"page"
        }));
    },
    drawMainList,
    makeCard,
    async _drawCardList({args},drawObject = {mode:'index'}){
        if(typeof args.message != 'undefined' && drawObject.mode != 'page') return [{title:`源 ${args.showName} 似乎不稳定，不在首页展示`,style:"category"}]
        let form = args.form.split(";");
        // 通过 axios 访问网络并且获取数据
        // 因为在无网络的情况下基本无法使用整个插件，所以考虑不做异常捕捉
        if(debug)console.log(form)
        httpReturn = await axios[form[0] || 'get'](form[2], {
            headers: args.headers || {}
        });
        let View = this.drawMainList({args,data:httpReturn.data,form})
        // 颠倒数组
        if(args.reverse){
            View.reverse()
        }
        if(View.length == 0){
            View = [{title:"抱歉，我们没有发现有效的数据",summary:"可能是数据来源问题，如果是某 bilibili UP 主，可能是因为没有稿件"}]
        }
        return View
    }
}

// 主要绘制列表函数
function drawMainList({args,data,form}){
    if (form[1] == 'html') {
        // 构建 html 解析器
            let $ = cheerie.load(data);
            let View = $(args.itemRoot)
            if (debug) {
                console.log(args)
                console.log(`View.length:${View.length}`)
            }
            let cardlist = new Array(View.length)
            View.each((index, el) => {
                let config = {};
                function getText(key, selector, command, attr = undefined) {
                    config[key] = $(el).find(selector)[command](attr)
                }
                if (args.string) {
                    for (let stringKey in args.string) {
                        const item = args.string[stringKey];
                        if(item.get == 'text'||item.get == 'attr')getText(stringKey, item.selector, item.get,item.attr)
                    }
                }
                cardlist[index] = makeCard({ args, config, index })
            })
            return cardlist
    } else if (form[1] == 'json') {
        // JSON 解析模式，大多数情况下他们可以按照预期工作
        args.itemRoot.split('.').forEach(key => {
            data = data[key]
        })
        return data.map((config, index) => {
            return makeCard({ args, config, index })
        });
    } else {
        return [{ title: "什么玩意？是用了新的 API 吗？", summary: "Error:mabey is new API?" }]
    }
}

// 卡片模板代码渲染函数
function makeCard({ args, config, index }) {
    function _template(mod) {
        // 如果有模板代码就执行渲染指令
        return mod ? template.render(mod, config) : ''
    }
    let card = {
        style: args.style || 'simple',
        author: {
            avatar: _template(args.author_avatar),
            name: _template(args.author_name)
        }
    };

    config.__index = index;

    // 批量渲染卡片的数据
    ['image','viewerCount','label','summary','title','thumb'].forEach(key => {
        card[key] = _template(args[key])
    })

    // 转换点击执行或者长按执行
    let fun = $prefs.get('clickToGo') ? 'onClick' : 'onLongClick'
    if (args.schame) card[fun] = () => {
        $router.to($route(_template(args.schame)))
    }
    if (args.audio) card[fun] = () => {
        $router.to($route('audio',{
            url:_template(args.audio),
            make:args.audiomake
        }))
    }
    else if (args.video) card[fun] = () => {
        $router.to($route('video', { url: _template(args.video) }))
    }
    else if (args.url) card[fun] = () => {
        $router.to($route('webview', { url: _template(args.url) }))
    }
    return card
}

// 用来执行用户点击警告执行的事件
function GoinDebug({args}){
    args.gotodebug = true;
    $router.to($route('page',args))
}