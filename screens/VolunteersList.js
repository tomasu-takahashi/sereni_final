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
  const [createChats, setCreateChats] = useState(false);
  const [loading ,setLoading] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUserList = userList.filter((user) =>
  user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
);
const volunteer = filteredUserList.filter((user) => user.userType === 'volunteer');

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



const createChat = (user) => {
  return new Promise((resolve, reject) => {
    const chatRef = ref(db, 'chatParticipants');
    const newChatRefKey = push(chatRef).key;
    const newChatRef = ref(db, 'chatParticipants/' + newChatRefKey);
    const userChat = ref(db, 'userChats/' + uid);
    const secondUserChat = ref(db, 'userChats/' + user);

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
        console.log(chatKey)
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
          console.log('Chat doesn\'t exist');
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  };


//    const checkChat = (user) => {
//     const chatRef = ref(db, 'chatParticipants')
//     let participantData = [];
//     onValue(chatRef, (snapshot) => {
//         participantData = [];
//         if (snapshot.exists()) {
//             snapshot.forEach((child) => {
//                 participantData.push({
//                     key: child.key,
//                     uid: child.val()[uid],
//                     userId: child.val()[user]
//                 })

//                 setParticipants(participantData)
//             })

//             // setChatExist(true);
//             console.log(chatExist)

//         } else {
//             //  if parent node "chatParticipants" doesn't exist, will create an initial data
//             // console.log('chat doesnt exist')
//         }
//     })
// }


useEffect(() => {
  let foundParticipantKey = null

  // Check if chat exists for participants
  const chatExists = participants.some((item) => {
      const participantUid = item.uid;
      const participantUserId = item.userId;
      const participantKey = item.key;
      foundParticipantKey = participantKey;
      return participantUid === true && participantUserId === true;
  });
  if (chatExists) {
      setChatExist(true);
      setChatRefKey(foundParticipantKey);
      setChatExist(true);
      // console.log('chat exists')
      // console.log(chatRefKey)
  } else {
      setChatExist(false);
      // console.log('chat doesnt exist with this user')
      // console.log(chatRefKey)
  }
}, [counter])


  
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



  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChatPress(item.uid)}>
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.fullname}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

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

{/* {volunteer.map((pip) => (
  
))} */}
<FlatList
  data={volunteer}
  renderItem={renderItem}
  // keyExtractor={(item) => item.uid}
/>

<Modal visible={visible} transparent animationType='slide'>
  <View style={styles.modalRoot}>
    <View style={styles.modalContainer}>
      <Text style={{fontSize:18, color: '#ededed'}}>Do you want to chat with this user?</Text>

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
    marginTop: '60%',
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
    height: '50%',
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
