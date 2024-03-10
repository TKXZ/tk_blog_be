/**
 * @author tkwang
 * @description article 实体
 */

import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    views: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    category: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    categoryText: {
      type: DataTypes.STRING,
    },
    filePath: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Article',
  },
)

export default Article
