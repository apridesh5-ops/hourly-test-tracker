import { type CSVRow } from "../components/common/types";


const DB_NAME = 'HourlyTestTrackerDB';
const DB_VERSION = 1;
const STORE_NAME = 'csvData';

class IndexedDBManager {
    private db: IDBDatabase | null = null;

    async initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    }

    async saveData(key: string, data: any): Promise<void> {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(data, key);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }
}