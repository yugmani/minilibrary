var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the books
  app.get("/api/books", function(req, res) {
    db.Books.findAll({})
      .then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // Get route for returning books of a specific genre
  app.get("/api/books/genre/:genre", function(req, res) {
    db.Books.findAll({
      where: {
        genre: req.params.genre
      }
    })
      .then(function(dbBooks) {
        res.json(dbBooks);
      });
  });

  // Get route for retrieving a single book
  app.get("/api/books/:id", function(req, res) {
       db.Books.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // POST route for saving a new book
  app.post("/api/books", function(req, res) {
    console.log(req.body);
    db.Books.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publisher: req.body.publisher,
      isbn: req.body.isbn
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });

  // DELETE route for deleting books
  app.delete("/api/books/:id", function(req, res) {
    db.Books.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBooks) {
      res.json(dbBooks);
    });
  });


    // PUT route for updating books
    app.put("/api/books", function(req, res) {
      db.Books.update(req.body,
        {
          where: {
            id: req.body.id
          }
        })
        .then(function(dbBooks) {
          res.json(dbBooks);
        });
    });


};