import { PaperProvider } from "react-native-paper";
import { AppwriteProvider } from "./context/appwriteAuthContext";
import Router from "./routes/Router";
import { StripeProvider } from '@stripe/stripe-react-native';
import storage from "local-storage-fallback";
import { registerTranslation, en } from 'react-native-paper-dates';
import conf, { isConfigValid } from "./conf/conf";
import ConfigErrorScreen from "./components/ConfigErrorScreen";

registerTranslation('en', en);

export default function App() {
  if (typeof window !== 'undefined' && !('localStorage' in window)) {
    window.localStorage = storage;
  }

  if (!isConfigValid()) {
    return (
      <PaperProvider>
        <ConfigErrorScreen />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <AppwriteProvider>
        <StripeProvider publishableKey={conf.stripe_publishable_key || 'pk_test_placeholder'}>
          <Router />
        </StripeProvider>
      </AppwriteProvider>
    </PaperProvider>
  );
}