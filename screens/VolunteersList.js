import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions, ActivityIndicator, ImageBackground, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { onValue, ref, push, update, off, orderByChild, query, child, set, refFromURL } from 'firebase/database';


const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');

const VolunteerList = () => {
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
  const [chatExist, setChatExist] = useState(false);
  const [counter, setCounter] = useState(0);
  const [userId, setUserId] = useState();
  const [chatRef, setChatRefKey] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [createChats, seqtCreateChats] = useState(false);
  const [loading ,setLoading] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeVolunteer, setUserTypeVolunteer] = useState(true)
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState([]);
  const [secUserData, setSecUserData] = useState([]);

  const filteredUserList = userList.filter((user) =>
  user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
);
const volunteer = filteredUserList.filter((user) => user.userType === 'volunteer');
const users = filteredUserList.filter((user) => user.userType === 'user');

const props = { userId, chatExist, chatRef };


useEffect(() => {
  const interval = setInterval(() => {
      // Update the count every second
      setCounter(prevCount => prevCount + 1);
  }, 500);

  console.log(counter)
  // Clean up the interval when the component unmounts
  return () => {
      clearInterval(interval);
  };
}, []);

  

  const handleClick = () => {
    if (chatExist) {
        navigation.navigate('Chat', { ...props });
    } else {
        setVisible(true);
        // console.log('chater')
    }
    setCounter(prevCount => prevCount + 1)
}

// useEffect(() => {
//   console.log(userId)
// },[])



const confirmChat = async () => {
  // Close the modal
  setVisible(false);
  // Create the chat and get the chat key
  try {
    const chatKey = await createChat(userId);
    // Navigate to ChatScreen with the chat key
    navigation.navigate('ChatScreen', { userId: userId, chatExist: true, chatRef: chatKey });
  } catch (error) {
    console.error('Error creating chat:', error);
    // Handle the error as needed
  }
};


useEffect(() => {
  const dbRef = ref(db, 'users/logged_users/' + userId);
  onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
          setSecUserData({
              fName: data.fullname || '',
              email: data.email || '',
              userType: data.userType || '',
              uid: data.uid || '',
              // profilePic: data.profile_pic || '',
          });
      }
  });

}, [userId])

useEffect(() => {
  secUserData.map((user) => {
    console.log(user)
  })
},[])

useEffect(() => {
  const dbRef = ref(db, 'users/logged_users/' + uid);
  onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
          setUserData({
              fName: data.fullname || '',
              email: data.email || '',
              userType: data.userType || '',
              uid: data.uid || '',
              // profilePic: data.profile_pic || '',
          });
      }
  });
}, [uid])



