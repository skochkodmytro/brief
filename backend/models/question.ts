'use strict';

import {
  Model
} from 'sequelize';

import { QuestionTypesEnum } from "../enum/brief-enums";

interface QuestionAttributes {
  id: number,
  questionType: QuestionTypesEnum,
  name: string,
  description: string,
  isRequired: boolean,
  countRow: number,
  hasCustomFieldForFill: boolean,
  from: string,
  to: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Question extends Model<QuestionAttributes> implements QuestionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    questionType!: QuestionTypesEnum;
    name!: string;
    description!: string;
    isRequired!: boolean;
    countRow!: number;
    hasCustomFieldForFill!: boolean;
    from!: string;
    to!: string;

    static associate(models: any) {
      Question.belongsTo(models.Brief, {
        foreignKey: 'briefId'
      });
      Question.hasMany(models.Option, {
        foreignKey: 'questionId'
      })
    }
  };

  Question.init({
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
      allowNull: true
    },
    questionType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    countRow: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hasCustomFieldForFill: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};