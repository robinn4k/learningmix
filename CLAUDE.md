# Claude Code — Project Instructions

## Git Workflow

**Always squash merge** feature branches into `main` (one clean commit per PR):

```bash
git checkout main
git pull origin main
git merge --squash <feature-branch>
git commit -m "Descriptive single-line summary of everything in the branch"
git push -u origin main
```

Commit message format:
```
<verb>: <short summary>

- Bullet 1
- Bullet 2

https://claude.ai/code/session_<id>
```

Never merge with `--no-ff` or fast-forward multiple commits directly into main.
