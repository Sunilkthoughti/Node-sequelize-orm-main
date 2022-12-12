
module.exports = (sequelize, DataTypes)=>{
    const Student = sequelize.define('Student', {
        
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            
        },
        surname:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

});

return Student;
}
