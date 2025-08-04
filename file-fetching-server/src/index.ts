import express from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const app = express();

app.use(express.json());

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
    const filePaths: string[] = req.body.filePaths;

    console.log("filePaths", filePaths);

    if (!isArray(filePaths) || filePaths.length == 0) {
        return res.status(400).json({ error: "Please provide atleast one path"});
    }

    try {
        const allCsvPromises = filePaths.map(parseCSV);
        const allDataArrays = await Promise.all(allCsvPromises);
        const mergedData = allDataArrays.flat();

        res.status(200).json({
            message: "CSV files merged successfully",
            rowCount: mergedData.length,
            data: mergedData
        })
    }
    catch (err) {
        console.error("Error processing files: ", err);
        res.status(500).json({ error: "Failed to fetch or parse CSV files"})
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
