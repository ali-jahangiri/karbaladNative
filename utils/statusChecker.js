import React from 'react';
import { Feather } from '@expo/vector-icons';

const  insuranceActionText = code => {
    if (code === 1) {
        return "در انتظار تایید کارشناس";
    } else if (code === 2) {
        return "در انتظار پرداخت";
    } else if (code === 3) {
        return "در حال صدور بیمه نامه";
    } else if (code === 4) {
        return "صادر شده، در حال ارسال";
    } else if (code === 5) {
        return "تحویل به مامور پست";
    } else {
        return "تحویل شده به بیمه گذار";
    }
}

const statusChecker = code => {
    if(code < 0) return { color : "#ff000036" , title : insuranceActionText(code) , icon : <Feather name="x" size={24} color="#ff000036" />} // canceled
    else if(code === 1 ) return { color : "#ffffff36" , title : insuranceActionText(code) , icon : <Feather name="user-check" size={24} color="#ffffff36" />} // در انتظار تایید کارشناس
    else if (code === 2) return { color : '#0043ff36' , title : insuranceActionText(code) , icon : <Feather name="dollar-sign" size={24} color={"#0043ff36"} /> } // pending for payment
    else if(code >= 3 ) return { color : "#00800040" , title : insuranceActionText(code) , icon : <Feather name="check" size={24} color="#00800040" />} // sended
}

export default statusChecker;