const { Op } = require("sequelize");
const Category = require("../models/Category");

class CategoryRepository {
  async findAllCategories() {
    return Category.findAll();
  }

  async findCategoryById(id) {
    return await Category.findByPk(id);
  }

  async findCategoryByName(name) {
    return await Category.findOne({
      where: {
        name,
      },
    });
  }

  async findCategoriesByName(name) {
    return await Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  async updateCategory(category, categoryUpdate) {
    return await category.update(categoryUpdate);
  }

  async deleteCategory(category) {
    return await category.destroy();
  }
}

module.exports = new CategoryRepository();
