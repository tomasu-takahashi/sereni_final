import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { auth } from '../firebase';
import { onValue, ref, push, update, off, orderByChild, query } from 'firebase/database';
import { db } from '../firebase';

const { height: screenHeight } = Dimensions.get('screen');
const { width: screenWidth } = Dimensions.get('screen');

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = auth.currentUser;
  const uid = user.uid;
  const { userId, chatExist, chatRef} = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading
  const [userDetail, setUserDetail] = useState('');

  useEffect(() => {
    const userRef = ref(db, 'users/logged_users/' + uid);
    onValue(userRef, (snapshot) => {
      setUserDetail(snapshot.val()?.fullname || ''); // Handle the case when user data is not available
      setLoading(false); // Set loading to false once data is retrieved
    });
  }, [uid]);

  useEffect(() => {
    console.log(chatRef)
  },[])

  useEffect(() => {
    if (!chatExist) {
      // createChat();
      console.log('chat exists')
      
    } else if (chatExist) {
      
      const chatRoomRef = query(ref(db, 'chatroom/' + chatRef), orderByChild('createdAt'));
      onValue(chatRoomRef, (snapshot) => {
        const messageList = [];
        snapshot.forEach((child) => {
          const { createdAt, text, user } = child.val();
          messageList.push({
            _id: child.key,
            createdAt: new Date(parseInt(createdAt, 10)),
            text,
            user,
          });
        });
        setMessages(messageList.reverse());
      });
      return () => {
        off(chatRoomRef); // Unsubscribe from chatroomsRef updates
      };
    }
  }, [chatExist, chatRef]);

  const onSend = useCallback((messages = []) => {
    if (!messages || messages.length === 0) {
      return;
    }

    const { _id, createdAt, text } = messages[0];

    if (!_id || !createdAt || !text) {
      return;
    }

    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const chatRoomRef = push(ref(db, 'chatroom/' + chatRef));
    const newMessage = {
      _id,
      createdAt: createdAt.getTime(),
      text,
      user: {
        _id: uid,
      },
    };
    update(chatRoomRef, newMessage);
  }, []);

  // const createChat = () => {
  //   if (chatExist) {
  //     return;
  //   } else {
  //     const chatRef = ref(db, 'chatParticipants');
  //     const newChatRefKey = push(chatRef).key;
  //     const newChatRef = ref(db, 'chatParticipants/' + newChatRefKey);
  //     const userChat = ref(db, 'userChats/' + uid);
  //     const secondUserChat = ref(db, 'userChats/' + userId);

  //     const chatData = {
  //       [uid]: true,
  //       [userId]: true
  //     };
  //     const userChatData = {
  //       [newChatRefKey]: newChatRefKey,
  //     };
  //     const secondUserChatData = {
  //       [newChatRefKey]: newChatRefKey,
  //     };
  //     set(newChatRef, chatData);
  //     update(userChat, userChatData);
  //     update(secondUserChat, secondUserChatData);
  //   }
  // };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#444382', // Change the background color of your own messages
          },
          left: {
            backgroundColor: '#ededed', // Change the background color of other person's messages
          },
        }}
        containerStyle={{
        right: {
          marginRight: 0,
        },
        left: {
          marginLeft: -40,
        },
      }}
      />
    );
  };

  return (
    <View style={styles.root}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
      </Appbar.Header>

      {!loading && (
        <View style={styles.container}>
          <View style={styles.chatStyle}>
            <GiftedChat
              messages={messages}
              onSend={onSend}
              messagesContainerStyle={{
                backgroundColor: '#fff',
              }}
              user={{
                _id: uid,
              }}
              renderBubble={renderBubble}
              inverted={true}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  chatStyle: {
    borderTopWidth: 0,
    borderTopColor: '#efefef',
    borderBottomWidth: 0,
    flex: 1,
  },
});

export default ChatScreen;