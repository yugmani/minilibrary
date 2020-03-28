module.exports = function(sequelize, DataTypes) {
    var Members = sequelize.define("Members", {
      name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [3]
            }
        },

      address: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [3]
        },

      phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [10]
        }, 

      booktaken: {
            type: DataTypes.STRING,
            allowNull: true,
        },

      dateoftaken: {
            type: DataTypes.DATE,
            allowNull: true,
        },

      dateofreturn: {
            type: DataTypes.DATE,
            allowNull: true,
        }

    });
  
    /*
    Post.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Post.belongsTo(models.Author, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    */
  
    return Members;
  };
  