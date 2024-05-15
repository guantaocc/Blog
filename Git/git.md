# git

## git命令整合

### git回退处理



```
git log --all
git reset --hard <commit_hash>
git reset --soft <commit_hash>
```

git reset --hard是不可逆的操作，它会重置工作目录和索引到指定的状态，并清除所有当前的更改

