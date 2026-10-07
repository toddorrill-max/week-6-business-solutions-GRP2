# Business Solution Skill: input, output and team verification

Financial Bank is fictional. All customer data is fictional.

## Input

Run in a new Claude chat with the custom `tell-us-once-rules` skill turned on:

> Use the tell-us-once-rules skill. Generate rules.json for the default five tasks using the fixed
> customer profile, guarantee terms and estimates in the skill. Then give me the summary table and
> the results of your self-check. Flag any task where you weren't sure whether a legal identity
> check applies.

## Output (v1.0)

Full file: `rules-v1.0-skill-output.json` (in this folder). The summary table the Skill produced:

| Task | Reused | New info needed | Check outside guarantee | Turnaround (est.) | Guarantee |
|---|---|---|---|---|---|
| Update my address | Name, phone, email | New address | None | Up to 5 business days → within 1 business day | Covered |
| Open a savings account | Name, address, phone, email | Deposit amount, deposit source | None | 3–5 business days → same or next business day | Covered |
| Report a job change | Name, address, phone, email | New employer | None | Up to 5 business days → within 1 business day | Covered |
| Apply for a car loan | Name, address, phone, email, employer | Amount, vehicle, length, income | Identity + credit review | 3–5 business days → same or next business day | Partly covered |
| Add an authorized user | Name, address, phone, email | Their name, date of birth | Identity check on new person | 3–5 business days → same or next business day | Partly covered |

The Skill's self-check reported all six items passing. It also raised four concerns on its own:
1. The law may not require an identity check for an authorized user, but the text said "we're required to."
2. The car loan text bundled a credit review (a lending decision) with a legal identity check.
3. Opening a savings account assumes no new identity check because Maria is an existing customer.
4. Its own status rule had a gap: every task reuses the customer's name, which the guarantee doesn't cover, so strictly no task could be "covered."

## Team verification

We checked the output with a script, separately from the Skill's self-check.

| Check | Result |
|---|---|
| JSON parses | Pass |
| Every task uses an approved estimate pair, marked "(est.)" | Pass |
| Update tasks use the update estimate; others use the routine estimate | Pass |
| No question asks for a detail already on file | Pass |
| "We reused N details" matches the number of reused fields | Pass (all 5) |
| No jargon or absolute promises in customer text | Pass |
| Every dropdown question lists its choices | **Fail**: deposit source and loan length had none, so the checker could not display them |

## Changes made (rules.json v1.1, in `/data/rules.json`)

| Change | Why |
|---|---|
| Added choices to the two dropdown questions | Defect found by team verification; the Skill's self-check missed it |
| Car loan: now a credit review with permission, not a legal identity check | Skill flag 2; Maria is an existing customer |
| Authorized user: no longer says the law requires the check | Skill flag 1; avoids an unsupported legal claim |
| Renamed `legal_check` to `outside_check` and added status definitions | Skill flag 4; the rule now matches the guarantee's actual scope |
| Savings account: kept with no outside check | Skill flag 3; team agreed with the existing-customer reasoning |

We also updated the Skill itself (SKILL.md v1.1) with these fixes so future runs produce them
directly.

Note: the legal points above reflect general knowledge, not legal advice. A real bank would confirm
them with its compliance team.
