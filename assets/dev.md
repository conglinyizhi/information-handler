## 源开发文档

***可以改配置项隐藏或显示本页面***

接口更新时间：2021年3月26日

文档更新时间：2021年3月26日

**注意！**

当前版本没有开放输入第三方模板界面

如果有需要可以在插件源码的 index.js 中找到系统自带的模板

### 范例源

````JSON
{
	"message":"更新了 API，可能无法正常使用",
	"showName":"今日热点",
	"form":"get;html;https://tophub.today/n/WnBe01o371",
	"itemRoot":".Zd-p-Sc > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) tr",
	"title":"{{__index+1}} - {{title}}",
	"url":"https://tophub.today{{link}}",
	"string":{
		"title":{
			"selector":"td.al a[href]",
			"get":"text"
		},
		"link":{
			"selector":"td.al a[href]",
			"get":"attr",
			"attr":"href"
		}
	}
}

````


### 相关接口使用方法

- reverse

	布尔值，是否把结果颠倒，~~这是我们在追更罗小黑的时候想到的功能~~

- message

	**可选** 一行用于阻止用户无意访问源导致的框架崩溃，请在这里填写足够劝说普通用户的语言，不过用户可以将其关闭

- showName

	侧边栏展示的名称


- style

	**可选** 直接传入 ````list```` 组件的 ````style```` ,默认为 ````simple````
	

- itemRoot

	在 JSON 数据中数组的根节点，如果遇到数字键不用输入方括号

	例如：````data.card.cardlist.0.hotword````

	**如果是在 ````get;html;*```` 返回的数据，需要输入 CSS 选择器**

- listIconform

	放置用于在侧边栏展示图标的网站的域名，插件会通过域名获取根目录下 ````favicon.ico```` 文件
	
- form


	数据来源，需要且必须有 ````请求方式;数据格式;远程地址```` 三个值
	
	目前，请求方式可填入 ````get、delete、head、options````，数据格式目前仅支持 JSON 和 html
	
	例如：````post;json;https://example.com/getFarmStat?uid=8848````

	当数据格式为 html 时，需要在 ````itemRoot```` 中输入 CSS 选择器
	
	
- headers

	**可选** 发送请求时一并发送的 ````HTTP Header````，必须是一个 ````JSON```` 对象
	

- 模板用法

	基于第三方模板引擎，可参考此文档 [https://aui.github.io/art-template/zh-cn/index.html](https://aui.github.io/art-template/zh-cn/index.html)
	
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

	长按后可以播放与当前块相关的视频（使用 ````Dora.js```` 内置播放器）


- url

	**可选** 可以使用模板语法

	长按后可以跳转指定网页


- 系统内提供给模板的变量：

	（当前仅一个）	````__index```` 索引，从 0 开始的索引

	（html 独有） `````string````` 中的每一个成员都会在配置中组成一个变量供模板使用

- string(html 独有)

	当 ````form```` 的数据模式为 ````html```` 才需要留意的选项，这是一个 ````JSON```` 对象，里面目前可以包括 ````selectorn,get,attr````

	````selectron```` 中请填写一个 ````CSS```` 选择器，用于从每个符合 ````itemRoot```` 的节点的后代中查找需要的目标

	````get```` 目前只有两个值：````text,attr````

	当 ````get```` 为 ````text```` 时，获取目标节点中的所有文字，未来版本可能会处理空格

	当 ````get```` 为 ````attr```` 时，获取目标节点的属性（例如 ````a```` 标签的 ````href```` 属性）


### 网络接口

如果希望自行搭建一个接口来自己制作接口，可以使用 ````Node```` 等软件搭建一个服务器，返回一个 ````JSON```` 对象，我们只用到其中的一个参数，````data````，里面有一个数组，数组中的每个对象都是一个源，不过我们仍然建议您不要同时放置超过 ````10```` 个源