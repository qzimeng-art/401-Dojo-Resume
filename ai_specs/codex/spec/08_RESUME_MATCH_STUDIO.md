# Resume Match Studio

## Purpose

Give users a fast, explainable way to compare a tailored resume against a job description.

## Product wording

Use:
- `Match score`
- `Keyword coverage`
- `Matched`
- `Missing`
- `Consider emphasizing`

Do not use:
- ATS probability
- interview probability
- recruiter score
- hiring score

## Inputs

- application.job_description
- flattened tailored resume text

## Match pipeline

### Step 1 — Normalize text

- lowercase
- normalize punctuation
- normalize whitespace
- preserve meaningful tokens like:
  - C++
  - C#
  - .NET
  - Node.js
  - CI/CD

### Step 2 — Extract skills

Use:
1. known technical phrase dictionary
2. non-stopword frequency
3. common bigrams

Dictionary examples:
- JavaScript
- TypeScript
- React
- Next.js
- Vue
- Svelte
- Python
- Java
- C++
- C#
- Go
- Rust
- SQL
- PostgreSQL
- MySQL
- MongoDB
- Redis
- AWS
- Azure
- GCP
- Docker
- Kubernetes
- Git
- CI/CD
- REST
- GraphQL
- APIs
- distributed systems
- microservices
- machine learning
- computer vision
- data structures
- algorithms
- Linux
- testing
- communication
- leadership
- collaboration

### Step 3 — Weight

Suggested:
- known skill exact phrase: 3
- repeated meaningful bigram: 2
- frequent meaningful unigram: 1

Cap repeated weighting so one repeated term does not dominate.

### Step 4 — Resume match

A term is matched when normalized resume text contains:
- exact normalized phrase, or
- recognized canonical alias.

Examples:
- `postgres` ↔ `postgresql`
- `js` ↔ `javascript`
- `ts` ↔ `typescript`

### Step 5 — Score

```text
score = round(
  100 * sum(weight of matched terms) /
  sum(weight of all selected terms)
)
```

Limit keyword set to top 20–30 terms.

## UI

### Score block
Large score:
`78%`

Label:
`Keyword coverage`

Subtext:
`Based on the skills and terms emphasized in this job description.`

### Matched
Green/positive chips.

### Missing
Neutral/amber chips.

### Suggested focus
Top 3–5 missing high-weight terms:
`Consider emphasizing: AWS, CI/CD, distributed systems`

## No job description state

Title:
`Add a job description to unlock match insights`

Button:
`Edit application`

## No tailored resume state

Handled before entering Match Studio:
create tailored resume first.

## Recalculate

Recompute:
- on page load
- after save

A manual `Refresh score` button is optional.

## AI enhancement

Optional only.

If enabled:
Button:
`Suggest stronger wording`

AI must:
- suggest edits,
- never auto-overwrite resume,
- preserve truthfulness,
- return suggestions for user approval.

If API fails:
show:
`Suggestions are temporarily unavailable. Match insights still work.`

Core matching must remain fully functional.
