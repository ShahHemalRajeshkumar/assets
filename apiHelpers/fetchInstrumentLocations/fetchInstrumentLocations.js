export const fetchInstrumentLocations = async (language) => {
    try {
        const url = `/api/instruments-locations?language=${language}`;
        const response = await fetch(url);
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error('Failed to load instrument locations:', error);
        return { data: null, error };
    }
};