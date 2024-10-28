import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../Actions/authActions";

const Login = (props) => {
  const [viewflag, setViewflag] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rusername, setRusername] = useState("");
  const [remail, setRemail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [rconpassword, setRconpassword] = useState("");

  const loginfunc = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  const signfunc = (e) => {
    e.preventDefault();
    const userData = {
      username: rusername,
      email: remail,
      password: rpassword,
      password2: rconpassword,
    };
    props.registerUser(userData);
  };

  return (
    <View style={styles.container}>
      {viewflag ? (
        <View style={styles.maincontainer}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Sign Up</Text>
          </View>
          <View style={styles.errorView}>
            {props.errors.username && (
              <Text style={styles.errormsg}>{props.errors.username}</Text>
            )}
          </View>
          <View
            style={
              props.errors.username ? styles.errinputView : styles.inputView
            }
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#aaa"
              onChangeText={(e) => setRusername(e)}
            />
          </View>
          <View style={styles.errorView}>
            {props.errors.email && (
              <Text style={styles.errormsg}>{props.errors.email}</Text>
            )}
          </View>
          <View
            style={props.errors.email ? styles.errinputView : styles.inputView}
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#aaa"
              onChangeText={(e) => setRemail(e)}
            />
          </View>
          <View style={styles.errorView}>
            {props.errors.password && (
              <Text style={styles.errormsg}>{props.errors.password}</Text>
            )}
          </View>
          <View
            style={
              props.errors.password ? styles.errinputView : styles.inputView
            }
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(e) => setRpassword(e)}
            />
          </View>
          <View style={styles.errorView}>
            {props.errors.password2 && (
              <Text style={styles.errormsg}>{props.errors.password2}</Text>
            )}
          </View>
          <View
            style={
              props.errors.password2 ? styles.errinputView : styles.inputView
            }
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(e) => setRconpassword(e)}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createTitle}>Already have an Account?</Text>
            <TouchableOpacity onPress={() => setViewflag(false)}>
              <Text style={styles.createButton}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonView} onPress={signfunc}>
            <Text style={styles.button}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.maincontainer}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Welcome</Text>
          </View>
          <View style={styles.errorView}>
            {props.errors.logemail && (
              <Text style={styles.errormsg}>{props.errors.logemail}</Text>
            )}
          </View>
          <View
            style={
              props.errors.logemail ? styles.errinputView : styles.inputView
            }
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#aaa"
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.errorView}>
            {props.errors.logpassword && (
              <Text style={styles.errormsg}>{props.errors.logpassword}</Text>
            )}
          </View>
          <View
            style={
              props.errors.logpassword ? styles.errinputView : styles.inputView
            }
          >
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
          <View style={styles.createView}>
            <Text style={styles.createTitle}>Don't have an Account?</Text>
            <TouchableOpacity onPress={() => setViewflag(true)}>
              <Text style={styles.createButton}>Create New</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonView} onPress={loginfunc}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  maincontainer: {
    width: "85%",
  },
  titleView: {
    marginBottom: 40,
  },
  titleText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 40,
    letterSpacing: 2,
  },
  errormsg: {
    color: "#30b98f",
    paddingLeft: 20,
  },
  errorView: {
    height: 20,
    marginBottom: 2,
  },
  inputView: {
    borderRadius: 100,
    backgroundColor: "#edf8f1",
    marginBottom: 5,
    borderColor: "transparent",
    borderWidth: 3,
    borderStyle: "solid",
  },
  errinputView: {
    borderRadius: 100,
    backgroundColor: "#edf8f1",
    marginBottom: 5,
    borderColor: "#30b98f",
    borderWidth: 3,
    borderStyle: "solid",
  },
  TextInput: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    fontSize: 16,
  },
  buttonView: {
    borderRadius: 24,
    backgroundColor: "#30b98f",
    marginBottom: 50,
    marginTop: 50,
  },
  button: {
    color: "#fff",
    padding: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  createView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  createTitle: {
    color: "#fff",
  },
  createButton: {
    color: "#30b98f",
    fontSize: 16,
  },
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, registerUser })(Login);
