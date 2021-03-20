module.exports = {
    type: 'topTab',
    tabMode: 'auto',
    async fetch({ args }) {
        // 例行提示
        if(!$prefs.get('closeMessage') && args.message && !args.gotodebug){
            $ui.toast(args.message)
        }
        // 构建 page.js 需要的 args
        let View = []
        for (const key in args.menulist) {
            let card = clone(args.model);
            card.form = `${args.form};${args.menulist[key]}`;
            console.log(card)
            View.push({
                title:key,
                route:$route('page',card)
            })
        }
        return View
    }
}