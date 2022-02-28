import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion'
function CountDownTimer({ tillTime = "march 1,2022 10:00:00" }) {
  const [timer, setTimer] = useState({ days: '00', hour: '00', minute: '00', sec: '00', });
  const control = useAnimation();
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
        setTimer({
          days: pad(day),
          hour: pad(hour),
          minute: pad(min),
          sec: pad(sec)
        })
      }
      else {
        setTimer({ days: '00', hour: '00', minute: '00', sec: '00', });
        clearInterval(removeInterval)
      }
      if (diff > 0 && sec == 0) {
        const seq = async () => {
          await control.start({
            y: [0, 40],
            opacity: [1, 0]
          },
          )
          return await control.start({ y: [-30, 0], opacity: [0, 0.5, 1] })
        }
        seq().then(() => {
          control.stop()
        });
      }
    }, 1000);
  }, []);
  return (
    <motion.div
      animate={{ y: [-200, 0] }} className='card-dateTime-container'>
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
      <div >
        <div className='card-container' >
          <div className='card-timer'>
            <div>
              {timer.days}
            </div>
            <div className='label'>
              Days
            </div>
          </div>
          <div className='card-timer'>
            <div>
              {timer.hour}
            </div>
            <div className='label'>
              Hours
            </div>
          </div>
          <motion.div
            animate={control}
            transition={{
              duration: 1
            }}
            className='card-timer'>
            <div>
              {timer.minute}
            </div>
            <div className='label'>
              Minutes
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: .5
            }}
            className='card-timer'>
            <div>
              {timer.sec}
            </div>
            <div className='label'>
              Seconds
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
export default CountDownTimer;