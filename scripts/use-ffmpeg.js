const { execSync} = require('child_process')
const path = require('path')

try {
  const totalTime = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 E:\\新建文件夹\\peg-picture\\a.mp4`)
  // console.log(totalTime.toString('utf-8'));
  const times = parseInt(totalTime.toString('utf-8'))
  // 每隔 1分钟 生成一个 gif 图
  const m = parseInt(times / 60)
  let current = 0
  while(current <= m){
    let start = current * 60 
    execSync(`ffmpeg -ss ${start} -t 60 -i E:\\新建文件夹\\peg-picture\\a.mp4 -vf "scale=320:-1" -an -r 15 -f gif E:\\新建文件夹\\peg-picture\\${current}.gif`)
    ++current
  }
  console.log('=========执行完成==========');
} catch (error) {
  console.log(error);
}