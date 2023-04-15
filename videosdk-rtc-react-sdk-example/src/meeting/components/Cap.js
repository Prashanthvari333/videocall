import React,{useState,useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Captions.css'
const Caption = ({ text }) => {
    return (
      <div className="caption">
        {text}
      </div>
    );
  };
  
export default Caption;
export const Cap=({transRef})=>{
    console.log(transRef)
    const [cap,setCap] = useState(false)              
    const [text,setText] =  useState('')
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    // useEffect(setText( transcript.split('.').slice(-2)),[text])
    const onCap=()=>{
      setText('hey u add ur subtitles here..');
      if (cap){
        startListening();
        console.log(transcript);
        setCap(!cap);
        Caption(transcript)
        setText(transcript);
      } else{
        SpeechRecognition.stopListening();
        setCap(!cap);
      }
      
      console.log(transcript);
      console.log(cap)
    }
    
      
      
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
    <>
    <Caption text={ transcript.split('.').slice(-2)}/>
    {/*<p style={{color:'white', height:50,widht:100,position:'fixed'}} >{transcript}</p>*/}
    <button style ={{color:cap?'green':'red'}} onClick={onCap}>cap</button>
    {/*<button style={{color:'red'}} onClick={SpeechRecognition.stopListening}>stop</button>*/}
    
    </>);
  }
  