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
  Modal,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDishdata, addOrderdata } from "../Actions/dishActions";
import { getOrderlistdata } from "../Actions/orderlistActions";
import { Searchbar } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import isEmpty from "../validation/is-empty";
import { apiURL } from "../config/config";

const Dish = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [shopnumber, setShopnumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestid, setRequestid] = useState("");
  const [requesttitle, setRequesttitle] = useState("");
  const [requestamount, setRequestamount] = useState(0);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var searchresult = alldata.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    if (query === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  useEffect(() => {
    props.getDishdata();
    props.getOrderlistdata({ id: props.auth.user.id });
  }, []);

  useEffect(() => {
    setResult(props.dishes);
    setAlldata(props.dishes);

    // search section
    var searchresult = isEmpty(props.dishes)
      ? []
      : props.dishes.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
          );
        });
    if (searchQuery === "") {
      setResult(props.dishes);
    } else {
      setResult(searchresult);
    }
  }, [props.dishes]);

  useEffect(() => {
    setShopnumber(props.orderlists.length);
  }, [props.orderlists]);

  const orderfunc = () => {
    if (requestamount === 0) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Please select amount!", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Please select amount!");
      }
    } else {
      const paramData = {
        id: requestid,
        amount: requestamount,
        uid: props.auth.user.id,
        email: props.auth.user.email,
      };
      props.addOrderdata(paramData);
      setModalVisible(false);
      if (Platform.OS === "android") {
        ToastAndroid.show("Success!", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert("Success!");
      }
    }
  };

  const sendrequestfunc = (id, requestname) => {
    setRequestamount(0);
    setRequestid(id);
    setRequesttitle(requestname);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headersection}>
        <View style={styles.headersubsection}>
          <View style={styles.headertitlesection}>
            <Text style={styles.headertitle}>Dish~</Text>
            <TouchableOpacity
              style={styles.headershopsection}
              onPress={() => props.setrouteflagfunc("shopping")}
            >
              <Text style={{ color: "#1f1f1f", fontWeight: "bold" }}>
                <AntDesign name="shoppingcart" color="#1f1f1f" size={15} />{" "}
                {shopnumber}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headersearchsection}>
            <Searchbar
              placeholder="Search for dishes"
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
        <View style={styles.dishsection}>
          {isEmpty(result) ? (
            <Text style={styles.emptydatatext}>Empty Data</Text>
          ) : (
            result.map((item, key) => {
              return (
                <View style={styles.dishitemview} key={key}>
                  <View style={styles.dishitemimage}>
                    <Image
                      source={{
                        uri: apiURL + item.image_url,
                      }}
                      style={styles.imagestyle}
                    />
                  </View>
                  <View style={styles.dishitemfoot}>
                    <Text style={styles.dishitemfoottext}>{item.name}</Text>
                    <TouchableOpacity
                      style={styles.dishitemsend}
                      onPress={() => sendrequestfunc(item._id, item.name)}
                    >
                      <Feather name="send" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modaltitle}>{requesttitle}'s Order</Text>
            </View>
            <View style={styles.modalamountview}>
              <TouchableOpacity
                style={styles.modalamountbtn}
                onPress={() =>
                  requestamount < 1
                    ? setRequestamount(0)
                    : setRequestamount(requestamount - 1)
                }
              >
                <FontAwesome name="minus" size={18} />
              </TouchableOpacity>
              <View style={{ width: 35 }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  {requestamount}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalamountbtn}
                onPress={() => setRequestamount(requestamount + 1)}
              >
                <FontAwesome name="plus" size={18} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyleclose}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => orderfunc()}
              >
                <Text style={styles.textStyle}>Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
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
  dishsection: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: 15,
  },
  emptydatatext: {
    textAlign: "center",
    width: "100%",
    marginTop: 80,
    fontSize: 24,
    fontWeight: "bold",
  },
  dishitemview: {
    width: "48%",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 20,
    marginVertical: 10,
  },
  dishitemimage: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  imagestyle: {
    width: "80%",
    height:
      (((((Dimensions.get("window").width / 100) * 85) / 25) * 12) / 5) * 4,
    borderRadius: 100,
  },
  dishitemfoot: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  dishitemfoottext: {
    fontSize: 16,
    fontWeight: "bold",
    width: "70%",
    maxWidth: "70%",
  },
  dishitemsend: {
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "90%",
    maxWidth: "90%",
    minWidth: "90%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    marginHorizontal: 15,
  },
  buttonClose: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  textStyleclose: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modaltitle: {
    fontSize: 24,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  modalamountview: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  modalamountbtn: {
    margin: 10,
  },
});

Dish.propTypes = {
  getDishdata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dishes: state.dishes.data,
  auth: state.auth,
  orderlists: state.orderlists.data,
});

export default connect(mapStateToProps, {
  getDishdata,
  addOrderdata,
  getOrderlistdata,
})(Dish);
