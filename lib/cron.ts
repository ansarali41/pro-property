import { CronJob } from "cron";
import { db } from "./db";
import { sendEmail } from "./email";

// Payment reminders - Run daily at 9 AM
new CronJob("0 9 * * *", async () => {
  try {
    // Get upcoming payments due in 3 days
    const upcomingPayments = await db.execute(
      `SELECT p.*, u.email, u.name
       FROM payments p
       JOIN users u ON p.user_id = u.id
       WHERE p.due_date = CURRENT_DATE + INTERVAL '3 days'
         AND p.status = 'PENDING'`
    );

    // Send reminders
    for (const payment of upcomingPayments.rows) {
      await sendEmail({
        to: payment.email,
        subject: "Upcoming Payment Reminder",
        template: "payment-reminder",
        variables: {
          name: payment.name,
          amount: payment.amount,
          dueDate: payment.due_date
        }
      });
    }
  } catch (error) {
    console.error("Error processing payment reminders:", error);
  }
}, null, true);

// Maintenance reminders - Run daily at 8 AM
new CronJob("0 8 * * *", async () => {
  try {
    // Get upcoming maintenance appointments
    const appointments = await db.execute(
      `SELECT m.*, u.email, u.name
       FROM maintenance_appointments m
       JOIN users u ON m.user_id = u.id
       WHERE m.appointment_date = CURRENT_DATE + INTERVAL '1 day'`
    );

    // Send reminders
    for (const appointment of appointments.rows) {
      await sendEmail({
        to: appointment.email,
        subject: "Maintenance Appointment Reminder",
        template: "maintenance-reminder",
        variables: {
          name: appointment.name,
          date: appointment.appointment_date,
          time: appointment.appointment_time
        }
      });
    }
  } catch (error) {
    console.error("Error processing maintenance reminders:", error);
  }
}, null, true);