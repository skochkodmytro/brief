'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface BriefAttributes {
  id: number
  name: string
  description: string
  isDeleted: boolean
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Brief extends Model<BriefAttributes> implements BriefAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: string;
    isDeleted!: boolean;

    static associate(models: any) {
      Brief.hasMany(models.Question, {
        foreignKey: 'briefId'
      })
    }
  }

  Brief.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Brief',
  });
  return Brief;
};