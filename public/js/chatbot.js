const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const suggestionsDiv = document.getElementById('suggestions');

// Hàm hiển thị tin nhắn
function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Gửi tin nhắn
sendBtn.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  userInput.value = '';
  userInput.disabled = true;
  sendBtn.disabled = true;

  appendMessage('Đang xử lý...', 'bot');

  try {
    const res = await fetch('http://localhost:3000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) throw new Error('Lỗi server');

    const data = await res.json();

    const loadingMsg = chatMessages.querySelector('.message.bot:last-child');
    if (loadingMsg) chatMessages.removeChild(loadingMsg);

    appendMessage(data.reply || 'Không nhận được phản hồi.', 'bot');
  } catch (error) {
    const loadingMsg = chatMessages.querySelector('.message.bot:last-child');
    if (loadingMsg) chatMessages.removeChild(loadingMsg);

    appendMessage('Lỗi kết nối đến máy chủ.', 'bot');
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }
});

// Gửi bằng phím Enter (Shift+Enter xuống dòng)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Xử lý gợi ý nhanh
suggestionsDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const text = e.target.textContent;
    userInput.value = text;
    userInput.focus();
  }
});

function redirectToHome() {
  window.location.href = "Home.html";
}
