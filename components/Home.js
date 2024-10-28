import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "./Actions/authActions";

// component
import Dashboard from "./Manage/Dashboard";
import Dish from "./Manage/Dish";
import Shopping from "./Manage/Shopping";

const Home = (props) => {
  const [routeflag, setRouteflag] = useState("dashboard");

  const setrouteflagfunc = (flag) => {
    setRouteflag(flag);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollview}>
        {routeflag === "dashboard" ? (
          <Dashboard />
        ) : routeflag === "dish" ? (
          <Dish setrouteflagfunc={setrouteflagfunc} />
        ) : routeflag === "shopping" ? (
          <Shopping />
        ) : null}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={
            routeflag === "dashboard" ? styles.actfooterbtn : styles.footerbtn
          }
          onPress={() => setRouteflag("dashboard")}
        >
          <Text>
            {routeflag === "dashboard" ? (
              <Ionicons name="md-home-sharp" color="#12947c" size={24} />
            ) : (
              <Ionicons name="home-outline" color="#12947c" size={24} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={routeflag === "dish" ? styles.actfooterbtn : styles.footerbtn}
          onPress={() => setRouteflag("dish")}
        >
          <Text>
            {routeflag === "dish" ? (
              <AntDesign name="clockcircle" color="#12947c" size={22} />
            ) : (
              <AntDesign name="clockcircleo" color="#12947c" size={22} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            routeflag === "shopping" ? styles.actfooterbtn : styles.footerbtn
          }
          onPress={() => setRouteflag("shopping")}
        >
          <Text>
            {routeflag === "shopping" ? (
              <FontAwesome name="shopping-cart" color="#12947c" size={24} />
            ) : (
              <AntDesign name="shoppingcart" color="#12947c" size={24} />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerbtn}
          onPress={() => props.logoutUser()}
        >
          <Text>
            <AntDesign name="logout" color="#12947c" size={22} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fc",
    alignItems: "center",
  },
  scrollview: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "85%",
  },
  footerbtn: {
    borderColor: "transparent",
    borderWidth: 5,
    borderRadius: 5,
    borderStyle: "solid",
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
  },
  actfooterbtn: {
    borderColor: "transparent",
    borderWidth: 5,
    borderRadius: 5,
    borderStyle: "solid",
    borderBottomColor: "#12947c",
    paddingBottom: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
  },
});

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Home);
