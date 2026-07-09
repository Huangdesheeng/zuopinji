const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// 创建 dist 目录
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 复制文件的函数
function copyFileSync(src, dest) {
  fs.copyFileSync(src, dest);
}

// 复制目录的函数
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// 要复制的文件和目录
const itemsToCopy = [
  'README.md',
  '黄德生作品集.html',
  '0224_元宵节.jpeg',
  '1.jpg', '2.jpg', '3.jpg', '4.png', '5.jpg', '6.jpg', '7.jpeg', '8.png',
  '5ff3e83e306f87d71680b14a5de1197c.jpg',
  '二维码.jpg', '头像2.jpg', '集合.jpg',
  'MMV', '作品集里的页面', '品牌简介', '品牌视觉的轮播图',
  '彩盒', '新添加', '无尘LOGO', '电商', '说明书'
];

console.log('开始构建...');

for (const item of itemsToCopy) {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(distDir, item);

  if (fs.existsSync(srcPath)) {
    if (fs.statSync(srcPath).isDirectory()) {
      console.log(`复制目录: ${item}`);
      copyDirSync(srcPath, destPath);
    } else {
      console.log(`复制文件: ${item}`);
      copyFileSync(srcPath, destPath);
    }
  } else {
    console.log(`跳过不存在的: ${item}`);
  }
}

// 创建 index.html 重定向页面
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=黄德生作品集.html">
    <title>黄德生作品集</title>
</head>
<body>
    <p>正在跳转到作品集...</p>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('创建 index.html 重定向页面');

console.log('构建完成！');
// 更新时间 Fri Jul 10 07:02:53     2026
