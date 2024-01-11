const books = [];
const RENDER_EVENT = 'render-book';


document.addEventListener('DOMContentLoaded',
    function () {
        const submitForm = document.getElementById('inputBook');
        submitForm.addEventListener('submit',
            function (event) {
                event.preventDefault();
                addBook();
                window.location.hash = '#bookShelf';
            });

        if (isStorageExist()) {
            loadDataFromStorage();
        }

    });




function generateId() {
    return + new Date();
}

function generateBookObj(id, title, author, year, isComplete) {

    year = parseInt(year);

    return {
        id,
        title,
        author,
        year,
        isComplete,
    };
}

function addBook() {
    const textTitle = document.getElementById('inputBookTitle').value;
    const textAuthor = document.getElementById('inputBookAuthor').value;
    const textYear = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;

    const generateID = generateId();
    const bookObj = generateBookObj(generateID, textTitle, textAuthor, textYear, isComplete,);

    books.push(bookObj);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData('Buku berhasil ditambahkan');
}


function makeBook(bookObj) {
    const textTitle = document.createElement('h2');
    textTitle.classList.add('card-title', 'text-2xl');
    textTitle.innerText = bookObj.title;

    const textAuthor = document.createElement('p');
    textAuthor.classList.add('flex-grow-0', 'text-base', 'font-medium', 'italic');
    textAuthor.innerText = bookObj.author;

    const textYear = document.createElement('p');
    textYear.classList.add('flex-grow-0', 'text-base', 'font-medium');
    textYear.innerText = bookObj.year;

    const buttonDone = document.createElement('div');

    buttonDone.classList.add('btn', 'text-white', 'bg-primary');

    buttonDone.innerText = '';

    const buttonEdit = document.createElement('div');
    buttonEdit.classList.add('btn', 'text-white', 'bg-secondary', 'hover:text-primary');
    buttonEdit.innerText = 'Edit';

    const buttonDelete = document.createElement('div');
    buttonDelete.classList.add('btn', 'text-white', 'bg-red-500', 'hover:bg-red-200', 'hover:text-red-500');
    buttonDelete.innerText = 'Hapus';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('card-actions', 'mt-8', 'flex', 'justify-center', 'items-center');
    buttonContainer.append(buttonDone, buttonEdit, buttonDelete);


    if (bookObj.isComplete) {
        buttonDone.innerText = 'Baca Lagi';

        buttonDone.addEventListener('click', function () {
            addBookToUncompleted(bookObj.id);
        });

    } else {
        buttonDone.innerText = 'Selesai';

        buttonDone.addEventListener('click', function () {
            addBookToCompleted(bookObj.id);
        });
    }

    buttonEdit.addEventListener('click', function () {
        editForm.showModal();
        document.getElementById('editBookTitle').value = bookObj.title;
        document.getElementById('editBookAuthor').value = bookObj.author;
        document.getElementById('editBookYear').value = bookObj.year;


        document.getElementById('editBook').addEventListener('submit',
            function (e) {
                e.preventDefault();
                editBook(bookObj.id);
                editForm.close();

            });

    });


    buttonDelete.addEventListener('click', function () {
        deleteBook(bookObj.id);
    });


    const textContainer = document.createElement('div');
    textContainer.classList.add('card-body', 'p-8', 'flex', 'flex-col', 'justify-center', 'items-center');
    textContainer.append(textTitle, textAuthor, textYear, buttonContainer);


    const container = document.createElement('div');
    container.classList.add('card', 'w-[320px]', 'h-[300px]', 'bg-mercury', 'shadow-xl');
    container.append(textContainer);
    container.setAttribute('id', `book-${bookObj.id}`);



    return container;

}


document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookShelf = document.getElementById('uncompleted-books');
    uncompletedBookShelf.innerHTML = '';

    const completedBookShelf = document.getElementById('completed-books');
    completedBookShelf.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isComplete) {
            uncompletedBookShelf.append(bookElement);
        } else {
            completedBookShelf.append(bookElement);
        }
    }
});


function findBook(bookId) {
    for (const book of books) {
        if (book.id === bookId) {
            return book;
        }
    }
    return null;
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    saveData('Buku Berhasil di Pindahkan ke Rak Selesai Dibaca');
    document.dispatchEvent(new Event(RENDER_EVENT));

}

function addBookToUncompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    saveData('Buku Berhasil di Pindahkan ke Rak Belum Selesai Dibaca');
    document.dispatchEvent(new Event(RENDER_EVENT));

}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function deleteBook(bookId) {
    const bookIndex = findBookIndex(bookId);

    if (bookIndex == -1) return;

    books.splice(bookIndex, 1);
    saveData('Buku Berhasil di Hapus');
    document.dispatchEvent(new Event(RENDER_EVENT));
}


function editBook(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.title = document.getElementById('editBookTitle').value;
    bookTarget.author = document.getElementById('editBookAuthor').value;
    bookTarget.year = document.getElementById('editBookYear').value;

    saveData('Buku Berhasil di Edit');
    document.dispatchEvent(new Event(RENDER_EVENT));


}




