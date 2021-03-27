module.exports = {
    type: 'topTab',
    tabMode: 'auto',
    async fetch({ args }) {
        // 构建 page.js 需要的 args
        let View = []
        for (const key in args.menulist) {
            let card = clone(args.model);
            // 深度复制代码在 /main.js
            card.form = `${args.form};${args.menulist[key]}`;
            card.message = args.message
            console.log(card)
            View.push({
                title:key,
                route:$route('page',card)
            })
        }
        this.tabMode = (View.length<5)?"fixed":"scrollable"
        return View
    }
}