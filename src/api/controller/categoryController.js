const categoryService = require("../services/categoryService");

module.exports = {
  async index(req, res) {
    try {
      const users = await categoryService.findAllCategories();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const user = await categoryService.findCategoryById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findCategoriesByName(req, res) {
    try {
      const users = await categoryService.findCategoriesByName(req.params.name);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async store(req, res) {
    try {
      const { name, description } = req.body;

      const newCategory = await categoryService.createCategory({
        name,
        description,
      });
      return res.status(201).json(newCategory);
    } catch (error) {
      if (error.message === "Name already registered") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { name, description } = req.body;
      const updatedCategory = await categoryService.updateCategory(
        req.params.id,
        {
          name,
          description,
        }
      );
      return res.status(200).json(updatedCategory);
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async destroy(req, res) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === "Category not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
