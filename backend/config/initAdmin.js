// server/config/initAdmin.js
import User from "../models/User.js";

export const ensureAdminExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@bookingswale.in";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "Administrator";

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      // 1. Create admin if it doesn't exist
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // User model pre-save hook will hash this
        role: "admin",
      });
      console.log(`[AUTH] Default Admin created from .env (${adminEmail})`);
    } else {
      // 2. Sync password with .env if you changed it
      admin.name = adminName;
      admin.password = adminPassword; // Will be re-hashed by pre-save
      await admin.save();
      console.log(
        `[AUTH] Admin credentials verified & synced from .env (${adminEmail})`,
      );
    }
  } catch (error) {
    console.error("[AUTH] Error initializing admin from .env:", error.message);
  }
};
