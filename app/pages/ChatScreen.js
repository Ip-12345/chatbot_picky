import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import GlobalApi from '../services/GlobalApi';

export default function ChatScreen() {
  const route = useRoute();
  const { selectFace } = route.params || {}; // Destructuring route params safely
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);

  useEffect(() => {
    console.log('Route Params:', route.params);
    console.log('Selected Face:', selectFace);
    setSelectedChatFace(route.params.selectFace);
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am ' + route.params.selectFace?.name,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: route.params.selectFace?.image,
        },
      },
    ]);
  }, [route.params]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>GiftedChat.append(previousMessages, messages));
    setLoading(true);

    if (messages[0]?.text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = (msg) => {
    GlobalApi.getBardApi(msg)
      .then((resp) => {
        console.log('Response from API:', resp);
  
        // Extract chatbot response based on the provided structure
        const chatbotResponse = resp.resp;
  
        if (chatbotResponse) {
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: chatbotResponse,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: route.params.selectFace?.image,
            },
          };
  
          setMessages((previousMessages) =>GiftedChat.append(previousMessages, chatAPIResp));
          setLoading(false);
        } else {
          setLoading(false);
          const chatAPIResp = {
            _id: Math.random() * (9999999 - 1),
            text: "Sorry, I can not help with it",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: route.params.selectFace?.image,
            },
          };
          setMessages((previousMessages) =>GiftedChat.append(previousMessages, chatAPIResp));

          console.error('Invalid API response format: ', resp);
          alert('Invalid API response. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error fetching Bard API:', error);
        alert('Error fetching data. Please try again later.');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
      />
    </View>
  );
}