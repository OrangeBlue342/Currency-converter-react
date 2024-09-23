import React, { useState } from "react";
import { currencies } from "../currencies";
import { Result } from "./Result";
import "./style.css";

export const Form = () => {
    const [currency, setCurrency] = useState(currencies[0].short);
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null); 

    const calculateResult = (currency, amount) => {
        const rate = currencies.find(({ short }) => short === currency)?.rate;

        if (!rate) {
            console.error("Nie znaleziono kursu dla wybranej waluty.");
            return;
        }

        if (amount <= 0) {
            console.error("Kwota musi być większa niż zero.");
            return;
        }

        setResult({
            sourceAmount: +amount,
            targetAmount: amount / rate,
            currency,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        calculateResult(currency, amount);
    };

    return (
    <form className="form" onSubmit={onSubmit}>
        <fieldset className="fieldset">
            <h2 className="fieldset_legend">Kalkulator walut</h2>
            <p>Poznaj aktualne kursy złotego</p>
            <p>
            <label>
                <span className="form_labelText">Kwota</span>
                    <input 
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                    className="Numbertoconverse" 
                    type="number"
                    required 
                    step="any" 
                    min="1"/>
                    </label>
                    </p>
                    <p>
                    <label> 
                        <span className="value">Waluta</span>
                <select  
                value={currency}
                        onChange={({ target }) => setCurrency(target.value)}>
                     {currencies.map((currency) => (
                            <option key={currency.short} value={currency.short}>
                                {currency.name}
                            </option>
                        ))}
                </select>
            </label>
        </p>
    </fieldset>
        <p>
            <button type="submit" className="calcule">Przelicz</button>
        </p>
        {result && <Result result={result} />}

</form>); 
};

export default Form;