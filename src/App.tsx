import React, {useCallback, useEffect, useMemo, useState} from "react";
import {INITIAL_STEP, INITIAL_VALUE, MAX_VALUE, VALUE_FIX_DELAY} from "./consts";
import "./App.css"

const App: React.FC = () => {
  const [count, setCount] = useState(INITIAL_VALUE);
  const [step, setStep] = useState(INITIAL_STEP);

  const decrease = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const increase = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const changeStep = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = Number(event.target.value);

    setStep(newStep < INITIAL_STEP ? INITIAL_STEP : newStep);
  }, []);

  useEffect(() => {
    if (count > MAX_VALUE) {
      setTimeout(() => {
        setCount(INITIAL_VALUE);
        alert(`Ha-ha-ha it will never be more than ${MAX_VALUE}!!!!!`);
      }, VALUE_FIX_DELAY)
    }
  }, [count]);

  const possibleValuesTillMax = useMemo(() => {
    if (MAX_VALUE < count) {
      return [];
    }

    return new Array(MAX_VALUE - count).fill(null).map((_, i) => count + 1 + i);
  }, [count]);

  return (
      <main className="app">
        <h1 className="logo">
          <div className="logoPart">YET</div>
          <div className="logoPart">ANOTHER</div>
          <div className="logoPart">COUNTER</div>
          <div className="nonHoverableLogoPart"/>
        </h1>
        <div className="content">
          <h2 className="contentTitle">
            Current value is:&nbsp;
            <span className={count > MAX_VALUE ? "wrongValue" : undefined}>{count}</span>
          </h2>
          <div className="actions">
            <button className="actionButton" onClick={decrease}>Decrease</button>
            <button className="actionButton" onClick={increase}>Increase</button>
            <label>
              Step&nbsp;
              <input
                  className="stepInput"
                  value={step}
                  placeholder="Step"
                  type="number"
                  onChange={changeStep}
              />
            </label>
          </div>
          <div>
            Do you think that you can reach values more than {MAX_VALUE}??? No! Ha-ha-ha!!!<br/>
            All values that you can enter are {possibleValuesTillMax.join(", ")}
          </div>
        </div>
      </main>
  );
};

export default App;
