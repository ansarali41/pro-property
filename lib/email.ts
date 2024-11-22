import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  template: string;
  variables: Record<string, string>;
}

export async function sendEmail({ to, subject, template, variables }: SendEmailParams) {
  // Load template
  const templateContent = await loadTemplate(template);
  
  // Replace variables in template
  const html = Object.entries(variables).reduce(
    (content, [key, value]) => content.replace(new RegExp(`{{${key}}}`, "g"), value),
    templateContent
  );

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
}