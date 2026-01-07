# Vivpod

Production-ready static site built with Jekyll for Vivpod's AI voice dispatch service. Includes mobile-first design, modal demo booking, sticky CTAs, SEO, and required pages.

## Local development

1. Install dependencies locally: `bundle config set path vendor/bundle` then `bundle install`.
2. Run the encoding guard before building: `bundle exec ruby scripts/check-encoding.rb`.
3. Serve to inspect: `bundle exec jekyll serve`.

## CI & quality

A GitHub Actions workflow (`.github/workflows/ci.yml`) installs the bundle, runs the same encoding guard, and executes `bundle exec jekyll build` on every push or pull request to `main`. Keeping files UTF-8 clean prevents Liquid from choking on front matter in production.

