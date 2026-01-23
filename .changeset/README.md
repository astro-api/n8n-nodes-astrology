# Changesets

This folder is used by [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

## How to add a changeset

When you make changes that should be included in a release:

1. Run `npx changeset` in your terminal
2. Select the type of change:
   - **patch** (0.1.0 → 0.1.1) — bug fixes
   - **minor** (0.1.0 → 0.2.0) — new features
   - **major** (0.1.0 → 1.0.0) — breaking changes
3. Write a summary of your changes
4. Commit the generated changeset file along with your code

## Release process

1. When changesets are merged to `master`, a "chore: release package" PR is automatically created
2. This PR updates `package.json` version and `CHANGELOG.md`
3. Merging this PR triggers npm publish and creates a GitHub Release
