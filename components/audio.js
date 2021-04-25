const axios = $http||$axios||require("axios")
module.exports = {
  type: 'audio',
  async fetch({ args }){
      let audioUrl = args.url
      if(args.make){
          const html = (await axios.get(audioUrl,{
              header:args.make.header
          })).data
          audioUrl = html.match(new RegExp(args.make.url))[0]
        //   针对 凤凰FM 进行单独处理
          if(args.make.Referer == "http://m.fm.ifeng.com/"){
            audioUrl = eval(await axios.get("http://d.fm.renbenai.com/fm/read/fmd/public/getSignAudio.html?filepath="+encodeURIComponent(audioUrl)).data).data
          }
      }
      return {
          title:args.title,
          url:audioUrl,
          headers:args.make?args.make.header:{}
      }
  }
}