# Appwrite setup from scratch (new account)

Follow these steps in order. You’ll create a project, database, collections, storage, and team so the app can run and you can sign up / log in.

---

## 1. Create a project and get IDs

1. Go to **[cloud.appwrite.com](https://cloud.appwrite.com)** and sign in.
2. Click **Create project**.
3. Name it (e.g. `UniSphere`) and click **Create**.
4. Open **Settings** (gear icon) in the left sidebar.
5. Copy and save:
   - **API Endpoint** → use as `EXPO_PUBLIC_APPWRITE_ENDPOINT` (e.g. `https://cloud.appwrite.com/v1`) https://sfo.cloud.appwrite.io/v1
   - **Project ID** → use as `EXPO_PUBLIC_APPWRITE_PROJECT_ID`- 69b997a50012b5c01779

---

## 2. Enable Auth (email/password)

1. In the left sidebar go to **Auth** → **Settings**.
2. Under **Email/Password**, turn **Enable** on.
3. Leave **Email verification** off for now (you can enable it later).
4. Save.

---

## 3. Create the database and collections

1. Go to **Databases** → **Create database**.
2. Name it (e.g. `unisphere_db`) → **Create**.
3. Copy the **Database ID** from the database overview → use as `EXPO_PUBLIC_APPWRITE_DB_ID`.- 69b9990200289a2d6ea6

Create each collection below **inside this database**. For each collection, use **Create collection**, set the **Collection ID** exactly as written (you’ll put these in `.env` later).

### Collection 1: `students`

- **Collection ID:** `students` → use as `EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID` =students
- **Attributes** (after creation, go to the collection → **Attributes** → Add attribute for each):

  | Key         | Type   | Size/Options | Required |
  |------------|--------|--------------|----------|
  | name       | string | 255          | Yes      |
  | email      | string | 255          | Yes      |
  | university | string | 255          | Yes      |
  | roll       | string | 100          | Yes      |
  | contact    | string | 50           | Yes      |

- **Permissions:** Under **Settings** for this collection, add **Any** role **read** and **create** (or restrict to “users” later).

### Collection 2: `universities`

- **Collection ID:** `universities` → use as `EXPO_PUBLIC_APPWRITE_UNIVERSITY_COLLECTION_ID`
- **Attributes:**

  | Key         | Type   | Size/Options | Required |
  |------------|--------|--------------|----------|
  | name       | string | 255          | Yes      |
  | checkURL   | string | 500          | No       |
  | subscribed | boolean| —            | Yes      |

- **Permissions:** **Any** **read** (so the app can list universities).

- **One document for sign-up:** Create one document (e.g. **Add document**) with:
  - `name`: `Test University`
  - `checkURL`: leave empty. The app will still show this university and let you sign up using your form data (no external student-check API needed).
  - `subscribed`: `true`  
  When you have a real student-verification API, set `checkURL` to that API’s URL so sign-up validates against it.

### Collection 3: `events`

- **Collection ID:** `events` → use as `EXPO_PUBLIC_APPWRITE_EVENT_COLLECTION_ID`
- **Attributes:**

  | Key                 | Type    | Size/Options | Required |
  |---------------------|---------|--------------|----------|
  | poster              | string  | 500          | No       |
  | price               | string  | 50           | No       |
  | event_name          | string  | 255          | Yes      |
  | event_description  | string  | 2000         | No       |
  | scope               | string  | 50           | Yes      |
  | registration_start | string  | 50           | No       |
  | registration_end   | string  | 50           | No       |
  | event_ends          | string  | 50           | No       |
  | event_starts        | string  | 50           | No       |
  | university_id       | string  | 100          | Yes      |
  | venue               | string  | 255          | No       |
  | organizer_name      | relation| —            | No       |

- For **organizer_name**: relation to collection **students**, “One relation” (one organizer per event).
- **Permissions:** **Any** **read**, **create** (or restrict later).

### Collection 4: `event_attend` (event registrations)

- **Collection ID:** `event_attend` → use as `EXPO_PUBLIC_APPWRITE_EVENT_ATTEND_COLLECTION_ID`
- **Attributes:**

  | Key        | Type   | Required |
  |-----------|--------|----------|
  | student_id| string | Yes      |
  | event_id  | string | Yes      |

- **Permissions:** **Any** **read** and **create**.

### Collection 5: `transactions`

- **Collection ID:** `transactions` → use as `EXPO_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID`
- **Attributes:**

  | Key      | Type   | Required |
  |----------|--------|----------|
  | userId   | string | Yes      |
  | eventId  | string | Yes      |
  | txn_id   | string | Yes      |

- **Permissions:** **Any** **read** and **create** (or restrict later).

### Collection 6: `announcements`

- **Collection ID:** `announcements` → use as `EXPO_PUBLIC_APPWRITE_ANNOUNCEMENTS_COLLECTION_ID`
- **Attributes:**

  | Key           | Type   | Size  | Required |
  |---------------|--------|-------|----------|
  | title         | string | 255   | Yes      |
  | description   | string | 2000  | No       |
  | university_id | string | 100   | Yes      |
  | organizer     | string | 100   | No       |
  | date          | string | 50    | No       |

- **Permissions:** **Any** **read** and **create**.

---

## 4. Create a storage bucket

1. Go to **Storage** → **Create bucket**.
2. Name it (e.g. `posters`), **Create**.
3. Copy **Bucket ID** → use as `EXPO_PUBLIC_APPWRITE_BUCKET_ID`. 69b9abef002e0e0fc427
4. In bucket **Settings**, set **File security** so the app can read/create (e.g. allow **Any** read and create for now).

---

## 5. Create the organizers team

1. Go to **Auth** → **Teams** → **Create team**.
2. Name it (e.g. `Organizers`) → **Create**.
3. Open the team and copy **Team ID** → use as `EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID`. 69b9ac5c003591f52c24

(You can add members to this team later; the app uses it to know who is an “organizer”.)

---

## 6. Function (optional at first)

The app uses a Cloud Function for Stripe payment intents. You can skip this and set a placeholder until you add payments.

1. Go to **Functions** → create a function if you want payments later.
2. Copy **Function ID** → use as `EXPO_PUBLIC_APPWRITE_FUNCTION_ID`.  
   If you skip it, put a placeholder in `.env` (e.g. `placeholder`) so the app doesn’t break; payment flows will fail until the function is set up.

---

## 7. Fill your `.env` file

Open the **`.env`** file in the project root and set (use the IDs you copied):

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.com/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_APPWRITE_DB_ID=your_database_id_here
EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID=students
EXPO_PUBLIC_APPWRITE_UNIVERSITY_COLLECTION_ID=universities
EXPO_PUBLIC_APPWRITE_EVENT_COLLECTION_ID=events
EXPO_PUBLIC_APPWRITE_EVENT_ATTEND_COLLECTION_ID=event_attend
EXPO_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID=transactions
EXPO_PUBLIC_APPWRITE_ANNOUNCEMENTS_COLLECTION_ID=announcements
EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id_here
EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID=your_team_id_here
EXPO_PUBLIC_APPWRITE_FUNCTION_ID=placeholder
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
```

Replace `your_project_id_here`, `your_database_id_here`, `your_bucket_id_here`, `your_team_id_here` with the values from the Appwrite console. If you used different collection IDs, use those instead.

Then **restart the dev server** (`npm start`) and reload the app.

---

## 8. Sign-up and “Select University”

- **Select University** shows all universities from the database. You added one with `name: Test University` and `subscribed: true`; it will appear in the dropdown.
- If a university has **checkURL** set, sign-up calls that API to validate the student. If **checkURL** is empty, the app uses the data you type (name from email, enrolment “N/A”, contact from mobile) so you can sign up without any external API.
- **First user:** Use **Sign Up** in the app (not Login). Choose “Test University”, enter email, mobile, password and sign up. After that you can use **Login** with the same email/password.

---

## 9. Make a user an admin (organizer) so they can add events

Only users in the **Organizers** team can add events, see “Scan” / “Stats” on events, and get organizer-only UI.

1. In Appwrite go to **Auth** → **Teams**.
2. Open the **Organizers** team (the one whose ID is in `EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID`).
3. Click **Add member** (or **Invite**).
4. Enter the **user’s email** (they must already have signed up in the app once).
5. Choose a role (e.g. **Owner** or **Member**) and confirm.
6. The user must **log out and log back in** in the app (or close and reopen) so the app refreshes their team membership.

After that, when they log in they will have organizer features: “Add event/announcement” on Home, “Scan” and “Stats” on their events, etc.

---

## 10. Add event not working – checklist

If you can't create an event: (1) **Organizer** – Add your user to the Organizers team, then log out and in again. (2) **Events collection** – Allow Create (and Read) for Users/Any. (3) **Storage bucket** – Allow Create and Read for Users/Any so poster upload works. (4) **organizer_name** – Must be a Relation to **students** (one). (5) **poster** – Should be optional on events.

### "Unknown attribute: organizer_name" error

The **events** collection must have an attribute named **organizer_name**. Add it in Appwrite:

1. Go to **Databases** → your database → **events** collection.
2. Open **Attributes** → **Create attribute**.
3. Choose **Relation**.
4. **Key:** `organizer_name` (exactly).
5. **Related collection:** `students`.
6. **Type:** One relation (one organizer per event).
7. Create the attribute, then try creating an event again.

---

## Quick checklist

- [ ] Project created → Endpoint + Project ID in `.env`
- [ ] Auth → Email/Password enabled
- [ ] Database created → DB ID in `.env`
- [ ] Collections: students, universities, events, event_attend, transactions, announcements (with attributes above)
- [ ] One university document with `subscribed: true` (and optionally `checkURL` for sign-up)
- [ ] Storage bucket created → Bucket ID in `.env`
- [ ] Organizers team created → Team ID in `.env`
- [ ] `.env` filled and dev server restarted
