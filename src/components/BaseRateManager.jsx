import { useState, useEffect } from 'react';

const BIN_ID = "692cfad0ae596e708f7b442a";
const MASTER_KEY = "$2a$10$5x.BCszwTo3bpSC9Hw/ULOKiwymiCYXGu563gmCsYdMgqGu3AAn7G";
const API_BASE = "https://api.jsonbin.io/v3/b";

async function getBaseRate() {
    try {
        const response = await fetch(`${API_BASE}/${BIN_ID}/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": MASTER_KEY,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data.record.base_rate;
    } catch (err) {
        console.error("Failed to fetch base rate:", err);
        return null;
    }
}

async function setBaseRate(newRate) {
    try {
        const response = await fetch(`${API_BASE}/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "X-Master-Key": MASTER_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ base_rate: newRate }),
        });
        const data = await response.json();
        return data.record.base_rate;
    } catch (err) {
        console.error("Failed to update base rate:", err);
        return null;
    }
}

export const BaseRateManager = () => {
    const [rate, setRate] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        const loadRate = async () => {
            setIsLoading(true);
            setError("");
            const current = await getBaseRate();
            if (mounted) {
                if (typeof current === "number" && !isNaN(current)) {
                    setRate(current);
                    setInputValue(current);
                } else {
                    setError("Failed to fetch base rate");
                }
                setIsLoading(false);
            }
        };
        loadRate();
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        setInputValue(rate);
    }, [rate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRate = parseFloat(inputValue);
        if (!isNaN(newRate) && newRate > 0) {
            setIsLoading(true);
            setError("");
            const updated = await setBaseRate(newRate);
            if (typeof updated === "number" && !isNaN(updated)) {
                setRate(updated);
                setInputValue(updated);
            } else {
                setError("Failed to update base rate");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Base Rate Manager</h2>
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="baseRate" className="block text-sm font-medium text-gray-700">
                        Base Rate per Kilometer
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            name="baseRate"
                            id="baseRate"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter base rate"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isLoading 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                    }`}
                >
                    {isLoading ? 'Updating...' : 'Update Rate'}
                </button>
            </form>
            <div className="mt-4">
                <p className="text-sm text-gray-600">
                    Current base rate: <span className="font-medium">{rate}</span> per kilometer
                    {isLoading && <span className="ml-2 text-indigo-600">(Refreshing...)</span>}
                </p>
            </div>
        </div>
    );
};
