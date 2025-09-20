import type { EngineeringRequest } from '../services/api';
import { ApiService } from '../services/api'

const mockEngineeringRequest: EngineeringRequest = {
    paths: {
        machine1: "V:\\Projects-2025\\business\\hourly-test-tracker\\test-and-reference-files\\csv-test-files\\TSP_Production_Data_20250620_1.csv",
        machine2: "V:\\Projects-2025\\business\\hourly-test-tracker\\test-and-reference-files\\csv-test-files\\TSP_Production_Data_20250620_2.csv",
        machine3: "V:\\Projects-2025\\business\\hourly-test-tracker\\test-and-reference-files\\csv-test-files\\TSP_Production_Data_20250620_3.csv",
        machine4: "V:\\Projects-2025\\business\\hourly-test-tracker\\test-and-reference-files\\csv-test-files\\TSP_Production_Data_20250620_4.csv"
    }
}

//Test EngineeringDataFetch 
async function testEngineeringData() {
    console.log('Testing fetchEngineeringData...');
    console.log('Request: ', mockEngineeringRequest);

    try {
        const startTime = Date.now();
        const result = await ApiService.fetchEngineeringData(mockEngineeringRequest);
        const endTime = Date.now();

        console.log('Response Success!!!!!');
        console.log(`Response Time - ${endTime - startTime}ms`);
        console.log(`Records Length : ${result.length}`);
        console.log(`Sample Result: `, result.slice(0, 3));

        return result;
    } catch (error) {
        console.error('Error fetching csv records: ', error);
        throw error;
    }
}

//Test all Fetch APIs
export async function runAllApiTests() {
    console.log('Running all API tests...\n');

    try {
        await testEngineeringData();
    } catch (error) {
        console.error('\n❌ Test suite failed: ', error);
    }
}

