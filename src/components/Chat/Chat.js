import React, { useState, useEffect } from 'react'
import './Chat.css'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from '../InfoBar.js/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState();

    const ENDPOINT = 'localhost:5000'

    //Handle Users
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        //We can ommit different events using the method below
        socket.emit('join', { name, room }, () => {

        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    //Handle Messages
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, []);

    //Function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage('') )
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat
