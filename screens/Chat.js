import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions, ActivityIndicator, ImageBackground, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { onValue, ref, push, update, off, orderByChild, query, child, set, refFromURL } from 'firebase/database';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const {height: screenHeight, width: screenWidth} = Dimensions.get('screen');

const Chat = () => {
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
  const [chatExist, setChatExist] = useState(false);
  const [counter, setCounter] = useState(0);
  const [userId, setUserId] = useState();
  const [chatRefKey, setChatRefKey] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [visible, setVisible] = useState(false);
  const [createChats, setCreateChats] = useState(false);
  const [loading ,setLoading] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid
  const [searchQuery, setSearchQuery] = useState('');
  
  // const filteredUserList = userList.filter((item) => {
  //   return item.fullname.toLowerCase().includes(searchQuery.toLowerCase());
  // });
  
//handleChatPress should be optimized with the instant uid registration in the database
  // const handleChatPress = (user) => {
    
  //   setUserId(user);
  //   checkChat(user)
  //  if (chatExist) {
  //    navigation.navigate('ChatScreen', {...props});
  //  }else {
  //   // Chat doesn't exist, create a new chatRefKey and navigate to ChatScreen

  //     setVisible(true);
  //       if(createChats){
  //       createChat(user)
  //       setVisible(false);
  //       navigation.navigate('ChatScreen', {...props});
  //       }
  //  }
  // };

  const props = { userId, chatExist, chatRefKey };

//   useEffect(() => {
//     console.log(props)
// }, [counter])

const handleItemPress = (key) => {
  console.log('item presseedd', key)
  navigation.navigate('ChatScreen', { chatRef: key, chatExist: true});
};

  // const handleChatPress = async (user) => {
  //   setUserId(user);
  //   console.log(userId);
  //   // Check if a chat exists with this user
  //   checkChat(user);
    

  //   if (chatExist) {
  //     navigation.navigate('ChatScreen', { ...props });
  //   } else {
  //     // Show the loader
  //     setLoading(true);

  //     // Chat doesn't exist, create a new chatRefKey and navigate to ChatScreen
  //     try {
  //       const chatKey = await createChat(user);
        
  //       // Hide the loader
  //       setLoading(false);
        
  //       // Navigate to ChatScreen with the chat key
  //       navigation.navigate('ChatScreen', { userId: userId, chatExist: true, chatRefKey: chatKey });
  //     } catch (error) {
  //       console.error('Error creating chat:', error);
  //       // Handle the error as needed
  //       setLoading(false);
  //     }
  //   }
  // };

const confirmChat = async () => {
  // Close the modal
  setVisible(false);

  // Create the chat and get the chat key
  try {
    const chatKey = await createChat(userId);

    // Navigate to ChatScreen with the chat key
    navigation.navigate('ChatScreen', { userId: userId, chatExist: true, chatRefKey: chatKey });
  } catch (error) {
    console.error('Error creating chat:', error);
    // Handle the error as needed
  }
};

// const confirmChat = () => {
//   setCreateChats(true);
//   setVisible(false);
// };


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

   

// useEffect(() => {
//   let foundParticipantKey = null

//   // Check if chat exists for participants
//   const chatExists = participants.some((item) => {
//       const participantUid = item.uid;
//       const participantUserId = item.userId;
//       const participantKey = item.key;
//       foundParticipantKey = participantKey;
//       return participantUid === true && participantUserId === true;
//   });
//   if (chatExists) {
//       setChatExist(true);
//       setChatRefKey(foundParticipantKey);
//       // console.log('chat exists')
//       // console.log(chatRefKey)
//   } else {
//       setChatExist(false);
//       // console.log('chat doesnt exist with this user')
//       // console.log(chatRefKey)
//   }
// }, [counter])


  
  useEffect(() => {
    // Fetch the list of users from the 'logged_users' node in Firebase
    let userChatData = []
    const usersRef = ref(db, 'userChats/' + uid);
    onValue(usersRef, (snapshot) => {
      // if (snapshot.exists()) {
      //   const data = snapshot.val();
      //   const users = Object.values(data);
      //   console.log(users);
      //   setUserList(users);

      //   userList.map((mem) => {
      //     console.log(mem)
      //   })
      // } else {
      //   console.log('print')
      // }
            snapshot.forEach((child) => {
                userChatData.push({
                    key: child.key,
                    element: child.val()
                })
            })
            // console.log(userChatData)
    setUserList(userChatData)
    });
    // console.log(userChatData)
    // setUserList(userChatData)
    // Clean up the Firebase listener when the component unmounts
    return () => {
      off(usersRef); // Unsubscribe from usersRef updates
    };
  }, []);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.uid)}>
      <View style={styles.userItem}>
        <Text style={styles.userName}>{item.fullname}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Icon name="chat" size={24} style={styles.chatIcon} />
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

      <FlatList
        data={userList}
        renderItem={renderItem}
        // keyExtractor={(item) => item.uid}
      />


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
      padding: 10,
      color: '#ededed',
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
  btnStyle: {
    borderWidth: 2,
    borderColor: 'red',
    margin: 20,
    height: '60%',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    borderWidth: 2,
    borderColor: 'red',
    height: '35%',
    width: '80%',
    backgroundColor: 'white',
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
  container: {
    flex: 1,
    padding: 10
  },
  userItem: {
    padding: 10,
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
  chatIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
    color: '#ededed'
  },
});

export default Chat;
