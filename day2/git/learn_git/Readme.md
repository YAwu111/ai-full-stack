# learn_git 

- 同一个项目中不能有多个git 仓库
    管理代码, 不能有多个仓库，
- git 加入前
    - 开发目录
    - 代码仓库 git init
    添加.git 隐藏仓库
    默认创建master分支
    管理文件的不同版本
    大型项目,多人协作
-git status
 查看仓库状态 非常基础且重要的命令,在任何决定前
 都建议用这行命令来了解仓库
 尚未提交,不在仓库
 未跟踪的文件,不在暂存区中
 git add Reamde.md 添加导暂存区(stage)
 git comit (-a) -m 'wrote a readme file' 提交到仓库 一定要根据功能,表达好.
 - 提交到仓库当前(master)分支,又一个唯一ID(sha算法,唯一的长窜)
    为什么不用自增ID?       git 仓库是一个多人协作,自增ID容易出问题
    hashID 唯一
    insertions ? 新增行数
    加入仓库的是文件的修改,生成的是文件的新的版本
- git diff file_name 查看代码和仓库的差异
  重大提交前,先diff查看差异
- 干净 
- 67f85b8 (HEAD -> master) append GPL
  HEAD 指针 指向当前分支的最新提交
  移动指针去穿越
- 版本回退
  git reset --hard HEAD^
  HEAD 表示当前指针 ^表示向前回退一个版本(^num num表示回退几个版本,也可以输入版本号，来回退特定的版本号)
- git checkout -- filename
  file_name文件在工作区的修改全部撤销
Git is a distributed version control system.
Git is free software distributed under th GPL. //Git遵循的是GPL协议
Git has a mutable index called stage.
Git tracks changes of files.
My stupid boss still prefers SVN.