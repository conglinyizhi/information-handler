module.exports = {
    type: 'topTab',
    tabMode: 'auto',
    async fetch({ args }) {
        // 例行提示
        if(!$prefs.get('closeMessage') && args.message && !args.gotodebug){
            this.type = "list";
            return [{title:args.message,summary:"确定继续使用，请点击我\n\n若不希望再次看到这种提示，请长按，我们会永久隐藏他（除非您从配置项中再次启用）",
            onClick:GoinDebug,onLongClick($item){
                $prefs.set('closeMessage',true)
                GoinDebug()
            }}]
        }
        // 构建 page.js 需要的 args
        let View = []
        for(let key in args.menulist){
            const value = args.menulist[key];
            let card = args.model;
            card.form += `;${value}`;
            View.push({
                title:key,
                route:$route('page',card)
            })
            console.log(card)
        }
        return View
    }
}