/**
 * Database Reset Script
 * 
 * This script clears all service categories from the database
 * Use this before re-running the seed script
 * 
 * Usage:
 * From backend directory: npm run seed:reset
 * Or: node scripts/resetCategories.js
 */

import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../config/database.js';
import { initializeServiceCategory } from '../models/ServiceCategory.js';

const resetDatabase = async () => {
  try {
    console.log('🔄 Starting database reset...');
    
    // Initialize model
    const ServiceCategory = initializeServiceCategory(sequelize);
    
    // Delete all categories
    const count = await ServiceCategory.count();
    
    if (count === 0) {
      console.log('ℹ️  No categories to delete');
      process.exit(0);
    }

    console.log(`⚠️  Deleting ${count} service categories...`);
    await ServiceCategory.destroy({ where: {} });
    
    console.log('✅ Database reset complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
};

// Run reset
resetDatabase();
