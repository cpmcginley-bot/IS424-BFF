# BFF Group 4: Sprint 1 - Homepage Design & Implementation

**Sprint Duration**: 2 weeks (10 working days)  
**Sprint Goal**: Design and implement a functional, responsive homepage for BFF (Badger Future Founders)  
**Team**: Collin McGinley, Jason Reetz, Deven Grover, Arun Lal, Calvin Schwake

---

## 1. TRELLO BOARD

**Trello Board Link**: [Insert link here]

The Trello board tracks all sprint tasks across three lists: To Do, In Progress, and Done. Each card includes estimated hours, assigned owner, start date, and hours spent. The board is updated daily to reflect team progress.

---

## 2. USER STORIES

### User Story 1: Prospective Member Discovery

As a prospective member,
I want to understand what BFF is, what events they run, and what they’ve done in the past,
so that I can decide if joining the club is something I’m interested in.

**Acceptance Criteria**:
- [ ] Homepage displays BFF's mission statement (clear, one-paragraph intro)
- [ ] Main navigation includes links to: Home, About, Events, Members, Apply, etc
- [ ] Clear "Learn More" call-to-action button is visible above the fold
- [ ] Homepage is accessible (readable text contrast, keyboard navigation works)

---

### User Story 2: Member Event Discovery

As an executive member of BFF,
I want to update event information, highlight upcoming meetings, and manage homepage content,
so that the website always reflects current club activity and engagement.

**Acceptance Criteria**:
- [ ] Each event displays: Event Name, Date, Time, Location, "RSVP" or "Learn More" button
- [ ] Events are sorted by date (soonest first)
- [ ] Clicking on an event name/button provides more details
- [ ] Event section is visually distinct from other homepage sections

---

## 3. TASK BREAKDOWN & BURNDOWN CHART

### Sprint Tasks

| Task | Corresponding User Story | Duration | Priority | Complexity | Lead Person |
|------|--------------------------|----------|----------|-----------|-------------|
| Design main page layout wireframe | 1, 2 | 6 hours | 10 | Low | Collin |
| Create Justinmind prototype | 1, 2 | 12 hours | 8 | Low | Deven |
| Implement HTML/CSS for main page | 1, 2 | 16 hours | 10 | Medium | Collin |
| Build interactive navigation menu | 1 | 4 hours | 8 | Low | Jason |
| Build event display component (JavaScript) | 2 | 6 hours | 7 | Medium | Jason |
| Form validation (login/signup) | 1 | 4 hours | 6 | Low | Jason |
| Page testing across browsers | 1, 2 | 4 hours | 7 | Low | Jason |
| Sprint review meeting + retrospective | 1, 2 | 2 hours | 5 | Low | Deven |
| Git merge + documentation | 1, 2 | 3 hours | 6 | Low | Calvin |
| Trello & burndown chart management | All | 12 hours (distributed) | 5 | Low | Arun |
| **TOTALS** | — | **69 hours** | — | — | — |

---

## 4. BURNDOWN CHART

### Burndown Chart - Day 5 (End of Week 1)

[**Insert screenshot of burndown chart here**]

**Status at Day 5**:
- Hours planned: 69
- Hours completed: [Fill in actual]
- Hours remaining: [Fill in actual]
- Cards completed: [X/Y]
- Velocity trend: [On track / Ahead / Behind]
- Key blockers: [List any]

---

### Burndown Chart - Day 9 (End of Week 2)

[**Insert screenshot of burndown chart here**]

**Status at Day 9**:
- Hours planned: 69
- Hours completed: [Fill in actual]
- Hours remaining: [Fill in actual]
- Cards completed: [X/Y]
- Velocity trend: [On track / Ahead / Behind]
- Key blockers: [List any]

---

## 5. GITHUB REPOSITORY

**Repository URL**: [Insert link to public GitHub repo]

**Repository Structure**:
```
bff-homepage/
├── /src
│   ├── index.html          (main homepage)
│   ├── /css
│   │   └── style.css       (custom CSS, alongside Bulma)
│   └── /js
│       ├── main.js         (initialization & page setup)
│       ├── nav.js          (navigation functionality)
│       └── events.js       (event display & filtering)
├── /images
│   ├── bff-logo.png
│   ├── hero-image.jpg
│   └── [other images used]
├── /prototypes
│   ├── homepage.proto      (Justinmind file)
│   ├── homepage-screenshot-1.png
│   ├── homepage-screenshot-2.png
│   └── homepage-screenshot-3.png
├── .gitignore
├── README.md               (this file)
└── LICENSE
```

