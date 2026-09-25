
import User from "../models/User.js";

export const ensureAdminExists = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@bookingswale.in";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "Administrator";

    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword, 
        role: "admin",
      });
      console.log(`[AUTH] Default Admin created from .env (${adminEmail})`);
    } else {
      admin.name = adminName;
      admin.password = adminPassword; 
      await admin.save();
      console.log(
        `[AUTH] Admin credentials verified & synced from .env (${adminEmail})`,
      );
    }
  } catch (error) {
    console.error("[AUTH] Error initializing admin from .env:", error.message);
  }
};
