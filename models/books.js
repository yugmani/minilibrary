module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
     
      title: {
            type: DataTypes.STRING,
            allowNull: false,
                validate: {
                len: [3]
                }
            },

      author: {
            type: DataTypes.STRING,
            // allowNull: false,
            //     validate: {
            //     len: [3]
            //     }
        },

      genre: {
            type: DataTypes.STRING,
            allowNull: true,
            },

     publisher: {
              type: DataTypes.STRING,
              allowNull: true,
          }, 

      isbn: {
        type: DataTypes.STRING,
        allowNull: true,
      }
            
    });
  
    // Books.associate = function(models) {
    //   // Associating Books with Members
    //   // When an Book is deleted, also delete any associated Members
    //   Author.hasMany(models.Post, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Books;
  };
