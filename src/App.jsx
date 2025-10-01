import { useEffect, useState, useRef } from 'react'
import useSound from 'use-sound'
import PlayArea from './components/PlayArea'
import ScoreBoard from './components/ScoreBoard'
import './styles.css'
export default function App() {
  const STARTING_TIME = 60
  const STARTING_SCORE = 0
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(STARTING_TIME)
  const [score, setScore] = useState(STARTING_SCORE)
  const [playSong] = useSound('/audio/song.mp3')
  const [playClick] = useSound('/audio/click.mp3', { volume: 0.45 })
  const id = useRef()

  /* Challenge 

       Uygulamanın temel oyun bileşenleri zaten yerinde,
        ancak başlat butonu ve zamanlayıcı tamamlanmamış durumda. 
        Sizin göreviniz oyunu çalıştırmak için bunları ayarlamayı bitirmek

        1. Kullanıcı başlat butonuna tıkladığında. 
            - zamanlayıcı saniyeleri geri saymaya başlar.
            - başlat butonunun classList'inde "fade-in" class'ı "fade-out" ile değiştirilir.
            - başlat butonu devre dışı bırakılır. 
            - playSong() ve playClick() çağrılarak müzik ve tıklama sesi çalınır. 
        
        2. 0 saniyede zamanlayıcı durur ve başlat butonunun classList'inde "fade-out", "fade-in" ile değiştirilir. 
        
        3. Oyuncu daha sonra başlat butonuna tekrar tıklarsa, 
        zamanlayıcı 60 saniyeye sıfırlanır ve skor 0'a sıfırlanır ve
         görev 1'de listelenen her şey tekrar gerçekleşir. 
        
        4. Bu görevleri yerine getirmek için *sadece* bu yorumların altına kod yazmanız gerekir; 
        bunların üzerinde veya farklı bir dosyada herhangi bir şey değiştirmeniz veya eklemeniz gerekmez 
*/

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      id.value = setInterval(() => setTimeLeft(p => p - 1), 1000)
      return () => clearInterval(id.value)
    }
  }, [timerRunning, timeLeft])

  const handle = () => {
    console.log(timeLeft)
    if (timeLeft != STARTING_TIME) {
      setTimeLeft(60)
      setScore(0)
    }
    setTimerRunning(true)
    playSong()
    playClick()
  }

  return (
    <div>
      <ScoreBoard data={{ score, timeLeft }} />
      <PlayArea playProps={{ timeLeft, timerRunning, setScore }} />
      <button className={`play-button ${timerRunning && (timeLeft > 0) ? "fade-out" : "fade-in"}`}
        disabled={timeLeft != STARTING_TIME && timeLeft != 0}
        onClick={handle}>Başlat</button>
    </div >
  )
}
