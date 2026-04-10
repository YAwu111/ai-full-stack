# AIGC

- AIGC
    生成式的人工智能
    - 生成文本 gpt-3.5-turbo-instruct
    - 生成图片 dall-e-2

- 安装了dotenv,openai的package
    如何优化
    已经安装过了如何去不需要重复安装
    更快更节省空间
    pnpm 代替npm
    **pnpm**（Performant npm）是一款**速度极快、极度节省磁盘空间**的 Node.js 包管理器，通过**内容寻址存储 + 硬链接/符号链接**机制，解决了传统 npm/yarn 的依赖冗余与“幽灵依赖”问题，且完全兼容 npm 生态。
    - npm init -y
    初始一个后端环境 package.json 项目描述文件
    - pnpm i dotenv openai
    - node main.mjs
    node 以命令行运行main.mjs
    main.mjs 单点入口 方便管理
    mjs 模块化的js | import form 导入模块
    程序运行后,将是一个独立的经常(process)
    进程是分配资源的最小单位
    前端是document , 后端是process
    oricess.env 环境变量 配置或参数
- dotenv
    读取了.env 文件里的内容添加到process.env 环境变量


## Prompt 提示词

- 提示LLM,写一段话,用聊天的方式给LLM下达指令
- 如果你要让大模型帮我们执行复杂的任务,精心设计Prompt

## Prompt Engineering 提示工程
- 设计出合理的Prompt ， 才能让大模型按照我们的意图执行任务
- 提示工程是一个迭代的过程， 不断优化Prompt ， 才能得到我们期望的结果
- 有时候，LLM 性能不太牛x的时候，提示词也许可以独挡一面
- 提示词的编写上升到工程的角度，有些AI项目的核心就是几段提示词

## 数据分析