import express from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

const PORT = 3000;

function isArray(param: any) {
    return Array.isArray(param)
}   

function parseCSV(filePath: string): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
        const results: Record<string, string>[] = [];
        const resolvedFilePath = path.resolve(filePath);
        fs.createReadStream(resolvedFilePath)
        .pipe(csv())
        .on("data", (data) => {results.push(data)})
        .on("end", () => resolve(results))
        .on("error", (err) => reject(err));
    });
}

app.post("/fetch-csvs", async (req, res) => {
    const paths: string[] = req.body.paths;

    console.log("Request body params :", req.body);

    if (!isArray(paths) || paths.length === 0) {
        return res.status(400).json({ error: "Please provide atleast one path"});
    }

    const validPaths = paths.filter(path => !!path);

    try {
        const allCsvPromises = validPaths.map(parseCSV);
        const allDataArrays = await Promise.all(allCsvPromises);
        const mergedData = allDataArrays.flat();
        const successMessage = "CSV files merged successfully"

        res.status(200).json({
            message: successMessage,
            rowCount: mergedData.length,
            data: mergedData
        })
        console.log(successMessage)
        console.log("Total records fetched : ", mergedData.length)
    }
    catch (err) {
        console.error("Error processing files: ", err);
        res.status(500).json({ error: "Failed to fetch or parse CSV files"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
