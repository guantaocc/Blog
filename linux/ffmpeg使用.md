windows命令行 ffmpeg 使用

![image-20240515144020023](https://raw.githubusercontent.com/guantaocc/picgo/master/images/202405151440147.png)

> **FFmpeg**是一套开源多媒体视频处理工具集，在音视频流媒体领域有着举足轻重的作用，详细可以看维基百科[FFmpeg](https://zh.wikipedia.org/wiki/FFmpeg),本文主要介绍其命令行工具**ffmpeg**，整理出来一些常用命令方便查找使用。
>
> ## ffmpeg常用命令
> 通过`ffmpeg --help`可以看到ffmpeg常见的命令大概分为6个部分：
>
> * ffmpeg信息查询部分
> * 公共操作参数部分
> * 文件主要操作参数部分
> * 视频操作参数部分
> * 音频操作参数部分
> * 字幕操作参数部分
>
> ### 1. ffmpeg使用语法
> 命令使用: **ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...** **ffmpeg -i [输入文件名] [参数选项] -f [格式] [输出文件]** 参数选项详细见[官网](https://ffmpeg.org/ffmpeg.html#Generic-options)
>
> a) 通用选项
> b) 视频选项
> c)高级视频选项
> d)音频选项
> e)音频/视频捕获选项
> f)高级选项
> ### 2.常用场景
> #### 分离视频音频流
> ```
> ffmpeg -i input_file -vcodec copy -an output_file_video　　//分离视频流
> ffmpeg -i input_file -acodec copy -vn output_file_audio　　//分离音频流
> ```
>
> #### 视频解复用
> ```
> ffmpeg –i test.mp4 –vcodec copy –an –f m4v test.264
> ffmpeg –i test.avi –vcodec copy –an –f m4v test.264
> ```
>
> #### 视频转码
> ```
> ffmpeg -i test.mp4 -vcoder h264 -s 352*278 -an -f m4v test.264    //转码为码流原始文件
> ffmpeg -i test.mp4 -vcoder h264 -bf 0 -g 25 -s 352-278 -an -f m4v test.264    //转码为码流原始文件
> ffmpeg -i test.avi -vcoder mpeg4 -vtag xvid -qsame test_xvid.avi    //转码为封装文件 -bf B帧数目控制, -g 关键帧间隔控制, -s 分辨率控制
> ```
>
> #### 视频转封装
> ```
> ffmpeg -i video_file -i audio_file -vcoder copy -acodec copy output_file
> ```
>
> #### 视频剪切
> ```
> ffmpeg -i test.avi -r 1 -f image2 image.jpeg //视频截图
> ffmpeg -i input.avi -ss 0:1:30 -t 0:0:20 -vcoder copy -acoder copy output.avi //剪切视频 -r 提取图像频率， -ss 开始时间， -t 持续时间
> ```
>
> #### 修改视频帧率
> ```
> ffmpeg -i input.avi -r 24 output.avi  // 强制把输出视频文件帧率改为 24 fps:-r 帧率 
> ```
>
> #### 码率控制
> ```
> ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k -maxrate 2500k output.mp4//设置码率阈值
> ```
>
> #### 添加去除水印
> ```
> ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=0:H-h output.mp4// 添加右下角
>  ffmpeg -i output.mp4 -filter_complex "delogo=x=25:y=25:w=150:h=50" delogo.mp4
> ```
>
> #### 截图命令
> ```
> ffmpeg -i input_file -y -f image2 -t 0.001 -s 352x240 output.jpg //截取一张352x240尺寸大小，格式为jpg的图片
> ```
>
> #### 把视频的前30帧转换成一个Animated Gif
> ```
> ffmpeg -i input_file -vframes 30 -y -f gif output.gif
> ```
>
> #### 在视频的第8.01秒出截取230x240的缩略图
> ```
> ffmpeg -i input_file -y -f mjpeg -ss 8 -t 0.001 -s 320x240 output.jpg
> ```
>
> #### 每隔多少秒截一张图
> ```
> ffmpeg -i out.mp4 -f image2 -vf fps=fps=1 out%d.png
> ffmpeg -i out.mp4 -f image2 -vf fps=fps=1/20 out%d.png //每隔20秒截一张图
> ```
>
> #### 从视频中生成GIF图片
> ```
> ffmpeg -i out.mp4 -t 10 -pix_fmt rgb24 out.gif
> ffmpeg -ss 3 -t 5 -i input.mp4 -s 480*270 -f gif out.gif //视频截选指定长度的内容生成GIF图片
> ```
>
> #### 转换视频为图片（每帧一张图）
> ```
> ffmpeg -i out.mp4 out%4d.png
> ```
>
> #### 图片转换成视频
> ```
> ffmpeg -f image2 -i out%4d.png -r 25 video.mp4
> ```
>
> #### 切分视频并生成M3U8文件
> ```
> ffmpeg -i input.mp4 -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 20 -hls_list_size 0 -hls_wrap 0 output.m3u8
> ```
>
> #### 视频录制
> ```
> ffmpeg -i rtsp://hostname/test -vcoder copy out.avi
> ```
>
> #### 合并多个音视频文件为一个文件
> ```
> ffmpeg –i video_file –i audio_file –vcodec copy –acodec copy output_file  
> ```
>
> #### 转换成YUV原始文件
> ```
> ffmpeg -i input_file -vcodec rawvideo -an output_file_yuv
> ```
>
> #### 定时截取图片并输出成雪碧图
> ```
>  ffmpeg -y  -i chrome.mp4  -vf 'fps=1/5,scale=88x50,tile=100x1:padding=0:margin=0'  -an -vsync 0 sprites.png
> ```

##### 截取GIF图压缩

```
ffmpeg -ss 25 -t 10 -i ./a.mp4 -vf "scale=320:-1" -an -r 15 -f gif ./%03d.gif
```

#### 获取视频时长

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 a.mp4
```

