# Badger Future Founders (BFF) — Website README

### Built by Group 4 | INFO SYS 424, Spring 2026 | University of Wisconsin–Madison

---

## What Is This Site?

This is the official website for **Badger Future Founders (BFF)**, a student entrepreneurship organization at UW–Madison. It was rebuilt from scratch in Spring 2026 to replace an unmaintainable React/Vercel codebase with something simple enough that any future exec board member — technical or not — can pick up and manage.

**Tech stack:**

- HTML, CSS (Bulma framework), Vanilla JavaScript
- Firebase Authentication (admin login)
- Firebase Firestore (database)
- Firebase Hosting (deployment)

No React. No build tools. No npm. Open any `.html` file in a text editor and you can read it immediately — that was an intentional design decision.

---

## Who Is This Site For?

The site serves three audiences:

| Audience                                | What they can do                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------------------- |
| **Public visitors / potential members** | Browse upcoming events, learn about BFF, submit a membership application            |
|  |
| **Admin / Exec Board**                  | Log in, review applications, accept or decline applicants, create and manage events |

Push this site link to **all current members and potential new members**. It is their home base for checking upcoming events, connecting with the team, asking questions, and getting to know BFF.

---

## Pages Overview

| File               | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `Index.html`       | Homepage — hero banner, BFF intro, call to action |
| `about.html`       | About BFF, mission, team info                     |
| `events.html`      | Upcoming events, open to everyone                 |
| `get-started.html` | Apply and Admin login portal — exec board only    |

---

## How Customization Works (For Future Dev Teams)

> **Good news: you don't need to know much code to update this site.**

### Changing Text

Every page is a plain `.html` file. Open it in any text editor (VS Code recommended). Look for text between `<p>`, `<h1>`, `<h2>`, `<span>`, or similar tags and change it directly. Save and redeploy.

### Changing Images

Images are stored in the `/images` folder (or referenced inline). To swap an image:

1. Drop your new image into the `/images` folder with the same filename as the old one, OR
2. Find the `<img src="...">` tag in the HTML and update the `src` path to your new file.

### Changing Colors / Theme

Colors are controlled in `style.css`. The BFF brand red is `#cc0000`. To change the color theme, search `style.css` for color values (they look like `#cc0000` or `color: red`) and update them. Bulma utility classes (like `is-danger`, `is-dark`) also control colors — you can swap these in the HTML directly.

### Changing Fonts

Fonts are loaded at the top of `style.css` via a `@import` Google Fonts URL. Change the font name in that URL and update the `font-family` property in the body rule. [Google Fonts](https://fonts.google.com) is free and has hundreds of options.

### Changing Layout

The site uses [Bulma CSS](https://bulma.io/documentation/). Every layout element uses Bulma classes like `columns`, `column`, `card`, `hero`, etc. The Bulma docs at bulma.io explain every class. Bulma handles all the responsive design — you don't need to write media queries.

---

## Admin System — How It Works

> **Only admins can log in. The login page is `get-started.html`.**

### What Admins Can Do

Once logged in, admins can:

- **Review membership applications** submitted through the `apply.html` form
- **Accept or decline applicants** — accepting moves them into the `members` (users) collection in Firestore automatically
- **Create new events** — these appear live on `events.html` for all visitors

### How to Become an Admin

Admin accounts must be **created manually**. There is no public sign-up for admins — this is intentional to keep the system secure.

To add a new admin:

**Step 1 — Create the account in Firebase Authentication:**

1. Go to [Firebase Console](https://console.firebase.google.com) → select the BFF project
2. Click **Authentication** in the left sidebar
3. Click **Add user**
4. Enter the new exec member's email and a temporary password
5. Click **Add user** to confirm

**Step 2 — Set their role in Firestore:**

1. In Firebase Console, click **Firestore Database** in the left sidebar
2. Navigate to the `users` collection
3. Find the document with the new user's email (it may have been auto-created on first login — if not, create it manually)
4. Add a field: `role` → type `string` → value `admin`
5. Save

That's it. The next time they log in at `get-started.html`, they will have full admin access.

**To remove admin access:** go back to Firestore → find their document → change `role` from `admin` to `member` (or delete the field). Optionally remove them from Firebase Auth as well.

---

## How Firestore Works (Plain English)

Firebase Firestore is your database. Think of it like a filing cabinet:

- **Collections** are like drawers (e.g., `users`, `applications`, `events`)
- **Documents** are like individual folders inside each drawer (e.g., one document per user)
- **Fields** are the data inside each folder (e.g., `name`, `email`, `role`)

### Your Collections

| Collection     | What It Stores                                                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`        | Accepted members + admins. Each document has name, email, role, etc.                                                                                      |
| `applications` | Pending membership applications submitted via `apply.html`. Fields include name, email, major, year, reason, and `status` (pending / accepted / declined) |
| `events`       | Events created by admins. Each document has title, date, description, location                                                                            |
|  |

### Viewing / Editing Data

Go to [Firebase Console](https://console.firebase.google.com) → Firestore Database → browse collections. You can add, edit, or delete documents directly from the console without touching any code.

---

## Application & Review Flow

1. A prospective member fills out the form on `apply.html` and submits
2. Their data lands in the `applications` collection with `status: "pending"`
3. An admin logs in at `get-started.html`
4. The admin sees all pending applications listed with each person's details
5. Admin clicks **Accept** → the applicant's data is copied into the `users` collection (now a member), and their application `status` updates to `"accepted"`
6. Admin clicks **Decline** → `status` updates to `"declined"`, nothing else happens
7. Accepted members appear in the member list on the admin dashboard

---

## How to Deploy Updates

The site is hosted on **Firebase Hosting**. To push any code changes live:

```bash
# From the project root directory
firebase deploy --only hosting
```

If you only changed Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

To deploy everything:

```bash
firebase deploy
```

You'll need the Firebase CLI installed (`npm install -g firebase-tools`) and to be logged in (`firebase login`).

---

## GitHub Repository

The codebase lives at: `https://github.com/cpmcginley-bot/IS424-BFF`

**Git basics for the next team:**

- Always run `git pull` before you start working — this prevents merge conflicts
- Never run `git init` inside the project folder (it already has Git set up)
- Commit messages should be short and clear: `"Add spring events to events page"` not `"update"`

---

## Passing This Along — Checklist for Outgoing Exec Board

When handing off to the next exec board, make sure they have:

- [ ] Access to the Firebase project (`badgerff`) — invite them at Firebase Console → Project Settings → Users and permissions
- [ ] The GitHub repo — add them as a collaborator
- [ ] The Firebase Hosting URL (your live site URL)
- [ ] This README
- [ ] At least one existing admin account they can log in with, OR walk them through creating their own (see Admin section above)
- [ ] Confirmation that they can log in to `get-started.html` and see the admin dashboard

**Recommend they read:** the Customization section above before touching any code.

---

## Contact / Built By

**Group 4 — INFO SYS 424, Spring 2026**

Questions about the codebase? Start with Collin McGinley or Jason Reetz. Questions about the database structure? Check the Firestore section of this README first.

---

_Built with HTML, Bulma CSS, Vanilla JS, and Firebase. Intentionally simple — so it lasts._
