const fs = require('fs');
const path = require('path');

// 直接在根目录创建 index.html
console.log('开始构建...');

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

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
console.log('创建 index.html 重定向页面');

console.log('构建完成！');
