import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// components
import Home from "./Home";
import Login from "./Auth/Login";

const Main = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require("../assets/image/background.jpg")}
        style={styles.container}
      >
        {props.auth.isAuthenticated ? <Home /> : <Login />}
        {props.loading.loading && (
          <View style={styles.loadingView}>
            <Image
              source={require("../assets/image/loading.gif")}
              style={{ width: 140, height: 140 }}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingView: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
});

const ActionCreators = Object.assign({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
