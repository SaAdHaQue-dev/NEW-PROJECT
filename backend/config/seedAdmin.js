import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

export async function seedAdminUser() {
  try {
    const adminUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await Admin.findOne({ username: adminUser });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPass, salt);

      await Admin.create({
        username: adminUser,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`🔐 Default Admin seeded in MongoDB: [${adminUser}]`);
    }
  } catch (error) {
    console.log('ℹ️ Admin seed info:', error.message);
  }
}

