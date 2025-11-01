# Hajer Alroshdi - Personal Portfolio Website

A beautiful, bilingual (English/Arabic) personal portfolio website showcasing projects, skills, experience, and education with a modern, elegant design.

## 🌟 Features

- **Bilingual Support**: Full English and Arabic language support with RTL layout
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- **Modern UI**: Beautiful pastel color scheme (pink, lavender, sky blue)
- **GitHub Integration**: Automatically fetches and displays your public repositories
- **Smooth Animations**: Scroll animations and hover effects throughout
- **Easy to Customize**: Clean, well-commented code

## 📂 Project Structure

```
CV/
├── index.html          # Main HTML file
├── style.css           # All styles and animations
├── script.js           # JavaScript functionality
├── README.md          # This file
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

## 🎨 Customization Guide

### 1. Update Contact Information

Edit `index.html` and update the contact details:
```html
<!-- Around line 260 -->
<a href="mailto:YOUR_EMAIL@example.com">YOUR_EMAIL@example.com</a>
<a href="tel:+968XXXXXXXXX">+968 XXX XXX XXX</a>
```

### 2. Change Profile Photo

Replace the placeholder image in `index.html`:
```html
<!-- Around line 70 -->
<img src="path/to/your/photo.jpg" alt="Hajer Alroshdi">
```

### 3. Update Personal Information

Edit the About Me section and other personal details in `index.html`:
- Hero section (name, title, intro)
- About section
- Skills section
- Experience section
- Education section

### 4. Modify Colors

Update the CSS variables in `style.css`:
```css
:root {
    --primary-pink: #FFB6C1;
    --primary-lavender: #E6E6FA;
    --primary-sky: #87CEEB;
    /* Change these values to your preferred colors */
}
```

### 5. GitHub Username

The script automatically uses your GitHub username (`alroshdi92`). If you want to change it, update `script.js`:
```javascript
const githubUsername = 'YOUR_GITHUB_USERNAME';
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

## 📝 Important Notes

1. **GitHub API**: The website fetches your repositories from GitHub's public API. Make sure your repositories have descriptions for best display.

2. **CV Download**: Update the `href` attribute in the Download Resume button to point to your actual CV PDF file.

3. **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge) are supported.

4. **CORS**: When testing locally, you may need to use a local server to avoid CORS issues with the GitHub API.

## 🎯 Future Enhancements

Consider adding:
- Contact form with email integration
- Blog section
- Testimonials section
- More detailed project pages
- Dark mode toggle
- Additional language support

## 📄 License

This portfolio template is free to use and modify for personal use.

## 🤝 Support

For questions or issues, feel free to reach out via:
- **LinkedIn**: [alroshdi](https://www.linkedin.com/in/alroshdi/)
- **GitHub**: [@alroshdi92](https://github.com/alroshdi92)

---

**Made with ❤️ by Hajer Alroshdi**

