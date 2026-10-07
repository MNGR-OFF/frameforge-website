# FrameForge website

The public website source lives in [website/](website/README.md).
GitHub Pages builds it through .github/workflows/website.yml.

This is a website-only snapshot. Plugin development, the hosted account
service, and their internal documentation stay in the separate original project.
The compiled Studio plugin in website/public/downloads/ is the intentional
public download.

Pushes that change the website or its workflow on the default branch publish
automatically after verification and publication configuration checks pass.
The current static website supports clearly labelled Privacy and Terms drafts;
policy adoption remains a separate owner decision. See [deployment setup](website/docs/DEPLOYMENT-READINESS.md).
