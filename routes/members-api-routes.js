
// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {

  // GET route for getting all of the
  app.get("/api/members", function(req, res) {
    var query = {};
    if (req.query.member_id) {
      query.MemberId = req.query.member_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Books
    db.Members.findAll({
      where: query,
      include: [db.Books]
    }).then(function(dbMembers) {
      res.json(dbMembers);
    });
  });

  // Get route for retrieving a single member
  app.get("/api/members/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Books
    db.Members.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Books]
    }).then(function(dbMembers) {
      res.json(dbMembers);
    });
  });

  // POST route for saving a new members
  app.post("/api/members", function(req, res) {
    db.Post.create(req.body).then(function(dbMembers) {
      res.json(dbMembers);
    });
  });

  // DELETE route for deleting members
  app.delete("/api/members/:id", function(req, res) {
    db.Members.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMembers) {
      res.json(dbMembers);
    });
  });

  // PUT route for updating members
  app.put("/api/members", function(req, res) {
    db.Members.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbMembers) {
      res.json(dbMembers);
    });
  });
};
