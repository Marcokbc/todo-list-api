const Category = require("../models/Category");
const categoryRepository = require("../repositories/categoryRepository");

class CategoryService {
  async findAllCategories() {
    const categories = await categoryRepository.findAllCategories();
    if (!categories || categories.length === 0) {
      throw new Error("No categories not found");
    }

    return categories;
  }
  async findCategoryById(id) {
    const category = await categoryRepository.findCategoryById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async findCategoriesByName(name) {
    const category = await categoryRepository.findCategoryByName(name);
    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async createCategory(categoryData) {
    const exixtingCategory = await categoryRepository.findCategoryByName(
      categoryData.name
    );

    if (exixtingCategory) {
      throw new Error("Category alredy exists");
    }

    return await categoryRepository.createCategory(categoryData);
  }

  async updateCategory(categoryId, categoryData) {
    const category = await categoryRepository.findCategoryById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    return await categoryRepository.updateCategory(category, categoryData);
  }

  async deleteCategory(categoryId) {
    const category = await categoryRepository.findCategoryById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    await categoryRepository.deleteCategory(category);

    return { message: "Category deleted successfully" };
  }
}

module.exports = new CategoryService();
