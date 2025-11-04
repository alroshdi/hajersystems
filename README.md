# Hajer Alroshdi - Personal Portfolio Website

A beautiful, bilingual (English/Arabic) personal portfolio website showcasing projects, skills, experience, and education with a modern, elegant design.

## 🌟 Features

- **Bilingual Support**: Full English and Arabic language support with RTL layout
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Modern UI**: Beautiful pastel color scheme (pink, lavender, sky blue)
- **GitHub Integration**: Automatically fetches and displays your public repositories
- **Contact Form**: Working contact form that sends emails directly to your inbox
- **Freelance Services Section**: Showcase your services with a clean, minimalist design
- **Smooth Animations**: Scroll animations and hover effects throughout
- **Easy to Customize**: Clean, well-commented code

## 📂 Project Structure

```
CV/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
├── image/              # Images folder
│   ├── background.jpg
│   ├── github icon.png
│   ├── linkedin icon.png
│   └── HAJER logo.png
└── HajerAlroshdi_CV.pdf # Your CV (for download button)
```

## 🚀 Getting Started

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser to view the portfolio.

### Option 2: Using a Local Server (Recommended)

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Then navigate to: http://localhost:8000
```

#### Using Node.js (http-server):
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server

# Then navigate to: http://localhost:8080
```

#### Using VS Code Live Server:
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🚀 Deployment to GitHub Pages

### Quick Deploy Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: **main**
   - Select folder: **/ (root)**
   - Click **Save**

3. **Your site will be live at:**
   - `https://alroshdi.github.io/hajersystems` (current repo name)
   - Or `https://alroshdi.github.io` (if repo is named `alroshdi.github.io`)

### Renaming Repository for Simple URL

To get a simple URL like `https://alroshdi.github.io`:

1. Go to your repository: https://github.com/alroshdi/hajersystems/settings
2. Scroll to **Repository name** section
3. Change to: `alroshdi.github.io` (must match your GitHub username exactly)
4. Click **Rename**
5. Update local remote:
   ```bash
   git remote set-url origin https://github.com/alroshdi/alroshdi.github.io.git
   ```

**Note:** Repository must be public for free GitHub Pages hosting.

## 📧 Contact Form Setup

The contact form uses **FormSubmit.co** and works immediately without any setup!

### Current Configuration:
- **Email:** `hajeralroshdi@gmail.com`
- **Service:** FormSubmit (free, 50 submissions/month)
- **Status:** ✅ Active and working

### How It Works:
1. Form submissions are sent to FormSubmit
2. FormSubmit forwards emails to `hajeralroshdi@gmail.com`
3. No account or API keys needed

### Alternative: EmailJS Setup (Optional)

If you prefer EmailJS for more control:

1. **Create EmailJS Account:**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for free account (200 emails/month)

2. **Create Email Service:**
   - Go to **Email Services** → **Add New Service**
   - Choose **Gmail** and connect your account

3. **Create Email Template:**
   - Go to **Email Templates** → **Create New Template**
   - Subject: `New Contact Form Message: {{subject}}`
   - Content: Include `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

4. **Get Credentials:**
   - **Public Key:** Account → General → Public Key
   - **Service ID:** From Email Services
   - **Template ID:** From Email Templates

5. **Update script.js:**
   - Uncomment the EmailJS code section
   - Replace `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`
   - Comment out the FormSubmit section

## 🌐 Custom Domain Setup

### Step 1: Register Your Domain

**Option A: Free Domain (Freenom)**
- Visit [Freenom](https://www.freenom.com)
- Register a free domain (`.tk`, `.ml`, `.ga`, `.cf`)

**Option B: Paid Domain (Namecheap)**
- Visit [Namecheap](https://www.namecheap.com)
- Register a domain (~$10-15/year)

### Step 2: Configure DNS Records

Add these DNS records in your domain provider:

**A Records (4 IPs):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record:**
```
www → alroshdi.github.io
```

### Step 3: Update GitHub

1. **Update CNAME file** in repository with your domain
2. **GitHub Pages Settings:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Check "Enforce HTTPS" (after DNS propagates)

3. **Wait 10-15 minutes** for DNS propagation and SSL certificate

### Step 4: Verify

- Visit your custom domain
- Check DNS: [whatsmydns.net](https://www.whatsmydns.net)

## 🎨 Customization Guide

### 1. Update Contact Information

Edit `index.html` and update:
```html
<a href="mailto:hajeralroshdi@gmail.com">hajeralroshdi@gmail.com</a>
<a href="tel:+96894626062">+968 94626062</a>
```

### 2. Change GitHub Username

Update `script.js`:
```javascript
const githubUsername = 'alroshdi'; // Your GitHub username
```

### 3. Update Personal Information

Edit sections in `index.html`:
- Hero section (name, title, intro)
- About section
- Skills section
- Experience section
- Education section
- Freelance Services section

### 4. Modify Colors

Update CSS variables in `style.css`:
```css
:root {
    --primary-pink: #FFB6C1;
    --primary-lavender: #E6E6FA;
    --primary-sky: #87CEEB;
    /* Change these values to your preferred colors */
}
```

### 5. Configure Projects

Edit `script.js`:
```javascript
// Repositories to exclude
const excludedRepos = ['hajeralroshdi.github.io', 'ai_workshop_app'];

// Repositories to prioritize
const prioritizedRepos = ['TaxAuthorityProject', 'predict_sales_lstm'];

// Maximum projects to display
const maxProjects = 3;
```

## 🌐 Language Switching

The website includes a language toggle button in the top right corner:
- Click the button to switch between English (EN) and Arabic (AR)
- The layout automatically adjusts for RTL when Arabic is selected
- All text elements have both English and Arabic versions using `data-en` and `data-ar` attributes

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive features and GitHub API integration
- **Font Awesome**: Icons
- **Google Fonts**: Poppins (English) and Cairo (Arabic)
- **FormSubmit**: Contact form email service

## 📝 Important Notes

1. **GitHub API**: The website fetches your repositories from GitHub's public API. Make sure your repositories have descriptions for best display.

2. **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge) are supported.

3. **CORS**: When testing locally, you may need to use a local server to avoid CORS issues with the GitHub API.

4. **Contact Form**: Currently uses FormSubmit.co (free, 50 submissions/month). No setup required!

5. **GitHub Pages**: Repository must be public for free hosting.

## 🎯 Project Features

- ✅ Bilingual support (English/Arabic)
- ✅ Responsive design
- ✅ GitHub repository integration
- ✅ Contact form with email delivery
- ✅ Freelance services showcase
- ✅ Smooth scroll animations
- ✅ Project prioritization system
- ✅ Manual project fallback

## 📄 License

This portfolio template is free to use and modify for personal use.

## 🤝 Support

For questions or issues, feel free to reach out via:
- **LinkedIn**: [alroshdi](https://www.linkedin.com/in/alroshdi/)
- **GitHub**: [@alroshdi](https://github.com/alroshdi)
- **Email**: hajeralroshdi@gmail.com

---

**Made with ❤️ by Hajer Alroshdi**
