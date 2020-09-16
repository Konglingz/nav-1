const $siteList = $(`.siteList`)
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'Y', url: 'https://y.qq.com' },
    { logo: 'B', url: 'https://bilibili.com' },
]


const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //正则
}

const render = () => {
    $siteList.find('li:not(.last)').remove()     //移除之前已经 render 过的li
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cha"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)

    $li.on('click',()=>{
        window.open(node.url)
    })

    //阻止冒泡事件
    $li.on('click', '.close', (e) => {
        e.stopPropagation()
        hashMap.splice(index , 1)
        render()
    })
})
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('输入你想添加的网址：')
        if (url.indexOf('http') !== 0) {
            url = `https://` + url
        }

        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url
        })

        console.log(hashMap);

        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress',(e)=>{
    const {key} = e 
    // 等价于key = e.key 

    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLocaleLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})