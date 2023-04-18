/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export function Translate(sentence) {
    const translateText = () => {
        
        let data = {
            q : sentence,
            source: 'en',
            target: 'hi',
        }
        axios.post(`https://libretranslate.com/translate`, data)
        .then((response) => {
            console.log(response.data.translatedText)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return <button onClick={translateText} style={{color:'orange'}}>trans</button>;
}
*/
const translateText = async (text, targetLang) => {
    const response = await fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    });
    const translatedText = await response.text();
    return translatedText;
  }