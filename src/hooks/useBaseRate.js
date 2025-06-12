import { useState, useEffect } from 'react';
import { getBaseRate, updateBaseRate } from '../services/rateService';

export const useBaseRate = () => {
    const [rate, setRate] = useState(2000); // Default rate while loading
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the initial rate
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const currentRate = await getBaseRate();
                setRate(currentRate);
                setError(null);
            } catch (err) {
                setError('Failed to fetch base rate');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRate();

        // Set up polling to check for updates every 30 seconds
        const pollInterval = setInterval(fetchRate, 30000);

        // Listen for rate changes from other components
        const handleRateChange = (event) => {
            setRate(event.detail);
        };

        window.addEventListener('baseRateChanged', handleRateChange);
        
        return () => {
            clearInterval(pollInterval);
            window.removeEventListener('baseRateChanged', handleRateChange);
        };
    }, []);

    const setNewRate = async (newRate) => {
        setIsLoading(true);
        try {
            const success = await updateBaseRate(newRate);
            if (success) {
                setRate(newRate);
                setError(null);
            } else {
                setError('Failed to update rate');
            }
        } catch (err) {
            setError('Failed to update rate');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return [rate, setNewRate, isLoading, error];
}; 