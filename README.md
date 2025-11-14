# Contributing Guide

Welcome to our project!   
This document explains how our team collaborates effectively using branches and pull requests.

---

## 🧩 Branch Workflow

We use the **Branch + Pull Request** method.

### 1. Create a New Branch
Before starting any task:
```bash
git checkout main
git pull origin main
git checkout -b feature-branch-name
Branch name format:

Type	Prefix	Example
New feature	feature/	feature-user-login
Bug fix	fix/	fix-footer-overlap
UI update	ui/	ui-navbar-theme
Documentation	docs/	docs-readme-update

2###. Commit Guidelines
Use clear, short messages:

bash
Copy code
git commit -m "Added user login page UI"
 Examples:

fix: corrected footer position
feature: added dark mode toggle
docs: updated contributing guide

3###. Push and Open a Pull Request
      Push your branch:
bash
Copy code
git push origin feature-user-login
Then open a Pull Request (PR) on GitHub:
Add a meaningful title and description.
Tag a teammate as reviewer.
Wait for at least 1 approval before merging.

4###. Merging Rules
Only merge via Pull Requests.
Use Squash and Merge for clean commit history.
Never push directly to main.

5###. Syncing with Main
Always update your local main branch before new work:

bash
Copy code
git checkout main
git pull origin main
Then create a new feature branch.

6###. Code Review Etiquette
Be respectful and constructive.
Resolve all comments before merging.
Approve only if you’ve tested and reviewed the changes.

Thanks for contributing 💙
Let’s build something amazing together
