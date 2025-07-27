const cron = require("node-cron");
const EmailVerify = require("../models/verifyEmail");

// Cron job: Runs every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  const expiryTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago

  try {
    const result = await EmailVerify.deleteMany({
      createdAt: { $lt: expiryTime }
    });
    console.log(`[CRON] Deleted ${result.deletedCount} expired OTPs`);
  } catch (err) {
    console.error("[CRON] Error deleting expired OTPs:", err.message);
  }
});
