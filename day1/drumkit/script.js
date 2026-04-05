document.addEventListener('DOMContentLoaded',function(){
    // 添加监听器
    // script文件应该放在文件底部
    // script会阻塞html加载
    function playSound(event){
        // console.log(event.keyCode,'////////////');
        let dataCode = event.keyCode;
        let element = document.querySelector('.word[data-key="'+dataCode+'"]');
        console.log(element); 
        // 动态DOM编程
        element.classList.add('playing');
    }
    
    window.addEventListener('keydown',playSound);
}
);