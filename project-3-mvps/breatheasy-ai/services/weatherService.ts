import { WeatherData } from '../types';

// Pollen grains/m3 to a Low/Medium/High label, with the dominant species named
function pollenSummary(current: any): string {
    if (!current) return 'Low';
    const species: Array<[string, number | undefined]> = [
        ['Grass', current.grass_pollen],
        ['Ragweed', current.ragweed_pollen],
        ['Birch', current.birch_pollen],
        ['Alder', current.alder_pollen],
        ['Olive', current.olive_pollen],
        ['Mugwort', current.mugwort_pollen],
    ];
    const valid = species.filter(([, v]) => typeof v === 'number' && v > 0) as Array<[string, number]>;
    if (valid.length === 0) return 'Low';
    const [name, value] = valid.reduce((a, b) => (b[1] > a[1] ? b : a));
    const level = value >= 200 ? 'High' : value >= 20 ? 'Medium' : 'Low';
    return `${level} (${name})`;
}

export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
    try {
        const [weatherRes, airRes] = await Promise.all([
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`
            ),
            fetch(
                `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm2_5,grass_pollen,ragweed_pollen,birch_pollen,alder_pollen,olive_pollen,mugwort_pollen`
            ).catch(() => null),
        ]);

        if (!weatherRes.ok) {
            throw new Error('Weather data fetch failed');
        }

        const data = await weatherRes.json();
        const current = data.current;

        let aqi = 45;
        let pm25 = 12;
        let pollen = 'Low';
        if (airRes?.ok) {
            const aqData = await airRes.json().catch(() => null);
            const aq = aqData?.current;
            if (aq) {
                if (typeof aq.us_aqi === 'number') aqi = aq.us_aqi;
                if (typeof aq.pm2_5 === 'number') pm25 = Math.round(aq.pm2_5 * 10) / 10;
                pollen = pollenSummary(aq);
            }
        }

        return {
            temperature: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            weatherCode: current.weather_code,
            isDay: current.is_day === 1,
            aqi,
            pm25,
            pollen,
            condition: getWeatherDescription(current.weather_code)
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        // Fallback Mock Data
        return {
            temperature: 72,
            humidity: 45,
            windSpeed: 8,
            weatherCode: 0,
            isDay: true,
            aqi: 50,
            pm25: 15,
            pollen: 'Medium',
            condition: 'Sunny'
        };
    }
};

export const getWeatherDescription = (code: number): string => {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    switch (code) {
        case 0: return 'Clear sky';
        case 1:
        case 2:
        case 3: return 'Partly cloudy';
        case 45:
        case 48: return 'Fog';
        case 51:
        case 53:
        case 55: return 'Drizzle';
        case 61:
        case 63:
        case 65: return 'Rain';
        case 71:
        case 73:
        case 75: return 'Snow';
        case 95:
        case 96:
        case 99: return 'Thunderstorm';
        default: return 'Variable';
    }
}
