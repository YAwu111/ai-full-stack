# css 超级开发 stylus

- 更快的 css
    css 的rules 组成了 css file
    选择器 {} :;  可以做到省略
    .card{
        width:45px;
        height:45px;
    }
- stylus css 超级工具
    npm i -g stylus
- Stylus是一款高效的CSS预处理器，以极简语法、灵活变量、混合宏、嵌套等特性，大幅简化CSS编写，支持编译为标准CSS，提升样式开发效率与可维护性。 
    浏览器只能解析css,stylus是一种预处理器,所以需要编译成成css
- 编译脚本 
    stylus style.styl -o style.css
    边写边编译
    stylus style.styl -o style.css -w

- 弹性布局
    - display:flex ; 弹性格式化上下文
    - 移动端布局核心
    - 父子(们) 一起的一种布局方案
    - 子元素块级能力丢失
    - 子元素块级能力丢失,不会换行,多列布局？
    - justify-content(默认) align-items(默认)
        flex 专用
        默认 flex-direction row | Column
        justify-content 主轴对齐
        align-items 侧轴对齐
    子元素们设置了flex 1等比例分配空间
    &.active 这个嵌套是和上级是同一级别 是.panel的一个状态

- transition 过渡动画
    比animation 简单,没有keyframes,属性的改变添加过渡效果
    transion all 700ms ease-in
    all 任何属性的改变
    700ms 过渡时间 transition-duration
    ease-in 过渡效果 transition-timing-function
    transition opacity 300ms ease-in 400ms
    transition-delay 延迟时间

- @media (max-width: 480px) 
    媒体查询 响应式布局
    iPhone 414px
    max-width 480px 查询条件
    对特定设备的适配

- stylus 增强了 css 的编程性
    - 嵌套
    带来了模块化的能力
    作用域
    自动添加前缀
