'use strict';

import {
    Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
    id: number
    login: string
    password: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        login!: string;
        password!: string;

        // static associate(models: any) {
        //     User.hasMany(models.Question, {
        //         foreignKey: 'briefId'
        //     })
        // }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
