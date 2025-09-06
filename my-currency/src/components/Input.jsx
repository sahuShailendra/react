import React, { useId } from "react";

const Input = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOption = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable= false,
}) => {

    const amountInputid = useId()
  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        <label htmlFor={amountInputid} className="text-black/40 mb-2 inline-block">{label}</label>
        <input
          id={amountInputid}
          type="number"
          placeholder="amount"
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          value={amount}
          disabled={amountDisable}
          className="w-full outline-none bg-transparent py-1.5"
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          className="rounded-lg px-2 py-1 bg-gray-100 outline-none cursor-pointer"
        >
          {currencyOption.map((currency)=> (
            <option key={currency} value={currency}>
                {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Input;
