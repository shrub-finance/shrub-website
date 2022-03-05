import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion'
import Chapter3 from './Chapter3';
const container={
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1
    }
  }
};
const item = {
  hidden: { y: 50,opacity:0 },
  show: { y: 0,opacity:1,
  transition:{
  duration:2
  }}
};
function CountDownTimer({ tillTime = "march 1,2022 10:00:00" }) {
  const [timer, setTimer] = useState({ days: '00', hour: '00', minute: '00', sec: '00', });
  const [timerDay,setTimerDay]=useState([]);
  const [timerHour,setTimerHour]=useState([]);
  const [timerMinu,setTimerMinu]=useState([]);
  const [timerSec,setTimerSec]=useState([]);
  const control = useAnimation();
  const controlMin = useAnimation();
  const controlMinDiv=useAnimation();
  const controlSec = useAnimation();
  const currentDate = new Date()
  const weekDay = ['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = weekDay[currentDate.getDay()]
  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  useEffect(() => {
      const removeInterval = setInterval(() => {
      const eventDay = new Date(tillTime).getTime();
      const currentDay = new Date().getTime();
      const diff = eventDay - currentDay;
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((diff % (1000 * 60)) / 1000);
      if (diff > 0) {  
        setTimerDay(pad(day));
        setTimerHour(pad(hour));
        setTimerMinu(pad(min));
        setTimerSec(pad(sec));
          {
          if(sec==1){
            anim(controlMin,'controlMin').then(()=>{
              controlMin.stop()
            });  
          }
          if(sec==1 && (min%10)==0)
          {
            controlMin.stop()
            anim(controlMinDiv,'controlMinDiv').then(()=>{
              controlMinDiv.stop()
            }); 
          }   
        }
      }
      else {
        setTimer({ days: '00', hour: '00', minute: '00', sec: '00', });
        clearInterval(removeInterval)
      }
    }, 1000);
  }, []);
    const anim = async (x,y) => {
  
    if(y=='control' || y=='controlSec'){
      if(y=='controlSec'){
        await x.start({
          y: [0, -25],
          opacity: [1, 0]
        },
        )
      return await x.start({ 
        y: [10,0], opacity: [0, 1] })
      }
      else{
        await x.start({
          y: [0, -25],
          opacity: [1, 0]
        },
        )
      return await x.start({ 
        y: [1,0], opacity: [0, 1] })
      }
      
    }
    else{
      await x.start({y: [0,-20],opacity: [1, 0]})
           return await x.start({ y: [20, 0], opacity: [0, 1] })
    }
    
};
  useEffect(() => {
    if(timerSec[1] == 0){       
      anim(controlSec,'controlSec').then(()=>{
        controlSec.stop()
      });   
    }
    else
    {   
      anim(control,'control').then(()=>{
        control.stop();
      }); 
    }  
  }, [timerSec]);
  return (
    <>
    <motion.div className='card-dateTime-container'>
      <div className='card-container' style={{ marginBottom: '5%', paddingLeft: '20%' }} >
        <div >
          {day}
        </div>
        <div style={{ marginLeft: '2%' }} >
          {month}
        </div>
        <div style={{ marginLeft: '2%' }} >
          {date}
        </div>
        <div style={{ marginLeft: '2%' }} >
          {year}
        </div>
      </div>
      <motion.div>
        <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className='card-container'>
        <motion.div
          animate={{opacity:[0,1],y:[50,0]}}
          transition={{duration:2}}
          style={{marginLeft:'5%'}}>
            <div className='card-container' >
            <div className='card-timer'>
            {timerDay[0]}
            </div>
            <div
            className='card-timer'>
            {timerDay[1]}
            </div>
            </div>
            <div className='label'>
              Days
            </div>
            </motion.div>
          <motion.div
          animate={{opacity:[0,1],y:[50,0]}}
          transition={{duration:2,delay:.5}}
          style={{marginLeft:'5%'}}>
            <div className='card-container' >
            <div className='card-timer'>
            {timerHour[0]}
            </div>
            <div className='card-timer'>
            {timerHour[1]}
            </div>
            </div>
            <div className='label'>
              Hours
            </div>
            </motion.div>      
            <motion.div animate={{opacity:[0,1],y:[50,0]}}
          transition={{duration:2,delay:1}} style={{marginLeft:'5%'}}>
            <div className='card-container' >
              <div className='card-container'>
               <motion.div
               animate={controlMinDiv}
               transition={{
                   repeatType: 'loop',
                  duration: 2,
                  }}  
                      className='card-container'>
               <motion.div
               className='card-timer'>
            {timerMinu[0]}
            </motion.div>
            <motion.div
            animate={controlMin}
            transition={{
                          repeatType:'loop',
                            duration: 2,
                            delay:.5
                   }}
            className='card-timer'>
            {timerMinu[1]}
            </motion.div>
               </motion.div>
              </div>
              </div>
            <div className='label'>
              Minutes
            </div>
            </motion.div>
            <motion.div
            animate={{opacity:[0,1],y:[50,0]}}
            transition={{duration:2,delay:1.5}} style={{marginLeft:'5%'}}>
            <div className='card-container'  >
              <motion.div 
              animate={controlSec} 
              transition={{
                duration:1,
                delay:.1
                }}
              className='card-container' >
              <motion.div
             className='card-timer'>
            {timerSec[0]}
            </motion.div>
            <motion.div
            animate={control}
                       transition={{
                       duration:1
            }} className='card-timer'>
            {timerSec[1]}
            </motion.div>
              </motion.div>
                      </div>
            <div className='label'>
              Seconds
            </div>
            </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
      );
}
function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
export default CountDownTimer;