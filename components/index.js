module.exports = {
  type: 'bottomTab',
  async fetch({ args, page }) {
    // $ui.toast("测试版首页已经启动")
    return [{
        title:"信息流",
        route:$route('newIndex/pageList'),
        image:$icon('web','black')
    },{
      title:"重游故地",
      route:$route("old_index"),
      image:$icon('home','black')
    }]
  }
}
