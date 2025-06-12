import { useState } from 'react';
import { useBaseRate } from '../hooks/useBaseRate';

export const BaseRateManager = () => {
    const [rate, setRate, isLoading, error] = useBaseRate();
    const [inputValue, setInputValue] = useState(rate);

    // Update input value when rate changes
    useState(() => {
        setInputValue(rate);
    }, [rate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRate = parseFloat(inputValue);
        if (!isNaN(newRate) && newRate > 0) {
            await setRate(newRate);
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