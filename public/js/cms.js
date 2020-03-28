
$(document).ready(function() {

    // Gets an optional query string from our url (i.e. ?book_id=23)
    var url = window.location.search;
    var bookId;
    // Sets a flag for whether or not we're updating a book to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the book id from the url
    // In localhost:8080/cms?book_id=1, bookId is 1
    if (url.indexOf("?book_id=") !== -1) {
      bookId = url.split("=")[1];
      getBookData(bookId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var authorInput = $("#author");
    var publisherInput = $("#publisher");
    var isbnInput = $("#isbn");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var bookGenreSelect = $("#genre");

    // Giving the bookGenreSelect a default value
    bookGenreSelect.val("fiction");

    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the book if we are missing a author or a title
      if (!titleInput.val().trim() || !authorInput.val().trim()) {
        return;
      }
      // Constructing a newBook object to hand to the database
      var newBook = {
        title: titleInput.val().trim(),
        author: authorInput.val().trim(),
        genre: bookGenreSelect.val(),
        publisher: publisherInput.val(),
        isbn: isbnInput.val()
      };
  
      console.log(newBook);
  
      // If we're updating a book run updatePost to update a book
      // Otherwise run submitBook to create a whole new post
      if (updating) {
        newBook.id = bookId;
        updateBook(newBook);
      }
      else {
        submitBook(newBook);
        
      }
    });
  
    // Submits a new book and brings user to book upon completion
    function submitBook(Books) {
      $.post("/api/books/", Books, function() {
        alert("New book is added successfully");
        window.location.href = "/index";
      });
    }
  
    // Gets books data for a book if we're editing
    function getBookData(id) {
      $.get("/api/books/" + id, function(data) {
        if (data) {
          // If this book exists, prefill our cms forms with its data
          titleInput.val(data.title);
          authorInput.val(data.author);
            bookGenreSelect.val(data.genre);
          publisherInput.val(data.publisher);
          isbnInput.val(data.isbn);
        
          
          // If we have a book with this id, set a flag for us to know to update the book
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the texts page when done
    function updateBook(book) {
      $.ajax({
        method: "PUT",
        url: "/api/books",
        data: book
      })
        .then(function() {
          alert("Updated successfully");
          window.location.href = "/index";
        });
    }
  });
  