const createChat = (user) => {
  return new Promise((resolve, reject) => {
    const chatRef = ref(db, 'chatParticipants');
    const newChatRefKey = push(chatRef).key;
    const newChatRef = ref(db, 'chatParticipants/' + newChatRefKey);
    const userChat = ref(db, 'userChats/' + uid);
    const secondUserChat = ref(db, 'userChats/' + user);
    const contactRef = ref(db, 'contacts/' + uid + '/' + newChatRefKey);
    const secContactRef = ref(db, 'contacts/' + userId + '/' + newChatRefKey);
    const userFName = userData?.fName || '';
    const userEmail = userData?.email || '';
    const userUID = userData?.uid || '';
    const userUType = userData?.userType || '';
    const user2Fname = secUserData?.fName || '';
    const user2Email= secUserData?.email || '';
    const user2UID = secUserData?.uid || '';
    const user2UType = secUserData?.userType || '';

    const contactData = {
      fName: user2Fname,
      email: user2Email,
      uid: user2UID,
      userType: user2UType,
    
      newChatRefKey
  }

  const secContactData = {
      fName: userFName,
      email: userEmail,
      uid: userUID,
      userType: userUType,
    
      newChatRefKey
  }

    const chatData = {
      [uid]: true,
      [user]: true
    }
    const userChatData = {
      [newChatRefKey]: newChatRefKey,
    }
    const secondUserChatData = {
      [newChatRefKey]: newChatRefKey,
    }

    set(newChatRef, chatData)
    // update(contactRef, contactData);
    //         update(secContactRef, secContactData);
      .then(() => update(contactRef, contactData))
      .then(() => update(secContactRef, secContactData))
      .then(() => update(userChat, userChatData))
      .then(() => update(secondUserChat, secondUserChatData))
      .then(() => {
        resolve(newChatRefKey); // Resolve with the chat key
      })
      .catch((error) => {
        reject(error);
      });
  });
};



  const handleChatPress = async (user) => {
    try {
      setUserId(user);
  
      // Check chat for the selected user
      const chatKey = await checkChat(user);

      if (chatKey === null) {
        setVisible(true);
      }else{
        
      setChatRefKey(chatKey);
      navigation.navigate('ChatScreen', { userId: userId, chatExist: true, chatRef: chatKey });
      }
    } catch (error) {
      console.error('Error handling chat press:', error);
      // Handle the error as needed
    }
  };


  const checkChat = async (user) => {
    return new Promise((resolve, reject) => {
      const chatRef = ref(db, 'chatParticipants');
      onValue(chatRef, (snapshot) => {
        if (snapshot.exists()) {
          let chatKey = null;
  
          snapshot.forEach((child) => {
            const otherUserId = Object.keys(child.val()).find((key) => key !== uid);
            if (otherUserId === user) {
              chatKey = child.key;
            }
          });
  
          resolve(chatKey);
        } else {
          // If parent node "chatParticipants" doesn't exist, create an initial data
          
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  };


  useEffect(() => {
    let foundParticipantKey = null;
  
    // Check if chat exists for participants
    const chatExists = participants.some((item) => {
      const participantUid = item.uid;
      const participantUserId = item.userId;
      const participantKey = item.key;
      foundParticipantKey = participantKey;
      return participantUid === uid && participantUserId === userId; // Update this line
    });
  
    if (chatExists) {
      setChatExist(true);
      setChatRefKey(foundParticipantKey);
    } else {
      setChatExist(false);
    }
  }, [counter]);







useEffect(() => {
  const pip = volunteer.map((user) => user.uid);
  

  // Use Promise.all to wait for all checkChat promises to resolve
  Promise.all(pip.map((user) => checkChat(user)))
    .then((chatKeys) => {
      // Check if any chat exists for the volunteers
      const chatExists = chatKeys.some((key) => key !== null);

      

      if (chatExists) {
        
        setChatExist(true)
        
        // Additional logic if at least one user has an existing chat
      } else {
        setChatExist(false)
        // Additional logic if no user has an existing chat
      }
    })
    .catch((error) => {
      console.error('Error checking chats:', error);
      // Handle the error as needed
    });
}, [counter]); 


  
  useEffect(() => {
    // Fetch the list of users from the 'logged_users' node in Firebase
    const usersRef = ref(db, 'users/logged_users');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists() ) {
        const data = snapshot.val();
        const users = Object.values(data);

        let uList = []

        users.map((member) => {
          if(member.uid !== uid) {
            uList.push(member);
          }
        })
        setUserList(uList);
      }
    });

    // Clean up the Firebase listener when the component unmounts
    return () => {
      off(usersRef); // Unsubscribe from usersRef updates
    };
  }, []);



  useEffect(() => {
    const userRef = ref(db, 'users/logged_users/' + uid + '/userType'); 
    onValue(userRef, (snap) => {
      const accType = snap.val()
      setUserType(accType);
    })
  }, [])

  const renderItem = ({ item }) => {
    const pip = filteredUserList.map((use) => use.uid)
    
    const hasExistingChat = pip.includes(item.uid) && chatExist;
    
  
    return (
      <TouchableOpacity onPress={() => handleChatPress(item.uid)}>
        <View style={[styles.userItem, hasExistingChat && styles.userItemWithChat]}>
          <Text style={styles.userName}>{item.fullname}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          {hasExistingChat && <Text style={styles.indicatorText}></Text>}
        </View>
      </TouchableOpacity>
    );
  };
  return (

    <ImageBackground
    style={styles.backgroundImage}
    resizeMode="cover"
    source={require("../assets/bgMain.png")}
    >
    
    <View style={styles.container}>

    <TextInput
      style={styles.searchInput}
      placeholder="Search"
      placeholderTextColor="#ededed"
      value={searchQuery}
      onChangeText={(text) => setSearchQuery(text)}
    />

<View style={styles.filterRoot}>
  <View style={styles.filterContainer}>
    <TouchableOpacity
      style={[styles.btnStyle, userType === 'volunteer' && styles.selectedButton]}
      onPress={() => setUserTypeVolunteer(true)}
    >
      <Text style={[styles.buttonText, userType === 'volunteer' && styles.selectedButtonText]}>Volunteer</Text>
    </TouchableOpacity>

    {userType === 'user' ? (
      null
    ) : (
      <TouchableOpacity
        style={[styles.btnStyle, userType === 'user' && styles.selectedButton]}
        onPress={() => setUserTypeVolunteer(false)}
      >
        <Text style={[styles.buttonText, userType === 'user' && styles.selectedButtonText]}>Client</Text>
      </TouchableOpacity>
    )}
  </View>
</View>


{userTypeVolunteer ? (
  <FlatList
  data={volunteer}
  renderItem={renderItem}
  // keyExtractor={(item) => item.uid}
/>
): (
  <FlatList
    data={users}
    renderItem={renderItem}
  />
)}

<Modal visible={visible} transparent animationType='slide'>
  <View style={styles.modalRoot}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Do you want to chat with this user?</Text>
      <View style={styles.btnContainer}>
      <TouchableOpacity style={{ ...styles.btnStyles, backgroundColor: '#444382' }} onPress={() => {confirmChat()}}>
          <Text style={{fontSize:18, color: '#ededed'}}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btnStyles, borderColor: '#444382', borderWidth: 1.5, marginTop: 10 }} onPress={() => setVisible(false)}>
          <Text style={{fontSize:18, color: '#ededed'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{loading && (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
)}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  filterRoot:{
    height: '８%'
  },
  selectedButton: {
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },
  buttonText: {
    fontSize: 20,
    color: '#ededed',
  },
  selectedButtonText: {
    fontSize: 20,
    color: '#000000', 
  },
  // userItemWithChat: {
  //   backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green background for users with existing chats
  // },
  indicatorText: {
    fontSize: 12,
    color: '#fff', // Text color for the indicator
    alignSelf: 'flex-end', // Adjust the position of the indicator text
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  searchInput: {
    color: '#ededed',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(27, 26, 69, 0.5)',
    borderRadius: 10,
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
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: '10%',
},
  btnStyles: {
    padding: 15,
    width: '100%',
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20,
    ...Platform.select({
      ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3
      },
  }),
  },
  modalContainer: {
    height: '30%',
    width: '95%',
    backgroundColor: 'rgba(27, 26, 69, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalRoot: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText :{
    fontSize: 20,
    color: '#ededed',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  userItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(27, 26, 69, 0.5)',
    borderRadius: 10,
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
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ededed'
  },
  userEmail: {
    fontSize: 14,
    color: '#ededed',
  },
});

export default VolunteerList;
