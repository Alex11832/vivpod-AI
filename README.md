# ViVpod Website

Production-ready Jekyll website for ViVpod AI voice answering service.

## Features

- **Modern Design**: Inspired by smith.ai with clean, professional SaaS aesthetics
- **Fully Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Complete meta tags, OpenGraph, Twitter Cards, and JSON-LD schema
- **Fast Loading**: Minimal dependencies, optimized CSS and JavaScript
- **Multiple Pages**: Home, Pricing, Industries, About, Contact, Blog, Privacy, Terms
- **Industry-Specific Pages**: Handyman, Healthcare, Legal (easily extensible)
- **Interactive Components**: Modal forms, FAQ accordion, mobile menu, smooth scrolling
- **Sticky Mobile CTA**: Improves conversion on mobile devices
- **Blog Ready**: Complete blog setup with sample post

## Quick Start

### Prerequisites

- Ruby 3.0 or higher
- Bundler

### Installation

```bash
# Clone the repository
git clone https://github.com/Alex11832/vivpod-AI.git
cd vivpod-AI

# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

Visit `http://localhost:4000` to view the site.

## Project Structure

```
vivpod-AI/
├── _config.yml           # Jekyll configuration
├── _includes/            # Reusable components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── pricing-table.html
│   ├── faq.html
│   └── testimonials.html
├── _layouts/             # Page templates
│   ├── default.html
│   ├── page.html
│   ├── post.html
│   └── industry.html
├── _industries/          # Industry-specific pages
│   ├── handyman.md
│   ├── healthcare.md
│   └── legal.md
├── _posts/               # Blog posts
│   └── 2026-01-07-first-post.md
├── assets/
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── main.js       # Interactive functionality
│   └── images/           # Images and icons
├── index.html            # Homepage
├── pricing.html
├── industries.html
├── about.html
├── contact.html
├── blog.html
├── privacy.html
├── terms.html
└── robots.txt
```

## Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --primary: #FF5722;
  --dark: #1a1a1a;
  /* ... */
}
```

### Content

- **Homepage**: Edit `index.html`
- **About**: Edit `about.html`
- **Contact Form**: Update form action in `contact.html` (currently uses Formspree placeholder)
- **Industries**: Add new files to `_industries/` folder
- **Blog Posts**: Add new files to `_posts/` folder with format `YYYY-MM-DD-title.md`

### Site Configuration

Edit `_config.yml` to update:
- Site title and description
- Contact information
- Social media links
- URL and baseurl

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Site will be live at `https://yourusername.github.io/vivpod-AI/`

### Custom Domain

1. Add `CNAME` file with your domain
2. Configure DNS with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Other Hosting

Build the site and upload the `_site` folder to any static hosting provider:

```bash
bundle exec jekyll build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2026 ViVpod. All rights reserved.

## Support

For questions or issues, contact: contact@vivpod.com
