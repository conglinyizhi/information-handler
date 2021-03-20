let url = require('url')
module.exports = {
  type: 'drawer',
  async fetch({ args, page }) {
    // __index 数组索引
    let hotwordIndex = (await $http.get($prefs.get("url"))).data.data
    return ($prefs.get('showWelcome') ? [{ title: '首页 - index', route: $route('indexView/index') }] : []).concat(hotwordIndex.map(cofing => {
      return {
        title: cofing.showName,
        route: $route('page', cofing),
        image: `http://${url.parse(cofing.listIconform || cofing.form.split(';')[2]).hostname}/favicon.ico`
      }
    }))
  }
}
