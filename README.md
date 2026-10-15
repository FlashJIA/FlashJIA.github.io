# Shucheng Jia — Personal Website

**Live site: https://flashjia.github.io/**

纯 HTML/CSS 静态网站，部署在 GitHub Pages（`main` 分支根目录）。

## 本地预览
直接双击 `index.html` 用浏览器打开即可。

## 文件结构
```
index.html                        首页（侧栏 + Bio / News / Publications / Projects / Education / Skills）
projects/se-cbf.html              SE-CBF 项目详情页
projects/dual-arm-tictactoe.html  双臂井字棋项目详情页
css/style.css                     全部样式
js/main.js                        视频悬停播放、Quick Links 高亮、邮箱防爬
images/                           头像、封面图、favicon.png（标签页图标）
images/logos/                     Education 里的校徽
videos/                           演示视频
files/                            CV（英文 / 中文，由 scripts/build-cv.sh 生成）
scripts/build-cv.sh               从 LaTeX 简历生成去掉手机号的网站版 CV
```

## 放视频 / 图片
`media-box` 里 `data-img` / `data-video` 指定的文件存在就会自动显示，不存在时显示斜纹占位框并标出应放的文件名。

视频建议：静音、5–15 秒、720p、每个 < 10 MB（GitHub 单文件上限 100 MB）。压缩命令：
```
ffmpeg -i input.mov -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart output.mp4
```

## 更新 CV
只改投递用的两份简历（带手机号）：
- 英文：`简历/英文简历/latex/Shucheng_JIA.tex`
- 中文：`简历/中文简历/latex/贾澍成.tex`

然后运行下面的脚本，它会去掉手机号、编译，并生成网站上的 `files/Shucheng_Jia_CV.pdf`（英文）和 `files/Shucheng_Jia_CV_zh.pdf`（中文）：
```
./scripts/build-cv.sh
```
如果手机号没删干净，脚本会直接报错退出，不会生成 PDF。

## 更新网站
```
git add . && git commit -m "update" && git push
```
推送后 1–2 分钟生效。
