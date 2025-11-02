# Git Hooks for Changelog Management

This directory contains git hooks and scripts to automate changelog management for the Prisma for Claude Code project.

## Features

### Automatic Changelog Updates

When you change the version in `package.json`, the git hook will:

1. **Detect** the version change automatically
2. **Prompt** you to update the changelogs
3. **Create** template entries in both `CHANGELOG.md` and `CHANGELOG.pt-BR.md`
4. **Stage** the updated changelogs for commit

## Files

### `prepare-commit-msg`
Git hook that runs before creating a commit message. It:
- Detects version changes in `package.json`
- Checks if changelogs have been updated
- Prompts to update changelogs automatically

### `update-changelog.js`
Node.js script that:
- Reads the current version from `package.json`
- Adds new version entries to both changelogs
- Creates template sections for features, bug fixes, and improvements

### `install-hooks.js`
Installation script that:
- Copies hooks to `.git/hooks/`
- Makes them executable (on Unix-like systems)
- Runs automatically on `npm install`

## Usage

### Manual Changelog Update

```bash
# Update for current package.json version
npm run changelog:update

# Update for specific version
npm run changelog:update 1.2.0

# With custom date and description
npm run changelog:update 1.2.0 2025-11-03 "Major feature release"
```

### Reinstall Hooks

```bash
npm run hooks:install
```

### Workflow Example

1. **Update version in package.json**
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Stage and commit**
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.1.0"
   ```

3. **Hook detects version change**
   ```
   🔔 Version changed: 1.0.0 → 1.1.0

   ⚠️  CHANGELOG.md doesn't contain version 1.1.0

   Run: node scripts/update-changelog.js 1.1.0

   Do you want to update changelogs now? [y/N]
   ```

4. **Choose to update** (type `y`)
   ```
   ✅ Updated CHANGELOG.md with version 1.1.0
   ✅ Updated CHANGELOG.pt-BR.md with version 1.1.0

   📝 Please edit the changelogs to add your changes:
      - CHANGELOG.md
      - CHANGELOG.pt-BR.md

   ✅ Changelogs updated and staged!
   ⚠️  Don't forget to edit them with your changes!
   ```

5. **Edit the changelogs** with your actual changes

6. **Amend the commit**
   ```bash
   git commit --amend --no-edit
   ```

## Template Structure

The script creates this template for new versions:

### English (CHANGELOG.md)
```markdown
## [1.1.0] - 2025-11-03

### ✨ New Features

- Add new features here...

### 🐛 Bug Fixes

-

### 🔧 Improvements

-
```

### Portuguese (CHANGELOG.pt-BR.md)
```markdown
## [1.1.0] - 2025-11-03

### ✨ Novos Recursos

- Adicione aqui as novidades...

### 🐛 Correções de Bugs

-

### 🔧 Melhorias

-
```

## Customization

### Change Template Sections

Edit `scripts/update-changelog.js` and modify the `newEntry` arrays:

```javascript
const newEntry = lang === 'pt' ? [
  `## [${version}] - ${date}`,
  '',
  '### 🎉 Your Custom Section',
  '',
  '- Your custom content...',
  ''
] : [
  // English version
];
```

### Disable Hook Temporarily

```bash
# Skip hooks for a single commit
git commit --no-verify -m "message"

# Or remove the hook file
rm .git/hooks/prepare-commit-msg
```

### Re-enable Hook

```bash
npm run hooks:install
```

## Troubleshooting

### Hook not running

1. Make sure hooks are installed:
   ```bash
   npm run hooks:install
   ```

2. Check if the hook file exists:
   ```bash
   ls -la .git/hooks/prepare-commit-msg
   ```

3. Verify it's executable (Unix-like):
   ```bash
   chmod +x .git/hooks/prepare-commit-msg
   ```

### Node.js not found

The hook requires Node.js to be in your PATH. Check:
```bash
which node  # Unix-like
where node  # Windows
```

### Wrong version detected

The hook reads version from `package.json`. Ensure:
- The version is properly formatted as `"version": "1.0.0"`
- No syntax errors in `package.json`

## Advanced

### Skip Prompt (Auto-update)

Modify `.git/hooks/prepare-commit-msg` to always update without asking:

```bash
# Replace this section:
if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
  node scripts/update-changelog.js "$NEW_VERSION"
  ...
fi

# With:
node scripts/update-changelog.js "$NEW_VERSION"
git add CHANGELOG.md CHANGELOG.pt-BR.md
```

### Add to CI/CD

Check changelogs in your CI pipeline:

```yaml
# .github/workflows/validate-changelog.yml
name: Validate Changelog
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check changelog updated
        run: |
          VERSION=$(node -p "require('./package.json').version")
          grep -q "## \[$VERSION\]" CHANGELOG.md || exit 1
```

## License

MIT - Same as the main project
