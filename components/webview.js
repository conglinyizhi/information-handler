let clock;
module.exports = {
    type: 'webview',
    fetch({args}) {
        return {url:args.url}
    },
    onPageStarted(){
        clearTimeout(clock)
        $ui.toast('加载中……')
        clock = setTimeout(a=>{
            $ui.toast('服务器炸了？这么慢的？')
        },5000)
    },
    onPageFinished(){
        clearTimeout(clock)
    }
}