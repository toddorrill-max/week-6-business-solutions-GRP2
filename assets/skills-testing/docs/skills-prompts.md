# Skills, MCPs and testing: prompts and evidence plan

Owner: Skills, MCPs and Testing page. Financial Bank is fictional; all customer data is fictional.

For every tool, save five things in `/evidence/<tool-name>/`:
1. A screenshot showing the Skill installed or the MCP connected (proof it was available).
2. The exact prompt you sent (copy it into `prompt.md`).
3. The output, or the key part of it (`output.md`, or a screenshot).
4. What the team changed because of it (a link to the commit or GitHub issue).
5. Where to see the result on the website.

Never paste in an example result as if it were real. Run the tool, then record what it actually said.

---

## 1. Business Solution Skill: `tell-us-once-rules`

**Install.** Zip the `skills/tell-us-once-rules` folder and upload it as a custom skill in Claude's
settings. In Claude Code, place the folder in `.claude/skills/` in the repo instead. Take a screenshot
of the skill turned on.

**Run prompt:**

> Use the tell-us-once-rules skill. Generate rules.json for the default five tasks using the fixed
> customer profile, guarantee terms and estimates in the skill. Then give me the summary table and
> the results of your self-check. Flag any task where you weren't sure whether a legal identity
> check applies.

**Then:**
- Check the output yourself against the guarantee terms. Don't rely only on the skill's self-check.
- Save the JSON as `/data/rules.json`. The Working Solution page reads this file.
- On the evidence page, show one task's rule next to the matching result card on the site.

---

## 2. UX/Design: `frontend-design` skill

Run this after the Working Solution and the evidence page exist.

**Prompt:**

> Use the frontend-design skill to review these pages for a fictional regional bank. The audience is
> an existing retail banking customer with no finance background. [Attach the HTML files or
> screenshots.] Evaluate visual hierarchy, navigation between the five pages, readability, and
> whether the checker's result is easy to understand. Separately, check accessibility: color
> contrast, alt text, keyboard navigation, visible focus, and reduced motion. Give me a numbered
> list of recommendations, ranked by impact on the customer, with the specific change for each.

**Evidence:** pick the 3–5 recommendations the team actually implemented. For each one, show a
before screenshot, the recommendation, the change, and an after screenshot.

---

## 3. Testing/Quality: `webapp-testing` skill or Playwright MCP

Requires Claude Code or another environment that can run a browser.

**Prompt:**

> Use [webapp-testing / the Playwright MCP] to test the site at [URL or local path]. Run every test
> in the test plan below. For each test, report: ID, what you did, expected result, actual result,
> pass or fail, and a screenshot for any failure. Then list defects ranked by severity.

**Test plan:**

| ID | Test | Expected result |
|---|---|---|
| T1 | Click each of the five nav links on every page | Each link opens the correct page |
| T2 | Run each of the five tasks in the checker | Each produces a result card |
| T3 | Compare pre-filled details with the profile | They match `rules.json` exactly |
| T4 | Submit with a required new field left blank | A clear error names the missing field |
| T5 | Run "Apply for a car loan" and "Add an authorized user" | The check outside the guarantee is explained |
| T6 | Read every turnaround figure | Each is marked "(est.)" |
| T7 | Press the confirm button | A reference number labeled fictional appears |
| T8 | Play both videos | Each loads, plays, and runs at least 15 seconds |
| T9 | View every page at 390 px wide | No sideways scrolling; nav is reachable |
| T10 | Complete the checker using only the keyboard | Possible, with focus visible throughout |
| T11 | Run an automated accessibility scan | No critical issues; key images have alt text |
| T12 | Turn on reduced motion | Animations are shortened or skipped |

**Evidence:** open a GitHub issue for each defect, fix it in a commit that references the issue,
then rerun the failed test and record the retest result.

---

## Uploading to the team's branch

1. Open the repository on GitHub and switch to your branch.
2. Choose **Add file → Upload files**.
3. Drag in the files, keeping the folder structure:
   - `skills-testing.html` in the site root
   - `skills/tell-us-once-rules/SKILL.md`
   - `docs/skills-prompts.md`
4. Write a short commit message, for example "Add Skills & testing page draft and Business Skill".
