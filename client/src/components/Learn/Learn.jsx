import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import Axios from 'axios';
import Bot from './robot.png'
import Pomodoro from './pomodoro.png'
import Notes from './writing.png'
import Close from './close.png'
import Send from './send.png'
import Bin from './bin.png'
import User from './user.png'
import { Configuration, OpenAIApi} from 'openai'

const Learn = () => {
  const [data, setData] = useState(null)
  const [state, setState] = useState({})
  const [messages, setMessages] = useState([])
  const location = useLocation()
  const [input, setInput] = useState('')
  const [que, setQue] = useState('')
  const [res, setRes] = useState('')
  const [showBot, setShowBot] = useState(false)
  const [showPom, setShowPom] = useState(false)
  const [showNot, setShowNot] = useState(false)
  const messagesEndRef = useRef(null)
  const configuration = new Configuration({
    apiKey: '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',
  })
  const openai = new OpenAIApi(configuration)
  const handleButt = (aux) =>{
    if(aux===1){
        setShowPom(false)
        setShowNot(false)
        setShowBot(!showBot)
    } else if(aux===2){
        setShowPom(!showPom)
        setShowNot(false)
        setShowBot(false)
    } else {
        setShowPom(false)
        setShowNot(!showNot)
        setShowBot(false)
    }
  }

  useEffect(() => {
    if (location.pathname === '/learn' && location.state) {
      const { id, upl, name, sub_id, sub_name } = location.state;
      setState({ id, upl, name, sub_id, sub_name });
      Axios.get('http://localhost:3001/api/getCourseInfo', { params: { id: id } })
        .then((response) => {
          setData(response.data[0]);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }, [location]);

  const sendAI = async() =>{
    setQue(input)
    setInput('')
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: input,
    //     temperature: 0,
    //     max_tokens: 100,
    //     top_p: 1,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.0
    //   });
    // setRes(response.data.choices[0].text);
    // setRes('Raspuns de la bot !')
  }
  useEffect(() => {
    if (que && res) {
      setMessages((prevMessages) => [...prevMessages, que, res]);
    }
  }, [que, res]);


  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const divOfBot = () => {

    return (
      <div className='div-of-bot'>
        <div className="head-div-bot">
          <h3>Ask our AI something:</h3>
          <img src={Close} onClick={() => handleButt(1)} />
        </div>
        <div className="mid-div-bot">
          <div className="messages-container">
            {messages.map((message, indx) => (
              <h4 key={indx}><img src={indx % 2 === 0 ? User : Bot} />{message}</h4>
            ))}
            <div ref={messagesEndRef} /> {/* Empty div used to scroll to the bottom */}
          </div>
        </div>
        <img src={Bin} onClick={() => setMessages([])} className='clear-bot-conv' />
        <div className="foot-div-bot">
          <textarea placeholder='Send message' value={input} onChange={(e) => setInput(e.target.value)}></textarea>
          <img src={Send} onClick={sendAI} />
        </div>
      </div>
    );
  };
  

  const divOfPom =() =>(
    <div onClick={()=>handleButt(2)} className='div-of-pom'>
        Pomodoro
    </div>
  )

  const divOfNot =() =>{
    return (
    <div onClick={()=>handleButt(3)} className='div-of-not'>
        Notes
    </div>
  )}


  return (
    <div className="learn-page-div">
        <div className="learn-div">
            <h1>{state.name}</h1>
            <iframe
                src={data?.curs_yt}
                width="744"
                height="504"
                title="2023-02-23 17-00-57.mkv"
                webkitallowfullscreen
                mozallowfullscreen
                allowFullScreen
            ></iframe>
            <a href={data?.curs_file} download={`Course - ${data?.curs_name} `}>
                Download the course
            </a>
        </div>
        <div className="learn-btns-add">
            {showBot?
                divOfBot():
                <button onClick={()=>handleButt(1)}><img src={Bot} /></button>}
            {showPom?
                divOfPom():
                <button onClick={()=>handleButt(2)}><img src={Pomodoro} /></button>}
            {showNot?
                divOfNot():
                <button onClick={()=>handleButt(3)}><img src={Notes} /></button>}
                    
        </div>
    </div>
  );
};

export default Learn;
