import { sequelize } from '../config/database.js';

const getServiceCategory = () => sequelize.models.ServiceCategory;

export const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const ServiceCategory = getServiceCategory();
    const category = await ServiceCategory.create({
      name,
      description,
      icon,
    });

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const ServiceCategory = getServiceCategory();
    const categories = await ServiceCategory.findAll({
      where: { isActive: true },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const ServiceCategory = getServiceCategory();
    const category = await ServiceCategory.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, isActive } = req.body;
    const ServiceCategory = getServiceCategory();
    
    const [updatedCount] = await ServiceCategory.update(
      { name, description, icon, isActive },
      { where: { id: req.params.id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = await ServiceCategory.findByPk(req.params.id);
    res.json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const ServiceCategory = getServiceCategory();
    const deleted = await ServiceCategory.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
