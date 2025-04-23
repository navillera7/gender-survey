const API_URL = 'https://your-render-url.onrender.com'; // 나중에 실제 URL로 교체

document.getElementById('survey-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const gender = form.get('gender');
  await fetch(`${API_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gender }),
  });
  loadStats();
});

async function loadStats() {
  const res = await fetch(`${API_URL}/stats`);
  const data = await res.json();
  document.getElementById('total').textContent = data.total;
  document.getElementById('male').textContent = data.male;
  document.getElementById('female').textContent = data.female;
  document.getElementById('unknown').textContent = data.unknown;
}

window.onload = loadStats;
