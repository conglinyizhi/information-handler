let axios = $http
let template = require('art-template');
let httpReturn
let debug = true;

module.exports = {
    type:'list',
    async fetch({ args }) {
        // 隐藏启动页
        $prefs.set('showWelcome',false)
        if(debug) console.log('Loading.....')
        let form = args.form.split(";");
        console.log(args.header)
        // 通过 axios 访问网络并且获取数据
        // 因为在无网络的情况下基本无法使用整个插件，所以考虑不做异常捕捉
        httpReturn = await axios[form[0]||'get'](form[2],{
            headers:args.headers||{}
        });
        let data = httpReturn.data;
        // HTML 解析部分，没有完工
        if(form[1]=='html'){
            $ = require('cheerio').load(data);
            return $(args.itemSelect).map((index,item)=>{
                let cofing = {
                    __index:index
                };
                for (const key in args.dataSelect) {
                    const select = args.dataSelect[key].split('>');
                    let DOM = $(item)
                    select.forEach(_select=>{
                        DOM = DOM.children(_select)
                    })
                    cofing[key] = DOM.text()
                }
                if(debug)console.log(cofing);
                // 从下面开始的东西应该调用 makeCard() 去执行……
                function _template(t){
                    return template.render(t,cofing)
                }
                let card = {};
                card.style = args.style||'simple';
                [
                    ['image','',args.icon],
                    ['viewerCount','',''],
                    ['label','',''],
                    ['summary','',''],
                    ['title','','']
                ].forEach(_key=>{
                    let _key_1 = args[_key[1]||_key[0]]
                    card[_key[0]] = (_key_1)?_template(_key_1):_key[2]
                });
                // return makeCard({args,cofing,index});
                return card
            })
        }else if(form[1]=='json'){
            // JSON 解析模式，大多数情况下他们可以按照预期工作
            args.itemRoot.split('.').forEach(key=>{
                data = data[key]
            })

            if(debug){
                console.log(`Debug:输出数组成员 > ${data.length}`)
                console.log(data);
            }
            // Dora.js 标题设置为空，这样可以让顶栏好看一点，然而实际 1.9.0 并没有实际作用……
            // this.title=''

            return data.map((cofing,index)=>{
                return makeCard({args,cofing,index})
            });
        }
    }
}


function makeCard({args,cofing,index}){
    function _template(mod){
        return mod?template.render(mod,cofing):''
    }
    let card = {
        style:args.style||'list',
        author:{
            avatar:_template(args.author_avatar),
            name:_template(args.author_name)
        }
    };

    cofing.__index = index;

    [
        ['image',args.icon],
        ['viewerCount',''],
        ['label',''],
        ['summary',''],
        ['title','']
    ].forEach(key=>{
        let i = key[0]
        card[i] = _template(args[i])
    })

    // 转换点击执行或者长按执行
    let fun = $prefs.get('clickToGo')?'onClick':'onLongClick'
    if(args.schame) card[fun]=()=>{
        $router.to($route(_template(args.schame)))
    }
    else if(args.video) card[fun]=()=>{
        $router.to($route('video',{url:_template(args.video)}))
    }
    else if(args.url) card[fun]=()=>{
        $router.to($route('webview',{url:_template(args.url)}))
    }
    return card
}