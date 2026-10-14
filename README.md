# Shucheng Jia — Personal Website

纯 HTML/CSS 静态网站，不用安装任何东西，部署在 GitHub Pages。

## 本地预览
直接双击 `index.html` 用浏览器打开即可。

## 文件结构
```
index.html                    首页（侧栏 + Bio / News / Publications / Projects / Education / Skills）
projects/se-cbf.html          SE-CBF 项目详情页
projects/dual-arm-tictactoe.html  双臂井字棋项目详情页
css/style.css                 全部样式
js/main.js                    视频悬停播放、Quick Links 高亮、邮箱防爬
images/                       图片（头像、封面图）
videos/                       演示视频
files/                        CV PDF
```

## 放视频 / 图片
文件名对上就会自动显示；文件不存在时页面显示斜纹占位框，并标出应放的文件名。

| 位置 | 文件 |
|---|---|
| 首页右上大照片 | `images/hero.jpg` |
| CoDance | `videos/codance.mp4`（封面 `images/codance.jpg`，可选） |
| SE-CBF ✅ | `videos/se-cbf.mp4`（首页）、`se-cbf-intersection.mp4`、`se-cbf-single.mp4`、`se-cbf-real.mp4` |
| 井字棋 ✅ | `videos/tictactoe.mp4`、`videos/tictactoe-gazebo.mp4` |
| 软体手 | `videos/pneumatic-hand.mp4` |
| CV | `files/Shucheng_Jia_CV.pdf` |

视频建议：静音、5–15 秒、720p、每个 < 10 MB（GitHub 单文件上限 100 MB）。压缩命令：
```
ffmpeg -i input.mov -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart output.mp4
```

## 发布前要填的 TODO
页面上黄色高亮的都是待填项，另外：
- `YOUR_USERNAME` → 你的 GitHub 用户名（`index.html` 两处）
- 两篇论文的完整作者列表、SE-CBF 的 paper / code 链接、CoDance 的 project page / video 链接
- 详情页里灰色按钮（`btn disabled`）有链接后删掉 `disabled` 并填 `href`

## 部署到 GitHub Pages
1. 在 GitHub 新建仓库，名字必须是 `<用户名>.github.io`，Public。
2. 在本文件夹里：
   ```
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<用户名>.github.io.git
   git push -u origin main
   ```
3. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支 `main` / `root`。
4. 一两分钟后访问 `https://<用户名>.github.io`。

以后改了内容：`git add . && git commit -m "update" && git push`。
