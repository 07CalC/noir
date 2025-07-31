# Contributing to Noir

Thank you for your interest in contributing to Noir! Whether you're fixing a bug, building a new feature, improving documentation, or just trying things out — you're welcome here. ❤️

## 🧰 Local Setup

1. Clone the Repo
```bash
git clone https://github.com/07calc/noir
cd noir
```
2. Install dependencies (you can use any package manager but `bun is recommended`)
```bash
bun install
```
3. Start the development server
```bash
bun start
```
4. Scan the qr code through expo go app

### Dependencies

- make sure to install expo go app in your mobile device
- install [bun](https://bun.com/) (recommended)

## 🧠 Guidelines

### Branch naming

Use clear and concise branch names:

- `feat/feature-name` - for features
- `fix/bug-name` - for bug fixes
- `docs/doc-change` - for documentation

### Commit Messages

Follow conventional commit messages
```bash
feat: add markdown preview screen
fix: resolve crash on opening note
```

### File Naming

Make sure to use kebab-case for file names, e.g., `my-component.tsx`.

### Add your name to the contributors list

If you want to be listed as a contributor, add your details to `lib/contributors.ts`:

```ts
export const contributors = [
  // .. existing contributors
  {
    name: "Your Name",
    github: "your-github-profile-link",
    twitter: "your-twitter-profile-link", // optional
    website: "your-website-link", // optional
    linkedin: "your-linkedin-profile-link", // optional
    }
]
```

We'll be showcasing conrtibutors on the app, so please ensure your details are accurate and up-to-date.

## Pull Requests

- Fork the repo and create your branch from `main`
- include a clear description of the PR (include screenshots and screen recordings if required)
- Reference the related issue (e.g. `Closes #3`), if applicable

## 🤗 Need Help?

Feel free to contact me on [Discord](https://discord.com/users/notcalc), or ask in the issue you’re working on.
