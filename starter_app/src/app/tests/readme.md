# Test & Coverage Guide

## Run Tests

### Run all tests once:
```bash
npm test
```

### Run tests in watch mode (reruns on file changes):
```bash
npm run test:watch
```

### Run a specific test file:
```bash
npm test Icon.test.tsx
```

### Run tests matching a pattern:
```bash
npm test -- --testNamePattern="decorative"
```


## Coverage Report Files

After running coverage, these files are generated:

```
starter_app/
├── coverage/
│   ├── lcov-report/
│   │   ├── index.html          ← Open this for visual report
│   │   └── ...                 ← Detailed file coverage
│   ├── coverage-final.json
│   └── lcov.info
```
