
$(document).ready(function() {

    // blogContainer holds all of our books
    var bookContainer = $(".blog-container");

    // var postCategorySelect = $("#category");
    var bookGenreSelect = $("#genre");

    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleBookDelete);
    $(document).on("click", "button.edit", handleBookEdit);
    bookGenreSelect.on("change", handleGenreChange);
    var books;
  
    // This function grabs books from the database and updates the view
    function getBooks(genre) {
      var genreString = genre || "";
      if (genreString) {
        genreString = "/genre/" + genreString;
      }
      $.get("/api/books" + genreString, function(data) {
        console.log("Books", data);
        books = data;
        // initializeRows();
        
        if (!books || !books.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
        
      });
    }
  
    // This function does an API call to delete books
    function deleteBook(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/books/" + id
      })
        .then(function() {
          getBooks(bookGenreSelect.val());
          alert("Deleted successfully");
        });
    }
  
    // Getting the initial list of books
    getBooks();
    // InitializeRows handles appending all of our constructed book HTML inside
    // blogContainer
    function initializeRows() {
      bookContainer.empty();
      var booksToAdd = [];
      for (var i = 0; i < books.length; i++) {
        booksToAdd.push(createNewRow(books[i]));
        console.log(createNewRow(books[i]));
        
      }
      // console.log(booksToAdd);
      bookContainer.append(booksToAdd);
      
    }
  

    // This function constructs a book's HTML
    
    function createNewRow(books) {
     
            var newBookCard = $("<div>");
            newBookCard.addClass("card");
            var newBookCardHeading = $("<div>");
            newBookCardHeading.addClass("card-header");
            
            var deleteBtn = $("<button>");
            deleteBtn.text("x");
            deleteBtn.addClass("delete btn btn-danger");
            var editBtn = $("<button>");
            editBtn.text("EDIT");
            editBtn.addClass("edit btn btn-primary");
            
            var newBookTitle = $("<h5>");
            newBookTitle.addClass("fas");
            newBookTitle.addClass("fa-book-reader");

            var newBookAuthor = $("<h5>");
            // newBookAuthor.addClass("fas");
            // newBookAuthor.addClass("fa-pen-nib");

            var newBookGenre = $("<p>");
            newBookGenre.text("Genre: "+ books.genre);
            newBookGenre.css({
                float: "right",
                // "text-align":"center",
                // "font-weight": "700",
                "margin-top": "-15px",
                "color":"blue"

            });

            var newBookPublisher = $("<small>");
            var newBookIsbn = $("<small>");

      var newBookCardBody = $("<div>");
      newBookCardBody.addClass("card-body");
      var newBookBody = $("<p>");


      newBookTitle.text(books.title + " ");
      newBookTitle.css({
                "color":"navy"
            });
      newBookAuthor.text("Author: "+ books.author+ " ");
      newBookPublisher.css({
          "color":"gray",
          "font-weight":"bold"
    });
      newBookPublisher.text("Publisher: "+ books.publisher+ " | ");
      newBookIsbn.text("ISBN: "+ books.isbn);
      newBookIsbn.css({
        "color":"blue",
        "font-weight":"lighter"
  });

      // var formattedDate = new Date(post.createdAt);
      // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      // newPostDate.text(formattedDate);

      // newPostTitle.append(newPostDate);


      newBookCardHeading.append(deleteBtn);
      newBookCardHeading.append(editBtn);

      newBookCardHeading.append(newBookTitle);
      newBookCardHeading.append(newBookAuthor);
      newBookCardHeading.append(newBookGenre);
      newBookCardHeading.append(newBookPublisher);
      newBookCardHeading.append(newBookIsbn);

    newBookCardBody.append(newBookBody);
    newBookCard.append(newBookCardHeading);
    // newBookCard.append(newBookCardBody);

           newBookCard.data("books", books);
      
      return newBookCard;
    }
  
    // This function figures out which book we want to delete and then calls
    // deletePost
    function handleBookDelete() {
      var currentBook = $(this)
        .parent()
        .parent()
        .data("books");
      deleteBook(currentBook.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handleBookEdit() {
      var currentBook = $(this)
        .parent()
        .parent()
        .data("books");
      window.location.href = "/cms?book_id=" + currentBook.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty() {
      bookContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No books yet for this genre, navigate <a href='/cms'>here</a> in order to add a new book.");
      bookContainer.append(messageH2);
    }
  
    // This function handles reloading new books when the genre changes
    function handleGenreChange() {
      var newBookGenre = $(this).val();
      getBooks(newBookGenre);
    }
  
  });
  