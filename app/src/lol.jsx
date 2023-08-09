import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"



function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "hello",
      sender: "api"
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "User",
      direction: "outgoing"
    }
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    await processMessagetoAPI(newMessages);
  }


  async function processMessagetoAPI(chatMessages){
    
    let apiMessage= chatMessages.map((messageObject) =>{
      let role = "";
      if(messageObject.sender === "API"){
        role="assistant"
      }
      else{
        role="user"
      }
      return {role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "Userid": '1258',
      query: 'your_query_here'
    }
    await fetch("https://127.0.0.1:8000/Chat_me", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data)=> {
      return data.json();
    }).then((data)=> {
      console.log(data);
    });
  }
  return (
    <div className='App'>
      <div style={{ position: "relative", height : "800px", width: "700px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="Model is typing"/>:null}
            >
              {messages.map((message,i) => {
                return <Message key={i} model={(message)} />
              })}
            </MessageList>
            <MessageInput placeholder='type your message here' onSend={handleSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App
