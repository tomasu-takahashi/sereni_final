import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions, ActivityIndicator, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { onValue, ref, push, update, off, orderByChild, query, child, set, refFromURL } from 'firebase/database';


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

  useEffect(() => {
    checkChat(user);
}, [counter])

  const handleChatPress = async (user) => {
    setUserId(user);
    console.log(userId);
    // Check if a chat exists with this user
    checkChat(user);
    

    if (chatExist) {
      navigation.navigate('ChatScreen', { ...props });
    } else {
      // Show the loader
      setLoading(true);

      // Chat doesn't exist, create a new chatRefKey and navigate to ChatScreen
      try {
        const chatKey = await createChat(user);
        
        // Hide the loader
        setLoading(false);
        
        // Navigate to ChatScreen with the chat key
        navigation.navigate('ChatScreen', { userId: userId, chatExist: true, chatRefKey: chatKey });
      } catch (error) {
        console.error('Error creating chat:', error);
        // Handle the error as needed
        setLoading(false);
      }
    }
  };

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


  //problem with the code is check chat 
  //add uid to chatParticipants and check the chat participants for the existing gig
   //checks if user already has a chat with this user
    const checkChat = (user) => {
    const chatRef = ref(db, 'chatParticipants')
    // const chatRef = ref(db, 'userChats/' + uid)
    // const userChatRef = ref(db, 'userChats/' + userId);
    let participantData = [];
    onValue(chatRef, (snapshot) => {
        participantData = [];
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                participantData.push({
                    key: child.key,
                    uid: child.val()[uid],
                    userId: child.val()[user]
                })

                setParticipants(participantData)
                
            })
            setChatExist(true);
        } else {
            //  if parent node "chatParticipants" doesn't exist, will create an initial data
            // console.log('chat doesnt exist')
        }
    })

   
}

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
      // console.log('chat exists')
      // console.log(chatRefKey)
  } else {
      setChatExist(false);
      // console.log('chat doesnt exist with this user')
      // console.log(chatRefKey)
  }
}, [counter])



//add uid to chatparticipants in createChat to be able to check of existing chat
//modal will appear if chat is non-existent to this user or the current user
//possible user chat will go with the asynchronous function 
 //create chat to users with non existing chat
//  const createChat = (user) => {

//   let chatRefcontainer = null;
  
//       const chatRef = ref(db, 'chatParticipants');
//       const newChatRefKey = push(chatRef).key;
//       const newChatRef = ref(db, 'chatParticipants/' + newChatRefKey);
//       const userChat = ref(db, 'userChats/' + uid);
//       const secondUserChat = ref(db, 'userChats/' + user);

//       const chatData = {
//           [uid]: true,
//           [user]: true
//       }
//       const userChatData = {
//           [newChatRefKey]: newChatRefKey,
//       }
//       const secondUserChatData = {
//           [newChatRefKey]: newChatRefKey,
//       }
//       set(newChatRef, chatData);
//       update(userChat, userChatData);
//       update(secondUserChat, secondUserChatData);

//       chatRefcontainer = newChatRefKey;
  
//   setChatExist(true);
//   setChatRefKey(chatRefcontainer);
//   setVisible(false);
  
// };



const props = { userId, chatExist, chatRefKey };

  
  useEffect(() => {
    // Fetch the list of users from the 'logged_users' node in Firebase
    const usersRef = ref(db, 'users/logged_users');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const users = Object.values(data);
        setUserList(users);
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
        <Icon name="chat" size={24} color="blue" style={styles.chatIcon} />
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
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />

      <Modal visible={visible} transparent animationType='slide'>
      <View style={styles.modalRoot}>
        <View style={styles.modalContainer}>
          <Text>Do you want to chat with this user?</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => setVisible(false)}>
            <Text>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStyle} onPress={() => {confirmChat()}}>
            <Text>Yes</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  userItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
