import React, { useState } from "react";
import Input from "./components/Input";
import useCurrenecyInfo from "./hook/hook";

const App = () => {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertAmount, setConvertAmount] = useState(0)

  const currencyInfo = useCurrenecyInfo(from)
  const options = Object.keys(currencyInfo)

  const convert = ()=>{
    setConvertAmount(amount * currencyInfo[to])
  }

  const swap = ()=>{
    setFrom(to)
    setTo(from)
    setAmount(convertAmount)
    setConvertAmount(amount)
  }

  return (
    <div className="bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-300 w-full h-screen flex flex-wrap justify-center items-center">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e)=>{
            e.preventDefault();
            convert()
          }}>
            <div className="w-full mb-1">
              <Input 
              label= "from" 
              amount={amount}
              currencyOption={options}
              onAmountChange={(amount)=> setAmount(amount)}
              onCurrencyChange={(currency)=> setFrom(currency)}
              selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">
                swap
              </button>
            </div>
            <div className="w-full mb-4 mt-1">
              <Input
              label= "to" 
              amount={convertAmount}
              currencyOption={options}
              selectCurrency={to}
              onCurrencyChange={(currency)=> setTo(currency)}
              amountDisable
               />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
             convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
