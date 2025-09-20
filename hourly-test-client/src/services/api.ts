
const base_url = 'http://localhost:3000';

interface EngineeringRequest {
    paths: {
        machine1: string;
        machine2: string;
        machine3: string;
        machine4: string;
    };
    date: string;
    time: string;
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
