# Deyi's Blog

纯静态博客，无需构建，直接部署到 GitHub Pages。

## 部署
1. 在 GitHub 新建仓库（想要 `https://用户名.github.io` 的话，仓库名必须是 `用户名.github.io`）
2. 把本目录所有文件推上去
3. 仓库 Settings → Pages → Source 选 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`

## 写文章
1. 在 `posts/` 新建 `my-post.md`（Markdown）
2. 在 `posts/posts.json` 加一条：
   `{ "slug": "my-post", "title": "标题", "date": "2026-11-12", "tags": ["标签"] }`
3. commit & push

## 本地预览
`python3 -m http.server`，然后打开 http://localhost:8000
（直接双击 html 文件会因为浏览器限制读不到 posts.json）

## 需要改的地方
- `index.html`：GitHub 链接、关于我、邮箱、tagline
- `assets/style.css` 顶部的 `:root`：配色和字体
