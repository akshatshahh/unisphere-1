# How to fix "Configuration missing"

The app needs your **Appwrite** and **Stripe** IDs in a `.env` file. Follow these steps:

## 1. Open the `.env` file

In the project root there is a file named **`.env`**. Open it in your editor.

## 2. Get your Appwrite values

1. Go to [Appwrite Cloud](https://cloud.appwrite.com) and sign in (or create a project).
2. Open your project → **Settings** (gear) → copy:
   - **API Endpoint** → paste as `EXPO_PUBLIC_APPWRITE_ENDPOINT`
   - **Project ID** → paste as `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
3. Go to **Databases** → your database → copy **Database ID** → `EXPO_PUBLIC_APPWRITE_DB_ID`
4. Open each collection (Students, Universities, Events, etc.) and copy its **Collection ID** into the matching variable in `.env` (e.g. Students → `EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID`).
5. **Storage** → your bucket → **Bucket ID** → `EXPO_PUBLIC_APPWRITE_BUCKET_ID`
6. **Teams** → your organizers team → **Team ID** → `EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID`
7. **Functions** → your function → **Function ID** → `EXPO_PUBLIC_APPWRITE_FUNCTION_ID`
8. Fill the rest: Event Attend, Transactions, Announcements collection IDs the same way (from each collection’s settings).

## 3. Get your Stripe key (optional for login)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
2. Copy the **Publishable key** (starts with `pk_`).
3. Paste it as `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.env`.

(You can leave Stripe empty for now if you only want to test login; use a placeholder like `pk_test_placeholder` if the app requires a value.)

## 4. Restart the app

After saving `.env`:

1. Stop the dev server (Ctrl+C in the terminal where `npm start` is running).
2. Run **`npm start`** again.
3. Reload the app on your phone (or scan the QR code again).

Expo only reads `.env` when the server starts, so a restart is required after any change to `.env`.
