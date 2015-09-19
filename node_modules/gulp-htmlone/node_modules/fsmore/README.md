# fsmore @ 1.0.0

utils of [Nodejs FileSystem](http://nodejs.org/api/fs.html)

## Apis

+ `mkdirSync(path)` 生成多级目录，类似mkdirp
+ `rmdirSync(path)` 删除多级目录
+ `getAllFolersAndFiles(path)` 获取指定目录下的所有 目录 和 文件
+ `getAllFiles(path)` 获取指定路径下的所有文件
+ `download(url, destPath, callback)` 下载一个文件至指定路径
+ `copyFile(from, to, callback)` 拷贝文件
+ `getFilesizeInBytes(filepath)` 获取文件size