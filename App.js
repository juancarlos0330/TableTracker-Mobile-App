import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

// components
import Main from "./components/Main";
import configureStore from "./components/configureStore";

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
