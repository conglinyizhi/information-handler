const fs = require('fs'),url = require('url')
module.exports = {
  type: 'drawer',
  async fetch({ args, page }) {
    const $url = $prefs.get("url");
    // 尝试支持切换本地源
    const hotwordIndex = (!$url) ? JSON.parse(fs.readFileSync(`assets/localdata.json`, 'utf-8')) : (await $http.get($url)).data
    let View = [];
    if ($prefs.get('showWelcome')) View.push({ title: '首页 - index', route: $route('indexView/index') })
    console.log(hotwordIndex.data)
    return View.concat(hotwordIndex.data.map(cofing => {
      return {
        title: cofing.showName,
        route: $route(cofing.model ? 'morepage' : 'page', cofing),
        image: `http://${url.parse(cofing.listIconform || cofing.form.split(';')[2]).hostname}/favicon.ico`
      }
    }))
  }
}
