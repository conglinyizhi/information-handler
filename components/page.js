let axios = $http
let template = require('art-template');
let cheerie = require("cheerio")
let httpReturn
let debug = false;

module.exports = {
    type: 'list',
    async fetch({ args }) {
        // 隐藏启动页
        $prefs.set('showWelcome', false)
        let form = args.form.split(";");
        function GoinDebug(){
            args.gotodebug = true;
            $router.to($route('page',args))
        }
        if(!$prefs.get('closeMessage') && args.message && !args.gotodebug){
            return [{title:args.message,summary:"继续使用请点击我，我们将尝试在新窗口展示数据\n\n若不希望再次看到这种提示，请长按，我们会永久隐藏他（除非您从配置项中再次启用）",
            onClick:GoinDebug,onLongClick(){
                $prefs.set('closeMessage',true)
                GoinDebug()
            }}]
        }
        // 通过 axios 访问网络并且获取数据
        // 因为在无网络的情况下基本无法使用整个插件，所以考虑不做异常捕捉
        if(debug)console.log(form)
        httpReturn = await axios[form[0] || 'get'](form[2], {
            headers: args.headers || {}
        });
        let data = httpReturn.data;
        // HTML 解析部分，好像没有完工
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
                console.log("============================")
                console.log(cardlist)
                return cardlist
        } else if (form[1] == 'json') {
            // JSON 解析模式，大多数情况下他们可以按照预期工作
            args.itemRoot.split('.').forEach(key => {
                data = data[key]
            })

            // if (debug) {
            //     console.log(`Debug:输出数组成员 > ${data.length}`)
            //     console.log(data);
            // }
            // Dora.js 标题设置为空，这样可以让顶栏好看一点，然而实际 1.9.0 并没有实际作用……
            // this.title=''

            return data.map((config, index) => {
                return makeCard({ args, config, index })
            });
        } else {
            return [{ title: "什么玩意？是用了新的 API 吗？", summary: "Error:mabey is new API?" }]
        }
    }
}


function makeCard({ args, config, index }) {
    function _template(mod) {
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

    [
        ['image', args.icon],
        ['viewerCount', ''],
        ['label', ''],
        ['summary', ''],
        ['title', '']
    ].forEach(key => {
        card[key[0]] = _template(args[key[0]])
    })

    // 转换点击执行或者长按执行
    let fun = $prefs.get('clickToGo') ? 'onClick' : 'onLongClick'
    if (args.schame) card[fun] = () => {
        $router.to($route(_template(args.schame)))
    }
    else if (args.video) card[fun] = () => {
        $router.to($route('video', { url: _template(args.video) }))
    }
    else if (args.url) card[fun] = () => {
        $router.to($route('webview', { url: _template(args.url) }))
    }
    return card
}