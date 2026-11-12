async function getPosts() {
  const res = await fetch('posts/posts.json', { cache: 'no-cache' });
  const posts = await res.json();
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

async function renderList() {
  const ul = document.getElementById('post-list');
  try {
    const posts = await getPosts();
    if (!posts.length) { ul.innerHTML = '<li class="empty">还没有文章，在 posts/ 里加一篇吧。</li>'; return; }
    ul.innerHTML = posts.map(p => `
      <li>
        <a href="post.html?slug=${encodeURIComponent(p.slug)}">
          <time datetime="${p.date}">${p.date}</time>
          <span class="t">${p.title}</span>
          <span class="tags">${(p.tags || []).join(' / ')}</span>
        </a>
      </li>`).join('');
  } catch (e) {
    ul.innerHTML = '<li class="empty">文章列表加载失败，请检查 posts/posts.json。</li>';
  }
}

async function renderPost() {
  const slug = new URLSearchParams(location.search).get('slug');
  const title = document.getElementById('title');
  const meta = document.getElementById('meta');
  const content = document.getElementById('content');
  try {
    const posts = await getPosts();
    const post = posts.find(p => p.slug === slug);
    if (!post) throw new Error('not found');
    const md = await (await fetch(`posts/${post.slug}.md`, { cache: 'no-cache' })).text();
    document.title = `${post.title} · Deyi`;
    title.textContent = post.title;
    meta.textContent = [post.date, ...(post.tags || [])].join('  ·  ');
    content.innerHTML = marked.parse(md);
  } catch (e) {
    title.textContent = '找不到这篇文章';
    content.innerHTML = '<p><a href="index.html#posts">回到文章列表</a></p>';
  }
}
