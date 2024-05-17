import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

const { height, width } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigation.navigate("Login"))
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={require("../assets/bgMain.png")}
        >
    <View style={styles.root}>
      <View style={styles.profileInfo}>        
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>
    </View>
    <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnStyles} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    height: '80%',
    marginTop: 10,
  },
  email: {
    fontSize: 20,
    color: "#fff",
  },
  btnContainer: {
    marginBottom: 10,
    padding: 20,
  },
  btnStyles: {
    backgroundColor: '#73A9AD',
    padding: 15,
    width: '100%',
    paddingHorizontal: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    elevation: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
      },
    }),
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});

export default Profile; 