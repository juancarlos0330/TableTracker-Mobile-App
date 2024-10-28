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
  ImageBackground,
  Modal,
} from "react-native";
import { Searchbar } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  getOrderdata,
  updateWaitingstatus,
  updateRunningstatus,
  updateModalwaitingstatus,
  updateModalrunningstatus,
} from "../Actions/orderActions";
import isEmpty from "../validation/is-empty";
import getDiffDate from "../validation/getDiffDate";
import { apiURL } from "../config/config";

const Dashboard = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subactivitymodalflag, setSubactivitymodalflag] = useState(false);
  const [subactresult, setSubactresult] = useState(null);
  const [subdetailresult, setSubdetailresult] = useState(null);
  const [subactivityid, setSubactivityid] = useState("");
  const [subdetailmodalflag, setSubdetailmodalflag] = useState(false);
  const [subdetailid, setSubdetailid] = useState("");

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
    const paramData = {
      id: props.auth.user.id,
    };
    props.getOrderdata(paramData);
  }, []);

  useEffect(() => {
    setResult(props.orders);
    setAlldata(props.orders);

    // search section
    var searchresult = isEmpty(props.orders)
      ? []
      : props.orders.filter((item) => {
          return (
            item.activity.name
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) > -1
          );
        });
    if (searchQuery === "") {
      setResult(props.orders);
    } else {
      setResult(searchresult);
    }

    if (subactivityid !== "") {
      const subactdata = props.orders.filter((item, key) => {
        return item._id === subactivityid;
      });
      setSubactresult(subactdata[0]);
      if (subdetailid !== "") {
        const subdetaildata = subactdata[0].activity.activity.filter(
          (item, key) => {
            return item._id === subdetailid;
          }
        );
        setSubdetailresult(subdetaildata[0]);
      }
    }
  }, [props.orders]);

  const runningstatus = (id) => {
    const paramData = {
      id,
      uid: props.auth.user.id,
      email: props.auth.user.email,
      date: new Date(),
    };
    props.updateRunningstatus(paramData);
  };

  const waitingstatus = (id) => {
    const paramData = {
      id,
      uid: props.auth.user.id,
      email: props.auth.user.email,
      date: new Date(),
    };
    props.updateWaitingstatus(paramData);
  };

  const subactshowmodal = (id) => {
    setSubactivitymodalflag(true);
    setSubactivityid(id);
    const subactdata = result.filter((item, key) => {
      return item._id === id;
    });
    setSubactresult(subactdata[0]);
  };

  const modalwaitingstatus = (id) => {
    const paramData = {
      id,
      uid: props.auth.user.id,
      date: new Date(),
      email: props.auth.user.email,
    };
    props.updateModalwaitingstatus(paramData);
  };

  const modalrunningstatus = (id) => {
    const paramData = {
      id,
      uid: props.auth.user.id,
      date: new Date(),
      email: props.auth.user.email,
    };
    props.updateModalrunningstatus(paramData);
  };

  const subdetailmodalfunc = (id) => {
    setSubdetailid(id);
    setSubdetailmodalflag(true);
    const subdetaildata = subactresult.activity.activity.filter((item, key) => {
      return item._id === id;
    });
    setSubdetailresult(subdetaildata[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headersection}>
        <View style={styles.headersubsection}>
          <View style={styles.headertitlesection}>
            <Text style={styles.headertitle}>
              Hi {props.auth.user.username},
            </Text>
            <TouchableOpacity
              style={styles.headershopsection}
              onPress={() => ToastAndroid.show("It's me!", ToastAndroid.SHORT)}
            >
              <Image
                source={{
                  uri: "https://preview.keenthemes.com/metronic8/demo6/assets/media/avatars/300-23.jpg",
                }}
                style={styles.headeruserimage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headersearchsection}>
            <Searchbar
              placeholder="Search for dishes"
              onChangeText={onChangeSearch}
              value={searchQuery}
              inputStyle={{ color: "#1f1f1f" }}
              placeholderTextColor="#a8acc0"
              icon={({ size, color }) => (
                <Feather name="search" size={size} color="#a8acc0" />
              )}
              clearIcon={({ size, color }) => (
                <AntDesign name="close" size={size} color="#1f1f1f" />
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
                <ImageBackground
                  source={require("../../assets/image/background.jpg")}
                  style={styles.dishitemview}
                  imageStyle={styles.dishitemviewimagestyle}
                  key={key}
                >
                  <View style={styles.dishitemimage}>
                    <Image
                      source={{
                        uri: apiURL + item.activity.image_url,
                      }}
                      style={styles.imagestyle}
                    />
                  </View>
                  <View style={styles.dishitemfoot}>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                      >
                        <TouchableOpacity
                          onPress={() => subactshowmodal(item._id)}
                        >
                          <Text style={styles.dishitemname}>
                            {item.activity.name}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.dishitemnametext}>
                          {" x" + item.amount}
                        </Text>
                      </View>

                      <Text style={styles.dishitemstatus}>
                        {getDiffDate(item.updated_at)} |{" "}
                        {item.status === 0
                          ? "Waitng"
                          : item.status === 1
                          ? "Running"
                          : "Completed"}
                      </Text>
                    </View>
                    <View>
                      <View
                        style={
                          item.status === 0
                            ? styles.waitstatusstyle
                            : item.status === 1
                            ? styles.runningstatusstyle
                            : styles.compeletestatusstyle
                        }
                      />
                      {item.status === 1 ? (
                        <TouchableOpacity
                          style={styles.changebtnstyle}
                          onPress={() => runningstatus(item._id)}
                        >
                          <AntDesign
                            name="checkcircle"
                            size={15}
                            color="#ccff00"
                          />
                        </TouchableOpacity>
                      ) : item.status === 0 ? (
                        <TouchableOpacity
                          style={styles.changebtnstyle}
                          onPress={() => waitingstatus(item._id)}
                        >
                          <FontAwesome
                            name="refresh"
                            size={15}
                            color="#ccff00"
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </ImageBackground>
              );
            })
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={subdetailmodalflag}
        transparent={true}
      >
        <View style={styles.modalcontainer}>
          <View
            style={{
              width: "80%",
              minHeight: (Dimensions.get("window").height / 10) * 5,
              maxHeight: (Dimensions.get("window").height / 10) * 6,
              backgroundColor: "#fff",
              borderRadius: 15,
            }}
          >
            <View style={styles.modalheader}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalheadertext}>Detail</Text>
                <Text style={styles.modalheadertexto}>
                  {" ("}
                  {isEmpty(subdetailresult)
                    ? null
                    : subdetailresult.activity.name}
                  {" x"}
                  {isEmpty(subdetailresult) ? null : subdetailresult.amount}
                  {")"}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setSubdetailmodalflag(false)}>
                <MaterialCommunityIcons name="close" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "90%",
                    paddingVertical: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.detaileachsection}>
                    <Text style={styles.sectiontitle}>
                      <MaterialCommunityIcons
                        name="basket"
                        size={16}
                        color="#0000ff"
                      />{" "}
                      Materials
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {isEmpty(subdetailresult) ? (
                        <View>
                          <Text>No Data</Text>
                        </View>
                      ) : isEmpty(subdetailresult.activity.material) ? (
                        <View>
                          <Text>Empty Data</Text>
                        </View>
                      ) : (
                        subdetailresult.activity.material.map((item, key) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 3,
                              }}
                              key={key}
                            >
                              <Text style={{ width: "30%" }}>
                                - {item.material.name}
                              </Text>
                              <Text>
                                {item.amount} ({item.material.unit}) x{" "}
                                {subdetailresult.amount} ={" "}
                                {Number(item.amount) *
                                  Number(subdetailresult.amount)}{" "}
                                ({item.material.unit})
                              </Text>
                              <Text style={{ marginLeft: 10 }}>
                                {Number(item.amount) *
                                  Number(subdetailresult.amount) >
                                Number(item.material.amount) ? (
                                  <FontAwesome
                                    name="close"
                                    size={16}
                                    color="red"
                                    style={{ paddingLeft: 5 }}
                                  />
                                ) : (
                                  <FontAwesome
                                    name="check"
                                    size={16}
                                    color="green"
                                    style={{ paddingLeft: 5 }}
                                  />
                                )}
                              </Text>
                            </View>
                          );
                        })
                      )}
                    </View>
                  </View>
                  <View style={styles.detaileachsection}>
                    <Text style={styles.sectiontitle}>
                      <FontAwesome5 name="tools" size={16} color="#0000ff" />{" "}
                      Tools
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {isEmpty(subdetailresult) ? (
                        <View>
                          <Text>No Data</Text>
                        </View>
                      ) : isEmpty(subdetailresult.activity.tool) ? (
                        <View>
                          <Text>Empty Data</Text>
                        </View>
                      ) : (
                        subdetailresult.activity.tool.map((item, key) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 3,
                              }}
                              key={key}
                            >
                              <Text style={{ width: "30%" }}>
                                - {item.tool.name}
                              </Text>
                              <Text>
                                {item.amount} x {subdetailresult.amount} ={" "}
                                {Number(item.amount) *
                                  Number(subdetailresult.amount)}
                              </Text>
                              <Text style={{ marginLeft: 10 }}>
                                {Number(item.amount) *
                                  Number(subdetailresult.amount) >
                                Number(item.tool.amount) ? (
                                  <FontAwesome
                                    name="close"
                                    size={16}
                                    color="red"
                                    style={{ paddingLeft: 5 }}
                                  />
                                ) : (
                                  <FontAwesome
                                    name="check"
                                    size={16}
                                    color="green"
                                    style={{ paddingLeft: 5 }}
                                  />
                                )}
                              </Text>
                            </View>
                          );
                        })
                      )}
                    </View>
                  </View>
                  <View style={styles.detaileachsection}>
                    <Text style={styles.sectiontitle}>
                      <MaterialCommunityIcons
                        name="account"
                        size={16}
                        color="#0000ff"
                      />{" "}
                      Peoples
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {isEmpty(subdetailresult) ? (
                        <View>
                          <Text>No Data</Text>
                        </View>
                      ) : isEmpty(subdetailresult.activity.people) ? (
                        <View>
                          <Text>Empty Data</Text>
                        </View>
                      ) : (
                        subdetailresult.activity.people.map((item, key) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 3,
                              }}
                              key={key}
                            >
                              <Text>- </Text>
                              <Image
                                source={{
                                  uri: apiURL + item.image_uri,
                                }}
                                style={{
                                  width: 25,
                                  height: 25,
                                  borderRadius: 100,
                                }}
                              />
                              <Text> {item.name}</Text>
                              {/* <FontAwesome
                                name="close"
                                size={16}
                                color="red"
                                style={{ paddingLeft: 5 }}
                              /> */}
                              <FontAwesome
                                name="check"
                                size={16}
                                color="green"
                                style={{ paddingLeft: 5 }}
                              />
                            </View>
                          );
                        })
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalfooter}>
              {isEmpty(subdetailresult) ? (
                <TouchableOpacity
                  style={styles.modalfooterbtn}
                  onPress={() => setSubdetailmodalflag(false)}
                >
                  <Text style={{ color: "#fff" }}>Close</Text>
                </TouchableOpacity>
              ) : subdetailresult.status === 0 ? (
                <TouchableOpacity
                  style={styles.modalfooterstatusbtn}
                  onPress={() => modalwaitingstatus(subdetailresult._id)}
                >
                  <FontAwesome name="refresh" size={24} color="#fff" />
                </TouchableOpacity>
              ) : subdetailresult.status === 1 ? (
                <TouchableOpacity
                  style={styles.modalfooterstatusbtn}
                  onPress={() => modalrunningstatus(subdetailresult._id)}
                >
                  <AntDesign name="check" size={24} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.modalfooterbtn}
                  onPress={() => setSubdetailmodalflag(false)}
                >
                  <Text style={{ color: "#fff" }}>Close</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={subactivitymodalflag}
        transparent={true}
      >
        <View style={styles.modalcontainer}>
          <View style={styles.modalcontent}>
            <View style={styles.modalheader}>
              <Text style={styles.modalheadertext}>Sub Activity</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={{
                    width: "90%",
                    paddingVertical: 20,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {isEmpty(subactresult) ? (
                    <Text style={styles.emptydatatext}>Empty Data</Text>
                  ) : isEmpty(subactresult.activity) ? (
                    <Text style={styles.emptydatatext}>Empty Data</Text>
                  ) : isEmpty(subactresult.activity.activity) ? (
                    <Text style={styles.emptydatatext}>Empty Data</Text>
                  ) : (
                    subactresult.activity.activity.map((item, key) => {
                      return (
                        <ImageBackground
                          source={require("../../assets/image/subactback.jpg")}
                          style={styles.dishitemview}
                          imageStyle={styles.dishitemviewimagestyle}
                          key={key}
                        >
                          <View style={styles.dishitemimage}>
                            <Image
                              source={{
                                uri: apiURL + item.activity.image_url,
                              }}
                              style={styles.modalimagestyle}
                            />
                          </View>
                          <View style={styles.dishitemfoot}>
                            <View style={{ width: "75%" }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => subdetailmodalfunc(item._id)}
                                >
                                  <Text style={styles.modaldishitemname}>
                                    {item.activity.name}
                                  </Text>
                                </TouchableOpacity>
                                <Text style={styles.modaldishitemnametext}>
                                  {" x" + item.amount}
                                </Text>
                              </View>
                              <Text style={styles.modaldishitemstatus}>
                                {getDiffDate(item.updated_at)} |{" "}
                                {item.status === 0
                                  ? "Waitng"
                                  : item.status === 1
                                  ? "Running"
                                  : "Completed"}
                              </Text>
                            </View>
                            <View>
                              <View
                                style={
                                  item.status === 0
                                    ? styles.waitstatusstyle
                                    : item.status === 1
                                    ? styles.runningstatusstyle
                                    : styles.compeletestatusstyle
                                }
                              />
                            </View>
                          </View>
                        </ImageBackground>
                      );
                    })
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.modalfooter}>
              <TouchableOpacity
                style={styles.modalfooterbtn}
                onPress={() => setSubactivitymodalflag(false)}
              >
                <Text style={{ color: "#fff" }}>Close</Text>
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
    color: "#12947c",
    fontSize: 24,
    fontWeight: "bold",
  },
  headershopsection: {
    borderRadius: 6,
    paddingBottom: 3,
    paddingTop: 3,
    paddingRight: 8,
    paddingLeft: 8,
  },
  headeruserimage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  headersearchsection: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchbarstyle: {
    borderRadius: 15,
    elevation: 0,
    borderColor: "#a8acc0",
    borderStyle: "solid",
    borderWidth: 1,
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
    marginVertical: 10,
  },
  dishitemviewimagestyle: {
    width: "100%",
    borderRadius: 20,
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
  modalimagestyle: {
    width: "80%",
    height:
      (((((((Dimensions.get("window").width / 10) * 9) / 10) * 9) / 25) * 12) /
        5) *
      4,
    borderRadius: 100,
  },
  dishitemfoot: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
  },
  dishitemname: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#f2f2f2",
  },
  dishitemnametext: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff221",
  },
  modaldishitemname: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#f2f2f2",
  },
  modaldishitemnametext: {
    fontSize: 12,
    marginBottom: 5,
    color: "#fff221",
  },
  dishitemstatus: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#595554",
  },
  modaldishitemstatus: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#595554",
  },
  waitstatusstyle: {
    backgroundColor: "red",
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  runningstatusstyle: {
    backgroundColor: "yellow",
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  compeletestatusstyle: {
    backgroundColor: "green",
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  changebtnstyle: {
    marginTop: 15,
  },
  modalcontainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalcontent: {
    width: "95%",
    minHeight: (Dimensions.get("window").height / 10) * 8,
    maxHeight: (Dimensions.get("window").height / 10) * 9,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  modalheader: {
    padding: 20,
    borderColor: "transparent",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalheadertext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalheadertexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff8111",
  },
  modalfooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    borderColor: "transparent",
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  modalfooterbtn: {
    backgroundColor: "#000",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  modalfooterstatusbtn: {
    backgroundColor: "#000",
    padding: 10,
    margin: 0,
    borderRadius: 100,
  },
  detaileachsection: {
    marginTop: 10,
    marginBottom: 15,
  },
  sectiontitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0000ff",
  },
});

Dashboard.propTypes = {
  getOrderdata: PropTypes.func.isRequired,
  updateWaitingstatus: PropTypes.func.isRequired,
  updateRunningstatus: PropTypes.func.isRequired,
  updateModalwaitingstatus: PropTypes.func.isRequired,
  updateModalrunningstatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders.data,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrderdata,
  updateWaitingstatus,
  updateRunningstatus,
  updateModalwaitingstatus,
  updateModalrunningstatus,
})(Dashboard);
