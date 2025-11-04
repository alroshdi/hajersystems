# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form messages via email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Create an Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account: `hajeralroshdi99@gmail.com`
5. Click **Create Service**
6. **Copy the Service ID** (you'll need this)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use these settings:

   **Template Name:** Contact Form Message

   **Subject:** New Contact Form Message: {{subject}}

   **Content:**
   ```
   You have a new message from your portfolio website!

   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}

   ---
   Sent from: hajeralroshdi.github.io
   ```

4. Click **Save**
5. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** in the API Keys section
3. **Copy the Public Key**

## Step 5: Update script.js

Open `script.js` and replace these three values:

1. **Line 443:** Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   ```javascript
   emailjs.init('your-actual-public-key-here');
   ```

2. **Line 473:** Replace `YOUR_SERVICE_ID` with your Service ID
   ```javascript
   const response = await emailjs.send(
       'your-service-id-here',    // Your Service ID
       'YOUR_TEMPLATE_ID',
   ```

3. **Line 474:** Replace `YOUR_TEMPLATE_ID` with your Template ID
   ```javascript
   const response = await emailjs.send(
       'your-service-id-here',
       'your-template-id-here',   // Your Template ID
   ```

## Example:

After setup, your code should look like this:

```javascript
emailjs.init('abc123xyz456'); // Your Public Key

const response = await emailjs.send(
    'service_abc123',        // Your Service ID
    'template_xyz456',       // Your Template ID
    {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_email: formData.to_email
    }
);
```

## Step 6: Test the Form

1. Save your changes
2. Open your website
3. Fill out the contact form
4. Submit and check your email!

## Troubleshooting

- **Form not sending?** Check browser console for errors
- **Not receiving emails?** Check spam folder and verify EmailJS service connection
- **Rate limits?** Free tier allows 200 emails/month

## Security Note

Your Public Key is safe to use in client-side code. EmailJS uses it to verify requests.

---

**Need help?** Visit [EmailJS Documentation](https://www.emailjs.com/docs/)



