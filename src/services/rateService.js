// You'll need to replace this with your own JSONBin.io API key
const JSONBIN_API_KEY = '$2a$10$pGUMdjfa9aqcvwuorK7o/u1i1u0KB1noRVWqzan4erVwAVYEnEfNO';
const BIN_ID = '684af1b28960c979a5a8ad8b'; // This will be created when you first save

const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const getBaseRate = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        const data = await response.json();
        return data.record?.baseRate || 2.5; // Default to 2.5 if no rate exists
    } catch (error) {
        console.error('Error fetching base rate:', error);
        return 2.5; // Default rate if fetch fails
    }
};

export const updateBaseRate = async (newRate) => {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify({ baseRate: newRate })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update rate');
        }
        
        // Dispatch event to notify all components
        window.dispatchEvent(new CustomEvent('baseRateChanged', { detail: newRate }));
        return true;
    } catch (error) {
        console.error('Error updating base rate:', error);
        return false;
    }
}; 