git is version control system (local and remote "github")
1 - download git & install
2 - config userName & email 
>git config  --global user.name "mustafa"
>git config  --global user.email "email"
3 - show userName & email
>git config user.name 
>git config user.email
>git config list 
4- show git command 
>git 
5 - repositry local & remote 
6- create repo 
>git init "repo name"
7 - show git status 
>git status 
8 - create file in repo 
>touch "file name "
-------
9 - to commit file in repo 
>git add "file1 name" file2 name
>git commit -m "message"
10 - show all logs on repo 
>git log 
11 - remove last commit 
>git chechout commit_id 

12 - show branches 
> git branch 
13 - create new branch 
> git branch branch_name 
14 - work with branch 
>git checkout branch_name

15 - merge branch with master branch 
> git merge branch_name master

-------------------------------------
16 - show links with remote repos 
>git remote -v
17 - linking between local repo with remote repo 
>git remote add origin url_of_remote_repo

18 - push from local repo to remote repo 
>git push -u origin master 

19 - pull from remote repo to local repo 
>git pull origin master

-----------------------------
15 - take copy of gitub repo with fork it 




