
document.getElementById('no-found-message').style.display = 'none';
// search field
const searchButton = () => {
    const searchInput = document.getElementById('search-input');
    const searchField = searchInput.value;
    // console.log(searchField);
    searchInput.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchField}`
    document.getElementById('no-found-message').style.display = 'none';
    if(searchField === ''){
        alert('Invalid. Please try again')
    }
    else{
    fetch(url)
    .then(res => res.json())
    .then(data => displayBookResults(data.docs, data.numFound))
    .catch(error => displayError(error))
    }
}

// display error
const displayError = () => {
  document.getElementById('no-found-message').style.display = 'none';
}
document.getElementById('no-found-message').style.display = 'none';

// display book results 
const displayBookResults = (books, results) => {
    const bookDetails = document.getElementById('book-details');
    bookDetails.textContent = '';
    if(books.length === 0){
      document.getElementById('no-found-message').style.display = 'block';
    }

    // search results
    const searchResults = document.getElementById('results');
    searchResults.textContent = '';
    const p = document.createElement('p');
    p.innerHTML = `
      <h4 class="text-center mb-4"> Search Results: ${results} </h4>
    `
    searchResults.appendChild(p);

    books.forEach(book => {
        // console.log(book.author_name[0])
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow-lg border-0">
        <img class="cover-image" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg
        ">
        <div class="card-body">
          <h5 class="card-title text-danger">${book.title}</h5>
          <h6>Author: ${book.author_name[0]}</h6>
          <p>First publish: ${book.publish_year[0]}</p>
          <p>Publisher: ${book.publisher[0]}</p>
        </div>
      </div>
        `
        bookDetails.appendChild(div);
    })
};