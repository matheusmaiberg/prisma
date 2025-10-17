# Test Validation Hook

This is a test document to verify the markdown validation hook is working.

## Test Cases

###Intentional Error - Missing Space After Hash

- List item 1
- List item 2
  - Nested item with correct indentation

```typescript
const example = "code block";
```

[Valid Link](./validate-markdown.py)
[Broken Link](./nonexistent-file.md)

## Results

The hook should:
1. Auto-fix the header spacing issue
2. Warn about the broken link
3. Allow the write operation

