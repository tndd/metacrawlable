# DynamicMaze Test Results

## Overview
This directory contains basic tests for the DynamicMaze site. Because the pages are generated with randomized layouts, the tests only verify that key pages load successfully and contain the expected headings.

## Test Coverage
- Home page `/dynamic`
- Section page `/dynamic/sections/1`
- Random structure page `/dynamic/random`

## Running Tests
```bash
# Run DynamicMaze tests only
npm run test:dynamic

# Show the latest DynamicMaze test report
npm run test:report:dynamic
```

