const fs = require('fs'),url = require('url'),$url = $prefs.get("url");
let hotwordIndex

module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    // 尝试支持切换本地源
    let View = [{ title: '曾经的首页 - index', route: $route('indexView/index')}];
    let D = await this.indexArray()
    console.log(typeof D)
    return View.concat(D.map(cofing => {
      let tmp
      if(cofing.listIconform){
        tmp = url.parse(cofing.listIconform)
      }else{
        tmp = url.parse(cofing.form.split(';')[2])
      }
      return {
        title: cofing.showName,
        route: $route(cofing.model ? 'morepage' : 'page', cofing),
        image:`http://${url.parse(tmp).hostname}/favicon.ico`,
        summary:tmp.hostname
      }
    }))
  },async indexArray(){
    // 用于获取源，通过三元运算符判断拉取本地源还是远程源
    hotwordIndex = (!$url) ? JSON.parse(fs.readFileSync(`assets/localdata.json`, 'utf-8')) : (await $http.get($url)).data
    let power = [];
    hotwordIndex.data.forEach(item=>{
      if(typeof item.menulist == 'object'){
        for(const index of Object.keys(item.menulist)){
          let line = clone(item)
          line.showName += ` - ${index}`
          line.form += `;${item.menulist[index]}`
          for(const model of Object.keys(item.model)){
            line[model]=item.model[model]
          }
          power.push(line)
        }
      }else{
        power.push(item)
      }
    })
    return power
  }
}
