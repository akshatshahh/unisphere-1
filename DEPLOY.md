# UniSphere – Production deployment checklist

Follow this sequence to build and deploy the app for real devices (Android and iOS).

## 1. Log in to Expo

```bash
npx eas login
```

Sign in with your Expo account. For CI, use an `EXPO_TOKEN` instead (see [Expo programmatic access](https://docs.expo.dev/accounts/programmatic-access/)).

## 2. Set environment variables for EAS

In the [Expo dashboard](https://expo.dev) → your project → **Secrets**, add every variable from `.sample.env`:

- `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
- `EXPO_PUBLIC_APPWRITE_STUDENT_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_UNIVERSITY_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_EVENT_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_DB_ID`
- `EXPO_PUBLIC_APPWRITE_BUCKET_ID`
- `EXPO_PUBLIC_APPWRITE_ORGANIZERS_TEAM_ID`
- `EXPO_PUBLIC_APPWRITE_FUNCTION_ID`
- `EXPO_PUBLIC_APPWRITE_EVENT_ATTEND_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_ANNOUNCEMENTS_COLLECTION_ID`
- `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Without these, the app will build but API calls will fail at runtime.

## 3. Install dependencies and build

```bash
npm install
npx eas build --platform all --profile production
```

- Use `--profile preview` for internal testing (no store submission).
- Builds run in the cloud; download the **APK** (Android) and **IPA** (iOS) from the EAS build page when done.

## 4. Install on devices

- **Android:** Install the APK on a device or use the build link from EAS.
- **iOS:** Install via TestFlight or the provided link (internal distribution).

## 5. (Optional) Submit to stores

After a production build:

```bash
npx eas submit --platform all --profile production
```

Configure credentials in the Expo dashboard or when prompted by EAS.
