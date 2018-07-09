// 把code写到#code和style标签里面
function writeCss(prefix,code,fn){
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n),Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n >= code.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },60)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },40)
}

var css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 来一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 在加上一个呼吸效果吧 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 好了现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 下面我就可以在白纸上写字了，请看右边 */
`


var css2 = `
/*
 * 接下来把 Markdown 变成 HTML
 */
`
var md = `
## 自我介绍

我叫 XXX
1999 年 12 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

## 技能介绍

熟悉 JavaScript CSS

## 项目介绍

1. 苹果风格的轮播
2. 个人简历
3. Canvas画板

## 联系方式

* QQ 1658965923
* Email 1658965923@qq.com
* 手机 18437767656
`


let css3 = `
/*
 * 好了
 * 这就是我的会动的简历
 * 加载完毕，谢谢观看
 */
`

writeCss('', css1, ()=>{ 
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCss(css1, css2, ()=>{
          convertMarkdownToHtml(()=>{
            writeCss(css1 + css2, css3, ()=> {
            })
          })
        })
      })
    })
  })
  

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function convertMarkdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}


