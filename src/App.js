import { useEffect, useState } from "react";
import CustomInput from "./components/custom-input/custom-input.component";
import "./App.css";

const defaultActionData = {
  bill: {
    value: "",
    error: false,
  },
  tip: "",
  customTip: "",
  people: {
    value: "",
    error: false,
  },
};

const defaultResultData = {
  resultTip: 0,
  resultTotal: 0,
};

function App() {
  const [actionData, setActionData] = useState(defaultActionData);
  const [resultData, setResultData] = useState(defaultResultData);
  const { bill, tip, people, customTip } = actionData;
  const { resultTip, resultTotal } = resultData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "0") {
      setActionData({ ...actionData, [name]: { value: value, error: true } });
    } else {
      setActionData({ ...actionData, [name]: { value: value, error: false } });
    }
  };

  const changeTip = (e) => {
    const name = e.target.getAttribute("name");

    if (name === "tip") {
      const value = e.target.getAttribute("value");
      setActionData({ ...actionData, tip: value, customTip: "" });
    } else {
      const { value } = e.target;
      setActionData({ ...actionData, customTip: value, tip: "" });
    }
  };

  const handleReset = () => {
    setActionData(defaultActionData);
    setResultData(defaultResultData);
  };

  useEffect(() => {
    if (bill.error || people.error) {
      return;
    } else {
      if (bill.value && (tip || customTip) && people.value) {
        const currentTip = tip ? tip : customTip;
        const personNoTip = bill.value / people.value;
        const personTip = (personNoTip / 100) * currentTip;
        const personTotal = personNoTip + personTip;

        setResultData({ resultTip: personTip, resultTotal: personTotal });
      }
    }
  }, [bill, tip, customTip, people]);

  return (
    <div className="App">
      <div className="content-wrapper">
        <img className="logo" src="/imgs/logo.svg" alt="Splitter logo" />
        <div className="content-box">
          <div className="action-container">
            <div className="input-group">
              <div className="label-group">
                <label>Bill</label>
                {bill.error && <p className="error-msg">Can't be zero</p>}
              </div>
              <div className="input-box">
                <img src="/imgs/icon-dollar.svg" alt="icon" />
                <CustomInput type="number" name="bill" value={bill.value} onChange={handleChange} placeholder="0" error={bill.error} />
              </div>
            </div>

            <div className="input-group">
              <label>Select Tip %</label>
              <div className="tip-grid">
                <div className={tip === "5" && !customTip ? "tip-grid-item tip-active" : "tip-grid-item"} name="tip" value="5" onClick={changeTip}>
                  5%
                </div>

                <div className={tip === "10" && !customTip ? "tip-grid-item tip-active" : "tip-grid-item"} name="tip" value="10" onClick={changeTip}>
                  10%
                </div>

                <div className={tip === "15" && !customTip ? "tip-grid-item tip-active" : "tip-grid-item"} name="tip" value="15" onClick={changeTip}>
                  15%
                </div>

                <div className={tip === "25" && !customTip ? "tip-grid-item tip-active" : "tip-grid-item"} name="tip" value="25" onClick={changeTip}>
                  25%
                </div>

                <div className={tip === "50" && !customTip ? "tip-grid-item tip-active" : "tip-grid-item"} name="tip" value="50" onClick={changeTip}>
                  50%
                </div>

                <div className="tip-grid-item">
                  <CustomInput type="number" name="tip-custom" placeholder="Custom" value={customTip} onChange={changeTip} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="label-group">
                <label>Number of People</label>
                {people.error && <p className="error-msg">Can't be zero</p>}
              </div>
              <div className="input-box">
                <img src="/imgs/icon-person.svg" alt="icon" />
                <CustomInput type="number" name="people" value={people.value} onChange={handleChange} error={people.error} placeholder="0" />
              </div>
            </div>
          </div>
          <div className="results-container">
            <div className="result-box">
              <div className="title-group">
                <p>Tip Amount</p>
                <span>/ person</span>
              </div>

              <h2>${resultTip.toFixed(2)}</h2>
            </div>

            <div className="result-box">
              <div className="title-group">
                <p>Total</p>
                <span>/ person</span>
              </div>

              <h2>${resultTotal.toFixed(2)}</h2>
            </div>

            <button className={tip || customTip || bill.value || people.value ? "reset-btn btn-active" : "reset-btn "} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
