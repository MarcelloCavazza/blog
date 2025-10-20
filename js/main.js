const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('dark', currentTheme === 'dark');

if (themeToggle) {
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

const container = document.getElementById('posts-container');
if (container) {
  const renderPosts = (filter = "") => {
    container.innerHTML = "";
    const filtered = posts.filter(p =>
      p.title.toLowerCase().includes(filter.toLowerCase()) || p.description.toLowerCase().includes(filter.toLowerCase()) 
    );
    filtered.forEach(post => {
      const div = document.createElement('div');
      div.className = 'post-card';
      div.innerHTML = `
        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
        <div>
          <h2>${post.title}</h2>
          <p class="date">${post.date}</p>
          <p>${post.description}</p>
          <a href="post.html?post=${post.slug}">Read more →</a>
        </div>
      `;
      container.appendChild(div);
    });
  };

  renderPosts();

  document.getElementById('search').addEventListener('input', e => {
    renderPosts(e.target.value);
  });
}
