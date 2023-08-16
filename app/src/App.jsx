import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import './mystyles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"



function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm a chat bot here to help answer your questions about Habib Bank Limited (HBL). How can I assist you today?",
      sender: "api"
    }
  ]);

  const handleSend = (message) => {
    const newMessage = {
      message: message,
      sender: "User",
      direction: "outgoing"
    };
    setMessages([...messages, newMessage]);
    setTyping(true);
    processMessagetoAPI(message);
  };

  async function processMessagetoAPI(query) {
    const apiRequestBody = {
      Userid: '1258',
      query: query
    };
    
    try {
      const response = await fetch("https://web-production-3e03c.up.railway.app/Chat_me", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiRequestBody)
      });
  
      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
  
      const responseData = await response.json();
      const apiResponseMessage = responseData.response;
  
      const newMessage = {
        message: apiResponseMessage,
        sender: "API",
        direction: "incoming"
      };
  
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setTyping(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
   return (
    <div className="App">
     <div style={{ position: "relative", height: "100%", width: "100%", maxWidth: "700px", margin: "0 auto" }}>      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#A6DAD8", fontSize: "20px" }}>
          <span style={{ color: "#009591", fontSize: "28px" }}>HBL</span> Demo Chatbot
        </h1>
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
