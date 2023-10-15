import { useState, useEffect } from "react";
import Add from "./components/Add";
import Landing from "./components/Landing";
import { motion, AnimatePresence  } from "framer-motion"
import Journal from "./components/Journal";

import Login from './components/Login'

const computeDegrees = (amt) => {
    return 90 - (amt / 100 > 90 ? 90 : amt/100);
}

export default function App() {
    const [appState, setAppState] = useState(0); // 0 = login; 1 = landing; 2 = add; 3 = journal 
    const [add, setAdd] = useState(false);
    const [journal, setJournal] = useState(false);
    const [scrollAmount, setScrollAmount] = useState(0)
    
    function toggleAdd() {
        setAdd(prev => !prev);
    }
    function toggleJournal(){
        setJournal(prev => !prev);
    }

    useEffect(() => {
        const handleScroll = (e) => {
            setScrollAmount((current) => Math.max(Math.min(current + e.deltaY, 9000), 0))
        }

        window.addEventListener('wheel', handleScroll)
        
        return () => {
            window.removeEventListener('wheel', handleScroll)
        }
    }, [])

    return (
        <div style={{
            "transform": `perspective(100vh) rotateX(${computeDegrees(scrollAmount)}deg)`,
            "transformOrigin": "bottom",
            "height":"100vh"
        }}>
            <Login visible={appState == 0} setAppState={setAppState}/>
            <Landing visible={appState != 0} appState={appState} setAppState={setAppState}/>
            <Add visible={appState == 2} setAppState={setAppState}/>
            <Journal visible={appState == 3} setAppState={setAppState} />
        </div>
    )
}