**How to Run Locally**:
1. Clone the repository: `git clone [repo-url]`
2. Navigate to the project: `cd bff-homepage`
3. Open `src/index.html` in a web browser
4. Or use a local server: `python3 -m http.server` and visit `localhost:8000/src`

**Branch Strategy**: Feature branches (e.g., `feature/homepage-nav`) merged to `main` after code review.

---

## 6. DAILY SCRUM MEETINGS

### Scrum #1 - Day 3 (End of Week 1)

**Date**: [3/12/26]  
**Attendees**: Collin McGinley, Jason Reetz, Deven Grover, Arun Lal, Calvin Schwake  
**All present**: ✓ Yes / ✗ No

| Name | What did you do yesterday? | What are you doing today? | Blockers |
|------|---------------------------|--------------------------|----------|
| **Collin** | Designed main page layout, created wireframe, started HTML | Continue HTML/CSS implementation, review Deven's prototype | None |
| **Jason** | Designed navigation layout | Help Calvin with Git workflow, continue coding navigation menu, integrate with wireframe | None |
| **Deven** | Wrote user stories, started Justinmind prototype | Complete prototype design, share with Collin for feedback | None |
| **Arun** | Set up Trello board, configured burndown chart, created task cards | Daily Trello updates, start collecting hours from team | None |
| **Calvin** | Set up GitHub repository structure, created README template | Help Jason with Git workflow, prepare for scrum documentation | None |

---

### Scrum #2 - Day 8 (End of Week 2)

**Date**: [Insert date]  
**Attendees**: Collin McGinley, Jason Reetz, Deven Grover, Arun Lal, Calvin Schwake  
**All present**: ✓ Yes / ✗ No

| Name | What did you do yesterday? | What are you doing today? | Blockers |
|------|---------------------------|--------------------------|----------|
| **Collin** | [Fill in] | [Fill in] | [Fill in] |
| **Jason** | [Fill in] | [Fill in] | [Fill in] |
| **Deven** | [Fill in] | [Fill in] | [Fill in] |
| **Arun** | [Fill in] | [Fill in] | [Fill in] |
| **Calvin** | [Fill in] | [Fill in] | [Fill in] |

---

## 7. SPRINT REVIEW & RETROSPECTIVE

**Sprint Review Date**: [Insert date - should be Day 10]  
**Time**: [Insert time]  
**Location**: [Insert location/Zoom link]

**Our Team Present**: Collin McGinley, Jason Reetz, Deven Grover, Arun Lal, Calvin Schwake

**Invited Team**: [Team name]  
**Invited Team Present**: ✓ Yes / ✗ No (list who attended)

---

### Retrospective Questions & Answers

#### Q1: What did you learn from doing our first sprint?

**Answer**:  
[Team discusses what they learned about Agile, team workflows, prototyping, development, project management, etc. Write 3-4 sentences.]

---

#### Q2: What went well? Why?

**Answer**:  
[Discuss what worked smoothly: good delegation? Strong prototype feedback? Clean Git workflow? Clear task breakdown? Write 3-4 sentences and explain WHY.]

---

#### Q3: What didn't go well? Why not?

**Answer**:  
[Discuss challenges: missed deadlines? Unclear requirements? Communication issues? Technical blockers? Write 3-4 sentences and explain WHY.]

---

#### Q4: How can you make things better next time?

**Answer**:  
[Specific improvements for Sprint 2: better task estimates? More frequent standups? Clearer handoff between design and development? Write 3-4 action items.]

---

#### Q5: Are you satisfied with what you already completed?

**Answer**:  
[Discuss overall satisfaction: Did the homepage meet user story acceptance criteria? Does it look like the prototype? Is the code clean? Scale 1-10 with explanation.]

---

#### Q6: Which group was invited? What are your observations/notes? Were they all present?

**Answer**:  
[Invited team: [name]]  
[Feedback from invited team: What did they think of the homepage? Any suggestions? Any bugs they found?]  
[Attendance: [List who attended from invited team]]

