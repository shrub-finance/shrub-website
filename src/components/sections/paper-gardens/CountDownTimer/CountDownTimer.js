import React, { useEffect, useState } from 'react';

import './CountDownTimer.css';
function CountDownTimer({tillTime="march 1,2022 10:00:00"}){

const [timer,setTimer]=useState({ days:'', hour:'', minute:'', sec:'',});

useEffect(()=>{
    setInterval(() => {
      const eventDay= new Date(tillTime).getTime();
      const currentDay=new Date().getTime();
      const diff= eventDay-currentDay;
      const day=Math.floor(diff/(1000*60*60*24));
      const hour=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
      const min=Math.floor((diff%(1000*60*60))/(1000*60));
      const sec=Math.floor((diff%(1000*60))/1000);
      setTimer({
          days:pad(day),
          hour:pad(hour),
          minute:pad(min),
          sec:pad(sec)
      })
  }, 1000);
  },[])


  return(
      <div className='card-timer'>
      <div className='card-day'>
        <div>
          {timer.days}
        </div>
        <div className='label'>
          Days
        </div>
      </div>
      <div className='card-hours'>
        <div>
          {timer.hour}
        </div>
        <div className='label'>
          Hours
        </div>
      </div>
      <div className='card-minute'>
        <div>
          {timer.minute}
       </div>
      <div className='label'>
        Minutes
      </div>
    </div>
    <div className='card-sec'>
        <div>
          {timer.sec}
        </div>
        <div className='label'>
          Seconds
        </div>
      </div>
    </div>

  );
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
export default CountDownTimer;