# Povketya NHOR — Data Portfolio

Static, responsive portfolio for GitHub Pages:

<https://povketya.github.io/ketyanhor/>

## Structure

- `index.html` — portfolio content, project cards, and accessible project dialogs
- `style.css` — responsive light/dark visual system
- `script.js` — navigation, theme, filtering, dialogs, reveal effects, and static contact form
- `resume.html` / `resume.css` — print-friendly résumé source
- `Povketya-NHOR-CV.pdf` — downloadable résumé generated from the print-friendly source
- `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.svg` — GitHub Pages and SEO support
- `img/` — original project media plus optimized display copies

The site has no build step and no framework dependency. GitHub Pages serves the files directly.

## Updating a project

Each project has:

1. A card inside `#projects-grid`
2. Search keywords and category values in `data-keywords` and `data-category`
3. A native `<dialog>` containing verified case-study details

Keep missing evidence clearly labeled:

- `Add GitHub URL`
- `Add live demo`
- `Add project screenshot`
- `Add verified technologies`

Do not publish confidential datasets, connection details, customer information, internal table names, or proprietary code.

## Current content placeholders

- Project-specific GitHub and live-demo URLs
- HomeBuild dashboard screenshots
- Diabetes screenshot: `img/diabetes-xai.jpg`
- RFM screenshot: `img/rfm-customer-segmentation.jpg`
- Verified technology details for the Performance Tracker Dashboard and PETER TECH Web Store

## Contact form

The contact form uses a `mailto:` workflow so it works on static GitHub Pages without storing messages or exposing third-party form credentials. Submitting the form opens the visitor’s default email application.

## Deployment

Commit changes to the GitHub Pages branch used by the repository. All URLs are relative so the site continues to work under the `/ketyanhor/` project path.
