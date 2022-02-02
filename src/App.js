import React, {useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import './App.css';

function App() {

    const [time, setTime] = useState(0);
    const [watchOn, setWatchOn] = useState(false);
    const [state, setState] = useState('start');

    useEffect(() => {
        !watchOn ? setState('start') : setState('stop');

        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (watchOn) {
                    setTime(val => val + 1);
                }
            });
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };

    }, [watchOn]);

    const handleStart = () => {
        setWatchOn(prevState => !prevState);
        if (state === 'stop') {
            setTime(0);
        }
    }
    const handleWait = () => {
        if (time !== 0) {
            setWatchOn(false)
        }
    }
    const handleReset = () => {
        setTime(0);
        setWatchOn(true);
    }


    return (
        <div className="App">
            <header className='header'>
                <div className='container'>
                    <h1>Timer</h1>
                    <span className="time">{('0' + Math.floor((time / 3600) % 100)).slice(-2)}</span>:
                    <span className="time">{('0' + Math.floor((time / 60) % 60)).slice(-2)}</span>:
                    <span className="time">{('0' + Math.floor(time % 60)).slice(-2)}</span>
                
                    <div>
                    {(state === 'start') ?
                    <div>
                        <button onClick={handleStart} className='btn startBtn'>Start</button>
                        <button onClick={handleWait} className='btn waitBtn'>Wait</button>
                        <button onClick={handleReset} className='btn resetBtn'>Reset</button>
                    </div>: ""
                    }
                    {(state === 'stop') ?
                    <div>
                        <button onClick={handleStart} className='btn stopBtn'>Stop</button>
                        <button onClick={handleWait} className='btn waitBtn'>Wait</button>
                        <button onClick={handleReset} className='btn resetBtn'>Reset</button>
                    </div>: ""
                    }
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;