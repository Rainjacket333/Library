const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === "true";
    this.id = crypto.randomUUID();
  }
}

const form = document.querySelector('#bookForm');

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newBook = new Book(data.title, data.author, data.pages, data.read);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    window.location.href = "library.html"; 
  });
}

const container = document.querySelector('#container');

if (container) {
  
  myLibrary.forEach(book => {
    addToPage(book);
    
    function addToPage(newBook) {
  const bookElement = document.createElement("div");
  const stringified = JSON.stringify(newBook);
  const removed = stringified.replace(/[\[\]"]/g, '');
  const spaced = removed.replace(/,/g, '   ');
  bookElement.textContent = spaced;
  bookElement.style.backgroundColor = "blue";
  bookElement.style.justifySelf = "center";
  bookElement.style.alignContent = "center";
  bookElement.style.padding = "20px";
  bookElement.style.height= "50px";
  container.append(bookElement);

  const button = document.createElement('button');
  button.textContent = "Remove";
  button.style.height = "25px";
  button.style.width = "100px";
  button.style.alignSelf = "center";
  button.style.justifySelf = "center";
  container.append(button);

  const label = document.createElement ('label');
  label.htmlFor = "isRead";
  label.style.justifySelf = "center";
  container.append(label);

  const labelText = document.createTextNode("Read?");
  label.appendChild(labelText);

  const checkRead = document.createElement ('input');
  checkRead.type = "checkbox";
  checkRead.name = "isRead";
  checkRead.id = "isRead" + newBook.id;
  checkRead.value = "true";
  checkRead.checked = newBook.read;
  container.append(checkRead);

  checkRead.addEventListener('change', (e) =>{
    newBook.read = !newBook.read;
    checkRead.style.accentColor = "blue";
    window.location.reload();
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  
  } )

  button.addEventListener('click', e => {
   const bookIndex = myLibrary.findIndex(book => book.id === newBook.id);
   myLibrary.splice(bookIndex, 1);
   checkRead.remove();
   label.remove();
   bookElement.remove();
   button.remove();
   localStorage.setItem('myLibrary', JSON.stringify(myLibrary));


  })

}
  });
}



