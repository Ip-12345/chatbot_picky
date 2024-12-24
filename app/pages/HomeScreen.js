import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatFaceData from '../services/ChatFaceData'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const [chatFaceData, setChatFaceData] = useState(); 
    const [selectedChatFace, setSelectedChatFace] = useState(); 
    const navigation = useNavigation();

    useEffect(() => {
        setChatFaceData(ChatFaceData);
        setSelectedChatFace(ChatFaceData[0]);
    }, []);

    const onChatFactPress=(id)=>{
        setSelectedChatFace(ChatFaceData[id-1])
    }

    return (
        <View style={{paddingTop: 90, alignItems:'center'}}>
            <Text style={[{color: selectedChatFace?.primary}, {fontSize: 30}, {textAlign: 'center'}]}>Hello</Text>
            <Text style={[{color: selectedChatFace?.primary}, {fontSize: 30}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>I am {selectedChatFace?.name}</Text>
            <Image source={{uri: selectedChatFace?.image}}
            style={{width: 150, height: 150, marginTop: 20}}/>
            <Text style={{marginTop: 30, fontSize: 25}}>How can I help you?</Text>

            <View style={{margin: 20, backgroundColor: '#F5F5F5', alignItems: 'center', height:110, padding: 10, borderRadius:10}}>
                <FlatList
                    data={chatFaceData}
                    horizontal={true}
                    renderItem={({item})=>selectedChatFace?.id!=item.id&&(
                        <TouchableOpacity style={{margin: 15}} onPress={()=>onChatFactPress(item.id)}>
                            <Image source={{uri:item.image}}
                            style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                    )}
                />
                <Text style={{marginTop: 5, fontSize: 17, color:'#B0B0B0', textAlign:'center'}}>Choose Your Fav ChatBuddy</Text>
            </View>

            <TouchableOpacity onPress={()=>{
                //console.log('Before Navigating, SelectedChatFace:', selectedChatFace);
                navigation.navigate('chat', {selectFace: selectedChatFace})
            }} 
            style={[{backgroundColor: selectedChatFace?.primary}, {padding: 17, 
                width: Dimensions.get('screen').width*0.6, borderRadius: 100, alignItems: 'center', marginTop: 30}]}>
                <Text style={{fontSize: 16, color:'#fff'}}>Let's Chat</Text>
            </TouchableOpacity>
        </View>
    );
}
