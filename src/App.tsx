import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {unwatchFile} from "fs";

function App() {
    const [count, setCount] = useState(0)
    const [startCount, setStartCount] = useState(0)
    const [maxCount, setMaxCount] = useState(5)
    const [error, setError] = useState('')

    const addValue = () => {
        setError('')
        setCount(startCount)
    }

    useEffect(()=>{
        let countString = localStorage.getItem('count')
        if (countString) {
            let newCount = JSON.parse(countString)
            setCount(newCount)
        }
    },[])

    useEffect(()=> {
        localStorage.setItem('count', JSON.stringify(count))
    },[count])

    const changeStartValue = (e:ChangeEvent<HTMLInputElement>) =>{
        let value = +e.currentTarget.value
        setStartCount(value)
        if (value >= maxCount || value < 0) {
            setError('Incorrect value')
        } else {
            setError('Enter values, press set')
        }
    }

    const changeMaxValue = (e:ChangeEvent<HTMLInputElement>) =>{
        let value = +e.currentTarget.value

        setMaxCount(value)

        if (value <= startCount || value < 0) {
            setError('Incorrect value')
        } else {
            setError('Enter values, press set')
        }
    }

    let inputStartCount = startCount < 0 || startCount > maxCount || startCount === maxCount ? 'inputError' : '';
    let inputMaxCount = maxCount < 0 || maxCount < startCount || startCount === maxCount ? 'inputError' : '';
    let counterClass = error === 'Incorrect value' ||  count === maxCount ? 'counter-out-more' : ''

    return (
        <div className="App">
            {/*set components*/}
            <div className='set'>
                <h3>Counter set</h3>
                <div className='counter-out'>
                    <div>
                        max value: <input type={'number'} value={maxCount} onChange={changeMaxValue} className={inputStartCount}/>
                    </div>
                    <div>
                        start value: <input type={'number'} value={startCount} onChange={changeStartValue} className={inputMaxCount}/>
                    </div>
                </div>
                <div className='btns'>
                    <button disabled={error === 'Incorrect value'}  className='setBtn' onClick={addValue}>SET</button>
                </div>
            </div>
            {/*components show counter*/}
            <div className='show'>
                <h3>Counter show</h3>
                <div className='counter-out'>{error ? error : count}</div>
                <div className='btns-container'>
                    <button disabled={count === maxCount} className='counter' onClick={()=>setCount(count + 1)}>plus</button>
                    <button disabled={count === startCount} className='reset' onClick={()=> setCount(startCount)}>reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;
