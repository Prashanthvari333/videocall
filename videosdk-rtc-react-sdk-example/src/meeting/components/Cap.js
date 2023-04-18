import React,{useState,useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { translate } from '@vitalets/google-translate-api';
import axios from 'axios';
import './Captions.css';
import {Translate} from './Translate'
export const Caption = ({ text }) => {
    const [transtext,setTranstext] = useState('')
    useEffect(()=>translateText(text,'te'),[text])
    const translateText = async (text, targetLang) => {
      const response = await fetch('http://localhost:9000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang })
      });
      const translatedText = await response.text();
      console.log(translatedText)
      setTranstext(translatedText);
      
    }
    const trans =async(text,targetLang)=>{
      const res = await fetch(`https://translate.google.co.in/?hl=en&tab=wT&sl=en&tl=te&text=${text}&op=translate`);
      console.log(res);
    }
    return (
      <div className="caption">
        
        {text} 
        {transtext}
        <button style={{color:'ornage',padding:'10px'}} onClick={()=>translateText(text,'te')}>trans</button>
      </div>
    );
  };
export const Cap= (transRef)=>{
    const [cap,setCap] = useState(false)              
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const onCap= async ()=>{
      if (cap){
        startListening();
        
        setCap(!cap);
      } else{
        SpeechRecognition.stopListening();
        setCap(!cap);
      }
    }
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
    <>
      <Caption text={transcript.split(/[.?,]/).slice(-1)}/>
      <button style ={{color:cap?'green':'red'}} onClick={onCap}>cap</button>

    </>
    );
  }
  export default Cap;