// document 文档对象 顶级的 dom树
//dom 事件监听
const panels = document.querySelectorAll('.panel');
// JS 中除了string number boolean uderfined null都是对象
// console.log(panels,
//     panels[0],
//     typeof panels[0], // typeof无法获取具体类型
//     Object.prototype.toString.call(panels[0]) // 获取具体数据类型
// );
panels.forEach(function(panel){
    console.log(panel);
    panel.addEventListener('click',function(){
        const cur = document.querySelector('.active');
        if(cur){
            cur.classList.remove('active');
            cur.classList.add('remove');
        }
        panel.classList.remove('remove');
        panel.classList.add('active');
    })
})
