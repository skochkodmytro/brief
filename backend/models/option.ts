'use strict';

import {
  Model
} from 'sequelize';

interface OptionAttributes {
  id: number;
  name: string;
  defaultIsChecked: boolean;
  imageSrc: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Option extends Model<OptionAttributes> implements OptionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    defaultIsChecked!: boolean;
    imageSrc!: string;

    static associate(models: any) {
      Option.belongsTo(models.Question, {
        foreignKey: 'questionId'
      });
    }
  };
  Option.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defaultIsChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    imageSrc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};