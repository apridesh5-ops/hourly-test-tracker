
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
