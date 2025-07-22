const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
let books = JSON.parse(localStorage.getItem('books')) || [];

function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${book.title}</strong> - ${book.author}</span>
                    <span class="actions">
                      <button class="edit" onclick="editBook(${index})">Edit</button>
                      <button onclick="deleteBook(${index})">Hapus</button>
                    </span>`;
    bookList.appendChild(li);
  });
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  if (title && author) {
    books.push({ title, author });
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    bookForm.reset();
  }
});

function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

function editBook(index) {
  const book = books[index];
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  books.splice(index, 1);
}

renderBooks();
const statusIndicator = document.getElementById('status');

function updateOnlineStatus() {
  if (navigator.onLine) {
    statusIndicator.textContent = '🟢 Online';
    statusIndicator.className = 'online';
  } else {
    statusIndicator.textContent = '🔴 Offline';
    statusIndicator.className = 'offline';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Set awal
