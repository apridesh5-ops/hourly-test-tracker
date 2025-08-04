import axios from 'axios';

const base_url = 'http://localhost:3000';

export const fetchProductionData = async () => {
    const response = await axios.post(`${base_url}/fetch-csvs`, {
        paths: [
            "V:\\Projects - 2025\\business\\hourly-test-tracker\\test-files\\TSP_Production_Data_20250620_1.csv",
            "V:\\Projects - 2025\\business\\hourly-test-tracker\\test-files\\TSP_Production_Data_20250620_2.csv",
            "V:\\Projects - 2025\\business\\hourly-test-tracker\\test-files\\TSP_Production_Data_20250620_3.csv",
            "V:\\Projects - 2025\\business\\hourly-test-tracker\\test-files\\TSP_Production_Data_20250620_4.csv"
        ]
    });
    return response.data;
}