const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));

}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData(message) {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new CustomEvent(SAVED_EVENT, {
            detail: message
        }));
    } else {
        alert('Browser kamu tidak mendukung local storage');
    }
}


document.addEventListener(SAVED_EVENT, function (event) {
    const textMessage = event.detail;

    successAlert(textMessage);
});

function successAlert(message) {
    const alertDiv = document.createElement('div');

    alertDiv.setAttribute('role', 'alert');
    alertDiv.classList.add('alertDiv', 'alert', 'alert-success', 'fixed', 'w-1/2', 'z-50', 'left-1/2', 'top-[15%]', 'transform-gpu', '-translate-x-1/2', '-translate-y-1/2', 'text-2xl', 'p-6');

    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.classList.add('stroke-current', 'shrink-0', 'h-6', 'w-6');
    svgElement.setAttribute('fill', 'none');
    svgElement.setAttribute('viewBox', '0 0 24 24');
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('stroke-linecap', 'round');
    pathElement.setAttribute('stroke-linejoin', 'round');
    pathElement.setAttribute('stroke-width', '2');
    pathElement.setAttribute('d', 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0');
    svgElement.appendChild(pathElement);

    const spanElement = document.createElement('span');

    let countdown = [3, 2, 1, 0];
    let i = 0;

    function updateCountdown() {
        spanElement.textContent = message + ' ' + '(' + countdown[i] + '...tunggu sebentar' + ')';
        i++;
        if (i < countdown.length) {
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();


    // spanElement.textContent = message;

    alertDiv.appendChild(svgElement);
    alertDiv.appendChild(spanElement);

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        document.body.removeChild(alertDiv);
        window.location.reload();
    }, 3000);


}


