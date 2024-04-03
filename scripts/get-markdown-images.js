/**
 * 提取一些markdown中的图片并保存
 */

const marked = require('marked');
const cheerio = require('cheerio');
const download = require('download')
const fs = require('fs')
const path = require('path')

// 你的 Markdown 内容
const markdownText = fs.readFileSync('../JavaScript/正则表达式.md', 'utf-8').toString();

// 使用 marked 库将 Markdown 转换为 HTML
const html = marked.parse(markdownText);

// 使用 cheerio 加载 HTML
const $ = cheerio.load(html);

// 提取图片链接
const imageLinks = [];
$('img').each((index, element) => {
    const src = $(element).attr('src');
    imageLinks.push(src);
});

// 打印图片链接
console.log('图片链接：', imageLinks);

(async () => {
  // 下载文件
  for(let url of imageLinks){
    const basename = path.basename(url).replace('?', '')
    // fs.writeFileSync(`../JavaScript/screenshots/${basename}.png`, await download(url))
    await download(url, '../JavaScript/screenshots', {
      filename: `${basename}.png`
    });
  }
})();