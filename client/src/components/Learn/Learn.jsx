import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import Bot from './images-learn/robot.png';
import Pomodoro from './images-learn/pomodoro.png';
import Notes from './images-learn/writing.png';
import Close from './images-learn/close.png';
import Send from './images-learn/send.png';
import Bin from './images-learn/bin.png';
import User from './images-learn/user.png';
import Pause from './images-learn/pause.png';
import Pause2 from './images-learn/pause-p.png';
import Restart from './images-learn/restart.png';
import Play from './images-learn/play-button.png';
import Play2 from './images-learn/play-button-p.png';
import Mic from './images-learn/mic.png';
import Mic2 from './images-learn/mic2.png';
import { Configuration, OpenAIApi } from 'openai';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import jsPDF from 'jspdf'

const Learn = () => {
  const { width, height } = useWindowSize()
  const [data, setData] = useState(null);
  const [state, setState] = useState({});
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const [input, setInput] = useState('');
  const [que, setQue] = useState('');
  const [res, setRes] = useState('');
  const [mm, setMM] = useState(25);
  const [ss, setSS] = useState(0);
  const [q, setQ] = useState(1);
  const [pauss, setPauss] = useState(true);
  const [showBot, setShowBot] = useState(false);
  const [showPom, setShowPom] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [noteTitle, setNoteTitle] = useState('')
  const [noteText, setNoteText] = useState('')
  const messagesEndRef = useRef(null);
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const handleButt = (aux) => {
    if (aux === 1) {
      setShowPom(false);
      setShowNot(false);
      setShowBot(!showBot);
    } else if (aux === 2) {
      setShowPom(!showPom);
      setShowNot(false);
      setShowBot(false);
    } else {
      setShowPom(false);
      setShowNot(!showNot);
      setShowBot(false);
    }
  };

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

  const sendAI = async () => {
    setQue(input);
    setInput('');

    // await openai
    //   .createCompletion({
    //     model: "text-davinci-003",
    //     prompt: input,
    //     temperature: 0,
    //     max_tokens: 100,
    //     top_p: 1,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.0
    //   })
    //   .then(response => {
    //     const newResponse = response.data.choices[0].text;
    //     if (newResponse !== res) {
    //       setRes(newResponse);
    //       setMessages(prevMessages => [...prevMessages, input, newResponse]);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Error:', error);
    //   });
  };

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

  const handleRestartTimer = (aux) => {
    if (aux === 1) {
      setMM(25);
      setQ(1);
    } else {
      setMM(5);
    //   setSS(9);
      setQ(2);
    }
    setSS(0);
  };

  useEffect(() => {
    let timer;
    if (!pauss) {
      timer = setInterval(() => {
        setSS((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(timer);
            if (mm === 0) {
              <Confetti
                width={width}
                height={height}
              />;
              handleRestartTimer(q === 1 ? 2 : 1);
              window.alert("Timer is up!");
            } else {
              setMM((prevMinutes) => prevMinutes - 1);
              setSS(59);
            }
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [pauss, mm, ss, q]);
  

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
              <h4 key={indx}>
                <img src={indx % 2 === 0 ? User : Bot} />
                {message}
              </h4>
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

  const divOfPom = () => (
    <div className='div-of-pom'>
      <div className="head-div-pom">
        <h3>Pomodoro Clock:</h3>
        <img src={Close} onClick={() => handleButt(2)} />
      </div>
      <div className="mid-div-pom">
        <div className="select-timer-pom">
          <button onClick={() => handleRestartTimer(1)}>Pomodoro</button>
          <button onClick={() => handleRestartTimer(2)}>Short Break</button>
        </div>
        <h2>{`${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`}</h2>
      </div>
      <div className="foot-div-pom">
        <img src={pauss ? Play : Play2} onClick={() => setPauss(false)} />
        <img src={pauss ?Pause2 : Pause} onClick={() => setPauss(true)} />
        <img src={Restart} onClick={() => handleRestartTimer(q)} />
      </div>
    </div>
  );

  const handleDownloadNotes = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(20, 20, `${noteTitle ? noteTitle : "Notes from the " + state.name + " course"}`);
  
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(noteText, 180); 
    doc.text(20, 30, lines);
  
    doc.save(`${noteTitle ? noteTitle : state.name + "_notes"}.pdf`);
  }
  

  const divOfNot = () => {
    return (
      <div className='div-of-not'>
        <div className="head-div-pom">
          <h3>Write some notes:</h3>
          <img src={Close} onClick={() => handleButt(3)} />
        </div>
        <div className="mid-div-not">
          <input type="text" placeholder='Title' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}/>
          <textarea placeholder='Write your notes' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
        </div>
        <div className="foot-div-not">
          <button onClick={handleDownloadNotes}>Download your notes</button>
          <img src={micOn ? Mic2 : Mic} onClick={()=>setMicOn(!micOn)}/>
        </div>
      </div>
    );
  };

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
        {showBot ? divOfBot() : <button onClick={() => handleButt(1)}><img src={Bot} /></button>}
        {showPom ? divOfPom() : <button onClick={() => handleButt(2)}><img src={Pomodoro} /></button>}
        {showNot ? divOfNot() : <button onClick={() => handleButt(3)}><img src={Notes} /></button>}
      </div>
    </div>
  );
};

export default Learn;
