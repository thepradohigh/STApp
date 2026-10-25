import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const TARGET_URL = "https://thepradohigh.github.io/STApp/";

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: TARGET_URL }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ffffff",
  },
  webview: {
    flex: 1,
  },
});
