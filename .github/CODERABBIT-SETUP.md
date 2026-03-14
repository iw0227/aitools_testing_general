# CodeRabbit Auto-Fix – What You Need to Update

## 1. Repository structure (done)

- Workflow file is in place: **`.github/workflows/coderabbit-auto-fix.yml`**

## 2. Dynamic all branches (done)

- The workflow uses **no branch filter** under `on.pull_request_review_comment`.
- So it runs for **every new review comment on any PR, from any branch** (e.g. `main`, `develop`, `feature/*`, `ai/*`).
- There are **no fixed branches** like `branches: [main, develop]` – all branches are dynamic.

If you ever want to limit which branches can *target* PRs (e.g. only PRs into `main` or `develop`), you could add:

```yaml
on:
  pull_request_review_comment:
    types: [created]
    branches: ['**']   # or e.g. ['main', 'develop'] to restrict target branch
```

Leaving `branches` out (as now) means “all branches”.

## 3. Add Codegen API key in GitHub

1. In your repo: **Settings → Secrets and variables → Actions**.
2. **Add new secret**: name exactly **`CODEGEN_API_KEY`**.
3. Value: your Codegen API key.
4. The workflow uses it as: `${{ secrets.CODEGEN_API_KEY }}`.

## 4. Branch structure (recommended)

- **main** – production.
- **develop** – integration.
- **feature/*** – e.g. `feature/student-api`, `feature/new-login`.
- **ai/*** – e.g. `ai/add-student-page`, `ai/cart-discount`.

Codegen/AI-created branches should follow **`ai/<task-name>`**. The workflow does not depend on branch names; it runs on any branch that has a PR with a new review comment.

## 5. Optional: apply fixes from Codegen

The workflow today:

1. Detects a comment from **coderabbitai**.
2. Checks out the PR branch.
3. Sends the comment to **Codegen** (`POST https://api.codegen.ai/fix`).
4. Commits and pushes any **local** changes.

If Codegen returns the fix in the response (e.g. patch or file contents), you may need an **extra step** between “Send suggestion to Codegen AI” and “Commit fixes” that:

- Reads the API response.
- Writes or applies the fix in the repo (e.g. apply a patch or overwrite files).

Then the existing “Commit fixes” step will pick up those changes. If Codegen applies changes in another way (e.g. webhook that pushes to the repo), this step might not be needed.

## 6. What you need – checklist (GitHub, CodeRabbit, ClickUp)

| System      | Required? | What you need |
|------------|-----------|----------------|
| **GitHub** | Yes       | Repo with this workflow file. One secret: **`CODEGEN_API_KEY`**. |
| **CodeRabbit** | Yes  | CodeRabbit app installed on the repo (reviews PRs and leaves comments). |
| **ClickUp** | No       | Optional. Only if you want a comment posted to a ClickUp task: add **`CLICKUP_API_KEY`**. No need to set a task ID in secrets. |

You do **not** need to configure anything per PR. You do **not** need to set a different `CLICKUP_TASK_ID` for each task.

### ClickUp (optional – different task per PR, no secret)

If you want the workflow to post a comment to a **ClickUp task** for a given PR:

- Add secret **`CLICKUP_API_KEY`** (your ClickUp API token) in the repo.  
- In **that PR’s description** (or title), paste the **ClickUp task link** for that task, e.g.  
  `https://app.clickup.com/1234567/v/li/901234567890`  
  The workflow will read the task ID from the URL and post the comment to that task.  
- No **`CLICKUP_TASK_ID`** secret needed. Each PR can point to a different task by putting that task’s link in the PR description.

If you don’t add `CLICKUP_API_KEY` or don’t put a ClickUp link in the PR, the workflow simply skips posting to ClickUp and still does CodeRabbit → Codegen → commit.

## 7. Permissions

- The workflow has **`permissions: contents: write`** so it can push to the PR branch.
- It uses **`GITHUB_TOKEN`** for checkout and push; no extra token is required unless your repo rules need it.

---

**Summary:** You only **must** set **`CODEGEN_API_KEY`** in GitHub and have CodeRabbit installed. ClickUp is optional; if you use it, add **`CLICKUP_API_KEY`** and put the ClickUp task link in the PR description when you want a comment on that task (no per-task secret).
