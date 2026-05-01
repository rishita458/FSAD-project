/**
 * Database Seeder for Service Categories
 * 
 * This script populates the service_categories table with initial data
 * 
 * Usage:
 * From backend directory: npm run seed:categories
 * Or: node scripts/seedCategories.js
 */

import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../config/database.js';
import { initializeServiceCategory } from '../models/ServiceCategory.js';
import serviceCategories from '../seeds/serviceCategories.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Sync database
    await sequelize.sync({ alter: false });
    console.log('✅ Database synced');

    // Initialize model
    const ServiceCategory = initializeServiceCategory(sequelize);
    
    // Check if categories already exist
    const existingCount = await ServiceCategory.count();
    
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing categories. Skipping seed to avoid duplicates.`);
      console.log('💡 If you want to reset, run: npm run seed:reset');
      process.exit(0);
    }

    // Create categories
    console.log(`📝 Creating ${serviceCategories.length} service categories...`);
    
    for (const category of serviceCategories) {
      try {
        await ServiceCategory.create({
          name: category.name,
          description: category.description,
          icon: category.icon,
          isActive: true,
        });
        console.log(`  ✓ ${category.name}`);
      } catch (error) {
        console.error(`  ✗ Failed to create ${category.name}:`, error.message);
      }
    }

    const finalCount = await ServiceCategory.count();
    console.log(`\n✅ Seeding complete! ${finalCount} categories created.`);
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
