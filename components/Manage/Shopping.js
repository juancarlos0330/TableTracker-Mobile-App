import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Searchbar } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import {
  getOrderlistdata,
  delOrderlistdata,
  orderOrderlistdata,
} from "../Actions/orderlistActions";
import isEmpty from "../validation/is-empty";
import { apiURL } from "../config/config";

const Shopping = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var searchresult = alldata.filter((item) => {
      return item.activity.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    if (query === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  useEffect(() => {
    props.getOrderlistdata({ id: props.auth.user.id });
  }, []);

  useEffect(() => {
    setResult(props.orderlists);
    setAlldata(props.orderlists);

    // search section
    var searchresult = isEmpty(props.orderlists)
      ? []
      : props.orderlists.filter((item) => {
          return (
            item.activity.name
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) > -1
          );
        });
    if (searchQuery === "") {
      setResult(props.orderlists);
    } else {
      setResult(searchresult);
    }
  }, [props.orderlists]);

  const orderlistfunc = (id) => {
    const paramData = {
      id: id,
      uid: props.auth.user.id,
      email: props.auth.user.email,
      date: new Date(),
    };
    props.orderOrderlistdata(paramData);
    if (Platform.OS === "android") {
      ToastAndroid.show("Success!", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("Success!");
    }
  };

  const cancelOrderlistfunc = (id) => {
    const paramData = {
      did: id,
      id: props.auth.user.id,
      email: props.auth.user.email,
    };
    props.delOrderlistdata(paramData);
    if (Platform.OS === "android") {
      ToastAndroid.show("Your order has been cancelled!", ToastAndroid.SHORT);
    } else {
      AlertIOS.alert("Your order has been cancelled!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headersection}>
        <View style={styles.headersubsection}>
          <View style={styles.headertitlesection}>
            <Text style={styles.headertitle}>Order List</Text>
          </View>
          <View style={styles.headersearchsection}>
            <Searchbar
              placeholder="Search for list"
              onChangeText={onChangeSearch}
              value={searchQuery}
              inputStyle={{ color: "#f9f9f9" }}
              placeholderTextColor="#919191"
              icon={({ size, color }) => (
                <Feather name="search" size={size} color="#f9f9f9" />
              )}
              clearIcon={({ size, color }) => (
                <AntDesign name="close" size={size} color="#f9f9f9" />
              )}
              style={styles.searchbarstyle}
            />
          </View>
        </View>
      </View>
      <View style={styles.countview}>
        <Text style={styles.counttext}>Total: </Text>
        <Text style={styles.counttextcount}>{result.length}</Text>
      </View>
      <ScrollView
        style={styles.mainsection}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={styles.requestsection}>
          {isEmpty(result) ? (
            <Text style={styles.emptydatatext}>Empty Data</Text>
          ) : (
            result.map((item, key) => {
              return (
                <View style={styles.reqitemview} key={key}>
                  <View style={styles.reqitemimage}>
                    <Image
                      source={{
                        uri: apiURL + item.activity.image_url,
                      }}
                      style={styles.imagestyle}
                    />
                  </View>
                  <View style={styles.reqitemfoot}>
                    <Text style={styles.reqitemfoottext}>
                      {item.activity.name}
                    </Text>
                    <View style={styles.orderamountview}>
                      <Text style={styles.orderamountviewtext}>
                        {item.amount}
                      </Text>
                    </View>
                    <View style={styles.reqitemcountsection}>
                      <Text style={styles.reqitemcounttext}>
                        {new Date(item.created_at).getFullYear()}-
                        {new Date(item.created_at).getMonth() + 1}-
                        {new Date(item.created_at).getDate() + 1}{" "}
                        {new Date(item.created_at).getHours()}:
                        {new Date(item.created_at).getMinutes()}:
                        {new Date(item.created_at).getSeconds()}
                      </Text>
                    </View>
                    <View style={styles.ordersection}>
                      <TouchableOpacity
                        style={styles.reqitemsend}
                        onPress={() => cancelOrderlistfunc(item._id)}
                      >
                        <Text style={styles.reqitemsendtext}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.reqitemsendorder}
                        onPress={() => orderlistfunc(item._id)}
                      >
                        <Text style={styles.reqitemsendordertext}>Order</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  headersection: {
    backgroundColor: "#1f1f1f",
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headersubsection: {
    width: "85%",
  },
  headertitlesection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headertitle: {
    color: "#f9f9f9",
    fontSize: 24,
    fontWeight: "bold",
  },
  headershopsection: {
    borderRadius: 6,
    backgroundColor: "#ccff00",
    paddingBottom: 3,
    paddingTop: 3,
    paddingRight: 8,
    paddingLeft: 8,
  },
  headersearchsection: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchbarstyle: {
    borderRadius: 15,
    backgroundColor: "#393939",
    elevation: 0,
  },
  mainsection: {
    width: "100%",
    flex: 1,
  },
  countview: {
    marginTop: 10,
    marginBottom: 5,
    width: "85%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  counttext: {
    color: "#000",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  counttextcount: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  requestsection: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: 15,
  },
  reqitemview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 1,
    position: "relative",
    elevation: 15,
    marginVertical: 10,
  },
  reqitemimage: {
    width: "30%",
    alignItems: "center",
  },
  imagestyle: {
    width: "80%",
    height: (((((Dimensions.get("window").width / 20) * 17) / 10) * 3) / 5) * 4,
    borderRadius: 100,
  },
  reqitemfoot: {
    width: "70%",
    justifyContent: "center",
    marginVertical: 10,
  },
  reqitemfoottext: {
    fontSize: 16,
    fontWeight: "bold",
    width: "70%",
    maxWidth: "70%",
  },
  reqitemcountsection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  emptydatatext: {
    textAlign: "center",
    width: "100%",
    marginTop: 80,
    fontSize: 24,
    fontWeight: "bold",
  },
  reqitemcounttext: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#adadad",
  },
  ordersection: {
    marginVertical: 5,
    flexDirection: "row",
  },
  reqitemsend: {
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reqitemsendorder: {
    backgroundColor: "#ccff00",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  reqitemsendtext: {
    color: "#fff",
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  reqitemsendordertext: {
    color: "#000",
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  orderamountview: {
    position: "absolute",
    right: 25,
  },
  orderamountviewtext: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
});

Shopping.propTypes = {
  getOrderlistdata: PropTypes.func.isRequired,
  delOrderlistdata: PropTypes.func.isRequired,
  orderOrderlistdata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orderlists: state.orderlists.data,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrderlistdata,
  delOrderlistdata,
  orderOrderlistdata,
})(Shopping);
