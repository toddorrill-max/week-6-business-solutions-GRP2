---
name: tell-us-once-rules
description: Generates the decision rules for Financial Bank's "Tell Us Once" request checker. Given a customer's details on file and a list of everyday banking tasks, it decides which details can be reused, which new details are genuinely needed, the estimated turnaround, and whether the $10 Tell Us Once Guarantee applies. Outputs a rules.json file the website reads, plus a plain-language summary table. Use whenever the team needs to create, extend, or check the checker's rules.
---

# Tell Us Once rules

## What this skill is for

Financial Bank (a fictional bank created for a class project) is changing how it handles
customer information. Behind the scenes, AI-assisted mapping finds where the same customer
details are copied across many internal files, and automated reports replace those copies.
For the customer, this means two things:

1. **We only ask once.** Details already on file are reused instead of requested again.
2. **Answers arrive sooner.** Routine requests no longer wait on staff checking copies.

This skill turns that promise into concrete rules for a working website. For each task a
customer might start, it decides what the bank already knows, what it still needs, how long
the task takes, and whether the guarantee covers it.

## Audience

Every piece of customer-facing text is written for one person: an existing retail banking
customer with no finance background. Never write for a business buyer or for bank staff.
Never use internal terms such as "workbook", "reconcile", "data lineage" or "mapping" in
customer-facing text.

## Fixed facts (do not change without the team's approval)

**Customer profile (fictional):**
- Name: Maria Lopez
- Address: 418 Maple Ridge Drive, Westfield, OH 43000
- Phone: (614) 555-0142
- Email: maria.lopez@example.com
- Employer: Westfield Regional Hospital

**Tell Us Once Guarantee:** If Financial Bank asks again for details already on file, it
credits the customer's account $10. Covers address, phone, email and employment details.
Identity checks required by law are not included.

**Estimates (use these exact figures, always marked "(est.)"):**
- Same details requested: up to 3 times today → once with the new system
- Routine request: 3–5 business days today → same or next business day
- Information update: up to 5 business days today → within 1 business day

## Default task list

Generate rules for these tasks unless the user supplies a different list:
1. Update my address
2. Open a savings account
3. Report a job change
4. Apply for a car loan
5. Add an authorized user to my card

## How to decide each rule

For every task:
1. List the details on file that the task uses. These go in `reuses`.
2. List only the details the bank cannot already have. These go in `asks`. Each one needs a
   plain-language reason the customer can understand.
3. If the task needs a check that isn't part of the guarantee, describe it in `outside_check`
   in plain words; otherwise set it to null. Examples: a credit review the customer gives
   permission for, or confirming a new person being added. Only say the law requires a check
   if you are confident it does. Maria is an existing customer, so do not assume a new
   identity check for her own requests.
4. Pick the turnaround from the estimates above. An information update uses the update
   estimate; anything else uses the routine-request estimate.
5. Set the guarantee status (reusing the customer's name does not affect it; the guarantee
   covers address, phone, email and employer):
   - `covered`: no outside check applies.
   - `partly_covered`: an outside check also applies.
   - `not_covered`: the task reuses none of address, phone, email or employer.
6. Every `select` question must include an `options` list of 2–5 plain choices. Use
   "(fictional)" on any account or number.
7. Write a one-sentence `result_message` and a concrete `next_step`.

## Content rules

- Plain language, sentence case, active voice.
- Mark every estimate "(est.)".
- No absolute promises ("never", "every time", "instantly").
- Do not compare Financial Bank with real banks.
- Label all customer data as fictional.
- "You" means the customer; "we" means Financial Bank.

## Output

Produce two things.

**1. `rules.json`**, valid JSON in exactly this shape:

```json
{
  "version": "1.0",
  "generated_by": "tell-us-once-rules skill",
  "estimates_note": "Turnaround figures are illustrative estimates (est.) for a class project.",
  "customer_profile": {
    "label": "Maria Lopez (fictional customer)",
    "on_file": {
      "full_name": "Maria Lopez",
      "address": "418 Maple Ridge Drive, Westfield, OH 43000",
      "phone": "(614) 555-0142",
      "email": "maria.lopez@example.com",
      "employer": "Westfield Regional Hospital"
    }
  },
  "tasks": [
    {
      "id": "update-address",
      "label": "Update my address",
      "reuses": ["full_name", "phone", "email"],
      "asks": [
        {
          "field": "new_address",
          "label": "Your new address",
          "type": "text",
          "why": "We need to know where you've moved."
        }
      ],
      "outside_check": null,
      "turnaround_today": "Up to 5 business days (est.)",
      "turnaround_new": "Within 1 business day (est.)",
      "guarantee": {
        "status": "covered",
        "note": "If we ask for your phone or email again, we'll credit your account $10."
      },
      "result_message": "We reused 3 details you already gave us and needed only your new address.",
      "next_step": "Confirm your new address."
    }
  ]
}
```

**2. A summary table** for the team's evidence page, with the columns: Task | Reused |
New info needed | Outside check | Turnaround (est.) | Guarantee.

## Self-check before answering

Confirm each item and list any that fail:
- Every task in the list has a rule.
- No `asks` field duplicates something in `on_file`.
- Every turnaround uses one of the approved estimates and ends in "(est.)".
- Every `partly_covered` task explains its outside check in plain words.
- Every `select` question has an `options` list.
- No text says the law requires a check unless you are confident it does.
- No internal jargon appears in any customer-facing string.
- The JSON parses.
