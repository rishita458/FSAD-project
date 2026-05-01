import { DataTypes } from 'sequelize';

export const initializeProfessionalProfile = (sequelize) => {
  const ProfessionalProfile = sequelize.define('ProfessionalProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'service_categories',
        key: 'id',
      },
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true, // in years
    },
    qualifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    certifications: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    portfolio: {
      type: DataTypes.JSON,
      allowNull: true, // Array of portfolio items
    },
    availability: {
      type: DataTypes.JSON,
      allowNull: true, // Schedule availability
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    tableName: 'professional_profiles',
  });

  return ProfessionalProfile;
};

export default initializeProfessionalProfile;
