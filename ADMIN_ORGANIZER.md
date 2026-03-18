# How to make admin / organizer users (add events)

Users who can **add events**, **scan tickets**, and see **organizer-only** options are those in the **Organizers** team in Appwrite.

## Steps

1. **Appwrite Console** → [cloud.appwrite.com](https://cloud.appwrite.com) → your project.
2. Go to **Auth** → **Teams**.
3. Open the team you use as organizers (the one whose **Team ID** is in your `.env` as `EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID`).
4. Click **Add member** (or **Invite**).
5. Enter the **email** of the user (they must have signed up in the app at least once).
6. Assign a role (e.g. **Member** or **Owner**) and save.
7. That user should **log out and log back in** in the app (or restart the app) so their organizer status is updated.

After re-login they will see organizer features: add events/announcements, Scan QR, Stats on events, etc.
