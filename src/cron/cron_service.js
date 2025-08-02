// Cron job: Runs daily at 3:00 AM hi chalega
cron.schedule("0 3 * * *", async () => {
  const expiryTime = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes phel ke otp delete krega

  try {
    const result = await EmailVerify.deleteMany({
      createdAt: { $lt: expiryTime }
    });
    console.log(`[CRON] Deleted ${result.deletedCount} expired OTPs`);
  } catch (err) {
    console.error("[CRON] Error deleting expired OTPs:", err.message);
  }
});
