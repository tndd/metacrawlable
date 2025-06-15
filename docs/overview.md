# Project Overview

## Purpose

**MetaCrawlable** is a testbed composed of multiple independent mock websites, all hosted under a single Next.js project (using the App Router structure). Each mock website is implemented as a self-contained route, simulating specific challenges that crawlers may face in real-world hostile web environments.

This includes, but is not limited to:

- Dynamic HTML content
- JavaScript-only rendering
- Sitemap inconsistencies
- Meta tag misinformation
- Robots.txt traps
- Anti-bot middleware

These are **not optional** features. Each one must be implemented faithfully and independently.

## Goals

1. Allow developers to locally test scrapers and crawlers without hitting real production sites.
2. Provide realistic obstacles that represent common and advanced anti-crawling strategies.
3. Function as a baseline for crawler robustness testing, ML-based scraping evaluation, and automated bot design.

This project should be able to replicate or exceed the complexity of most real-world sites. If a crawler performs well here, it is expected to succeed in production.

## Development Instructions

All instructions should be interpreted **literally and without assumption**. If any ambiguity is detected, halt processing and request clarification.