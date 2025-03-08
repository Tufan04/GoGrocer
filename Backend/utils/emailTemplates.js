export const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #007BFF;">Hello, ${name}!</h2>
                <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
                <p>Click the button below to verify your email:</p>
                <a href="${url}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p style="margin-top: 20px;">If the button above doesn't work, you can also verify your email by clicking on the link below:</p>
                <p><a href="${url}" style="color: #007BFF; text-decoration: none;">${url}</a></p>
                <p style="margin-top: 20px;">If you didn't sign up for this account, you can safely ignore this email.</p>
                <p>Best regards,</p>
                <p>The Go Grocer Team</p>
    </div>
    `
}

export const forgetPasswordEmailTemplate = ({ name, otp }) => {
    return `
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Use the OTP below to reset it:</p>
    <p style="font-size: 1.5em; font-weight: bold; color: #007bff;">Your OTP: ${otp}</p>
    <p>This OTP is valid for <strong>[1 hour]</strong>.</p>
    <p>If you didn’t request this, please ignore this email.</p>
    <p>Thank you,<br>GoGrocer</p>
 `
}