
const base_url = 'http://localhost:3000';

export interface EngineeringRequest {
    paths: string[];
    date?: string;
    time?: string;
}

interface ProductionRequest {
    date?: string;
    startTime?: string;
    endTime?: string;
    testId?: string;
    shift?: 'A' | 'B' | 'C' | '';
}

interface CSVRow {
    Date?: string;
    Tester_Location?: string;
    Tester_Result?: string;
    NG_Qty?: string;
    TesterID?: string;
    Carrier_SN?: string;
    DUT_SN?: string;
    Error_Code?: string;
    Error_Content?: string;
    TesterIP?: string;
    Project_Name?: string;
    Script_Name?: string;
    Serial_Number_Name?: string;
    Tester_Duration?: string;
    Tester_Start_Time?: string;
    Tester_End_Time?: string;
    Record_Time?: string;
}

export class ApiService {
    // Engineering API - fetch data from multiple machines
    static async fetchEngineeringData(params: EngineeringRequest): Promise<CSVRow[]> {
        try {
            const response = await fetch(`${base_url}/fetch-csvs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const results = await response.json()
            console.log(
                `message: ${results.message} \ntotal-record-count: ${results.rowCount}`
            )
            return results.data || [];
        } catch (error) {
            console.error('Engineering API Error: ', error);
            throw new Error('Failed to fetch engineering data');
        }
    }
}

