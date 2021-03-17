## 源开发文档

可以改配置项隐藏或显示本页面

接口更新时间：2021年3月16日

文档更新时间：2021年3月16日

**注意！**

当前版本没有开放输入第三方模板界面

如果有需要可以在插件源码的 index.js 中找到系统自带的模板

### JSON 接口

- showName

	侧边栏展示的名称


- style

	**可选** 直接传入 ````list```` 组件的 ````style```` ,默认为 ````simple````
	

- itemRoot

	在 JSON 数据中数组的根节点，如果遇到数字键不用输入方括号

	例如：````data.card.cardlist.0.hotword````

- listIconform

	放置用于在侧边栏展示图标的网站的域名，插件会通过域名获取根目录下 ````favicon.ico```` 文件
	
- form


	数据来源，需要且必须有 ````请求方式;数据格式;远程地址```` 三个值
	
	目前，请求方式可填入 ````get、delete、head、options````，数据格式目前仅支持 JSON 
	
	例如：````post;json;https://example.com/getFarmStat?uid=8848````
	
	
- headers

	**可选** 发送请求时一并发送的 ````HTTP Header````，必须是一个 ````JSON```` 对象
	

- 模板用法

	基于第三方模板引擎，可参考此文档 [https://aui.github.io/art- template/zh- cn/index.html](https://aui.github.io/art- template/zh- cn/index.html)
	
	不过，单行的文本渲染似乎不用那么多的模板用法，如果是变量，用双大括号 ````{{}}```` 包围起来就好了

	可以使用插件内提供的其他变量，如 ````__index````

	这些模板可以填写在 ````image,viewerCount,label,summary,title,schame,video,url```` 中使用（其他的暂未实现）

	如果需要使用 ````live```` 样式并填写 ````author.avatar```` 的话，可以填写源的````author_avatar```` 项
	

- schame
	
	**可选** 可以使用模板语法

	长按后可以实现跳转到指定的 APP 的神奇代码

	例如： ````bilibili://video/12345678```` 可唤醒哔哩哔哩客户端

	
- video

	**可选** 可以使用模板语法

	长按后可以播放与当前块相关的视频（使用 Dora.js 内置播放器）


- url

	**可选** 可以使用模板语法

	长按后可以跳转指定网页


- 系统内提供给模板的变量：

	（当前仅一个）	````__index```` 索引，从 0 开始的索引