---

## 8. SPRINT METRICS SUMMARY

**Sprint Planning Estimate**: 69 hours  
**Actual Hours Completed**: [Fill in after Day 10]  
**Velocity**: [Completed / Planned = X%]

**Cards Planned**: 10  
**Cards Completed**: [Fill in after Day 10]  
**Completion Rate**: [X%]

**Key Blockers Encountered**:
- [Blocker 1 and how it was resolved]
- [Blocker 2 and how it was resolved]

**Team Capacity Insights**:
- Were estimates accurate?
- Did any tasks take significantly longer/shorter than expected?
- Should the team adjust estimates for Sprint 2?

---

## 9. SUBMISSION CHECKLIST

**Before submitting, verify all items below:**

- [ ] **README.md** is complete with all sections filled in
- [ ] **Prototypes folder** includes:
  - [ ] Justinmind `.proto` file (or `.xd` if using XD)
  - [ ] At least 3 screenshots of the prototype
  - [ ] Screenshots are clearly labeled (e.g., `homepage-full.png`, `mobile-view.png`)
- [ ] **src folder** includes:
  - [ ] `index.html` (main page)
  - [ ] `css/style.css` (custom CSS)
  - [ ] `js/main.js`, `js/nav.js`, `js/events.js` (JavaScript modules)
  - [ ] All files are properly linked (images load, CSS applies, JS runs)
- [ ] **images folder** includes all images used on the page
- [ ] **GitHub repo** is public and all files are pushed to `main` branch
- [ ] **Trello board link** is in README and board is public
- [ ] **Burndown chart screenshots** are clear and labeled by day
- [ ] **All team members' names** are listed with their roles
- [ ] **Links tested**: Trello board works, GitHub repo is accessible, screenshots load
- [ ] **README is proofread**: No typos, consistent formatting, professional tone
- [ ] **All files are in one folder** named `Group4_D2` (per course naming convention)
- [ ] **Folder is zipped** and ready to upload

---

## 10. KEY FILES & DELIVERABLES

| Deliverable | Owner | Location | Status |
|-------------|-------|----------|--------|
| User Stories (2) | Deven | This README (Section 2) | ⬜ In Progress |
| Justinmind Prototype | Deven | `/prototypes/homepage.proto` | ⬜ In Progress |
| Prototype Screenshots | Deven | `/prototypes/*.png` | ⬜ In Progress |
| HTML Implementation | Collin | `/src/index.html` | ⬜ In Progress |
| CSS Styling | Collin | `/src/css/style.css` | ⬜ In Progress |
| JavaScript Components | Jason | `/src/js/*.js` | ⬜ In Progress |
| Trello Board | Arun | Link in Section 1 | ⬜ In Progress |
| Burndown Charts (2) | Arun | This README (Section 4) | ⬜ In Progress |
| Scrum Meetings (2) | Calvin | This README (Section 6) | ⬜ In Progress |
| Sprint Review | Deven + Team | This README (Section 7) | ⬜ In Progress |
| GitHub Repo | Calvin | Link in Section 5 | ⬜ In Progress |

---

## 11. TEAM ROLES & RESPONSIBILITIES

| Person | Role | Key Deliverables | Hours |
|--------|------|-------------------|-------|
| **Collin McGinley** | Lead Developer | Page design, HTML/CSS/JS implementation, client communication | 30 |
| **Jason Reetz** | Developer | JavaScript components, code review, testing | 18 |
| **Deven Grover** | Designer + Scrum Facilitator | User stories, Justinmind prototype, sprint review | 22 |
| **Arun Lal** | Operations | Trello board, burndown chart, daily tracking | 12 |
| **Calvin Schwake** | Repository Owner + Scrum Recorder | GitHub setup, scrum documentation, README assembly | 10 |

---

## 12. NOTES & OBSERVATIONS

[Space for team to add any additional notes about the sprint, lessons learned, or adjustments for next sprint.]

---

**Sprint End Date**: [Insert date]  
**Submitted By**: [Name]  
**Date Submitted**: [Date]  
**Submission Link**: [Link to zipped folder or Canvas submission]

---

**End of Sprint 1 Submission**
