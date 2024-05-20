import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, remaining, currency, dispatch, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const value = Number(event.target.value);
        if (value > 20000) {
            alert("The budget cannot exceed £20,000");
            setNewBudget(20000);
            return;
        }
        if (value < expenses.reduce((total, item) => total + item.cost, 0)) {
            alert("The budget cannot be lower than the spending, which is already allocated.");
            setNewBudget(expenses.reduce((total, item) => total + item.cost, 0));
            return;
        }
        setNewBudget(value);
    };

    const increaseBudget = () => {
        const value = newBudget + 10;
        if (value > 20000) {
            alert("The budget cannot exceed £20,000");
            setNewBudget(20000);
            return;
        }
        setNewBudget(value);
    };

    const decreaseBudget = () => {
        const value = newBudget - 10;
        if (value < expenses.reduce((total, item) => total + item.cost, 0)) {
            alert("The budget cannot be lower than the spending, which is already allocated.");
            setNewBudget(expenses.reduce((total, item) => total + item.cost, 0));
            return;
        }
        setNewBudget(value);
    };

    const saveBudget = () => {
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    const handleCurrencyChange = (event) => {
        dispatch({
            type: 'SET_CURRENCY',
            payload: event.target.value,
        });
    };

    return (
        <div className="budget-container">
            <h2>Company's Budget Allocation</h2>
            <div className="budget-input-container">
                <div className="budget-input">
                    <label>Budget: </label>
                    <span className="currency-symbol">{currency}</span>
                    <input type="number" step="10" value={newBudget} onChange={handleBudgetChange} />
                </div>
                <button onClick={increaseBudget} className="budget-button">+</button>
                <button onClick={decreaseBudget} className="budget-button">-</button>
                <button onClick={saveBudget} className="save-button">Save</button>
            </div>
            <div className="budget-summary">
                <div className="remaining-budget">Remaining: {currency}{remaining}</div>
                <div className="spent-so-far">Spent so far: {currency}{expenses.reduce((total, item) => total + item.cost, 0)}</div>
            </div>
            <div className="currency-selector">
                <label>Currency: </label>
                <select className="custom-select" onChange={handleCurrencyChange} value={currency}>
                    <option value="£">£ Pound</option>
                    <option value="$">$ Dollar</option>
                    <option value="€">€ Euro</option>
                    <option value="₹">₹ Rupee</option>
                </select>
            </div>
        </div>
    );
};

export default Budget;
