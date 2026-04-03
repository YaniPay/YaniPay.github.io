# YaniPay.github.io

Source repository for https://yanipay.github.io

## Purpose

This repository powers the public GitHub Pages site for YaniPay.

## Structure

- `index.html` - landing page entry point
- `styles.css` - base styling
- `main.js` - reveal animations, counters, and small UI behaviors
- `.nojekyll` - disables Jekyll processing for direct static hosting

## Local Preview

```bash
git clone https://github.com/YaniPay/YaniPay.github.io.git
cd YaniPay.github.io
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
