let url = require('url')
module.exports = {
  type: 'drawer',
  async fetch({ args, page }) {
    // __index 数组索引
    let hotwordIndex = (await $http.get($prefs.get("url"))).data.data
    // let hotwordIndex = [
    //   {showName:'微博热搜',itemRoot:'data.cards.0.card_group',title:'[{{__index}}]{{desc}}',summary:'热度：{{desc_extr||"置顶"}}',image:'{{icon||pic}}',icon:$icon('info','#66ccff'),url:'{{scheme}}',form:'get;json;https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot'
    //   },{
    //     // https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true
    //     showName:'知乎热榜',itemRoot:'data',title:'[{{__index+1}}]{{target.title}}',summary:'{{target.excerpt}}',form:'get;json;https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true',url:'{{target.url.split("api.zhihu.com/questions").join("www.zhihu.com/question")}}'
    //   }
    //   ,{showName:'抖音热词',itemRoot:'word_list',title:'[{{__index + 1}}] {{word}}',summary:'热度：{{hot_value}}',image:'',icon:$icon('info','#66ccff'),form:'get;json;https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/'
    //   },{showName:'抖音视频',itemRoot:'aweme_list',title:'[{{__index+1}}] 热度：{{hot_value}}',summary:'{{aweme_info.desc}}',label:'上传用户：{{aweme_info.author.nickname}}',image:'{{aweme_info.video.cover.url_list[0]}}',style:'vod',icon:$icon('info','#66ccff'),video:'{{aweme_info.video.play_addr.url_list[0]}}',form:'get;json;https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/aweme/'
    //   },{showName:'BiliBili 原创热榜',listIconform:'https://www.bilibili.com',itemRoot:'data.list',title:'名次：{{__index + 1}}播放数：{{play}}',label:'{{author}}',image:'{{pic}}',viewerCount:'{{play}}',style:'live',author_avatar:'',author_name:'{{title}}',icon:$icon('info','#66ccff'),schame:'bilibili://video/{{aid}}',form:'get;json;https://api.bilibili.com/x/web-interface/ranking?rid=0&day=3&type=2&arc_type=0'
    //   },{
    //     showName:'豆瓣电影',
    //     style:'vod',
    //     itemRoot:'subject_collection_items',
    //     title:'[{{__index + 1}}] {{type_name}} - {{title}}',
    //     summary:'{{info}}',
    //     label:'{{year}}',
    //     image:'{{cover.url}}',
    //     url:'{{url}}',
    //     form:'get;json;https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items?start=0&count=50&items_only=1&for_mobile=1',
    //     headers:{
    //       referer:'https://m.douban.com/pwa/cache_worker',
    //       host:'m.douban.com'
    //     }
    //   },{
    //     showName:"百度视频热搜",
    //     form:'get;json;https://haokan.baidu.com/videoui/api/hotwords?sfrom=pc',
    //     itemRoot:'data.response.hotwords',
    //     title:'[{{__index+1}}] - {{title}}',
    //     summary:'热度：{{hot_num}}'
    //   }
      /* },{
  showName:'maoyan.com',
  itemSelect:'.list-wrap >.item',
  dataSelect:{
    name:`.mb-outline-b.content-wrapper >.column.content >.box-flex.movie-title >.title`,
    score:`.mb-outline-b.content-wrapper > .column.content > .detail.column > .score.line-ellipsis`,
    actor:`.mb-outline-b.content-wrapper >.column.content >.detail.column >.actor.line-ellipsis`,
    showInfo:`.mb-outline-b.content-wrapper > .column.content > .detail.column > .show-info.line-ellipsis`
  },
  title:'[{{__index + 1}}] {{name}} - {{score}}',
  summary:'{{showInfo}} {{actor}}',
  icon:$icon('info','#66ccff'),
}
},{
  showName:'搜狗',
  itemRoot:'data.dream',
  title:'item.list',
  summary:'item.dream',
  image:'${pic}',
  icon:$icon('info','#66ccff'),
  isArray:true,
  form:'json;sklafjakljdfasjfkajjkaslfk.json'
}*/
    // ]
    return ($prefs.get('showWelcome')?[{title:'首页 - index',route:$route('indexView/index')}]:[]).concat(hotwordIndex.map(cofing=>{
      return {
        title:cofing.showName,
        route:$route('page',cofing),
        image:`http://${url.parse(cofing.listIconform||cofing.form.split(';')[2]).hostname}/favicon.ico`
      }
    }))
  }
}
