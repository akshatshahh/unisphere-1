import { View, Text, StyleSheet } from 'react-native';

export default function ConfigErrorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuration missing</Text>
      <Text style={styles.message}>
        Appwrite and Stripe are not configured. Create a .env file in the project root from .sample.env and fill in:
      </Text>
      <Text style={styles.list}>
        • EXPO_PUBLIC_APPWRITE_ENDPOINT{'\n'}
        • EXPO_PUBLIC_APPWRITE_PROJECT_ID{'\n'}
        • EXPO_PUBLIC_APPWRITE_DB_ID{'\n'}
        • … (all other EXPO_PUBLIC_* and Stripe keys from .sample.env)
      </Text>
      <Text style={styles.hint}>
        Then restart the dev server (npm start).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#b91c1c',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    color: '#374151',
  },
  list: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});
