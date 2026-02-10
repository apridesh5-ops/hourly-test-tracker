# 📘 Project Documentation – Hourly Test Tracker
_A web app to fetch, merge, and analyze tester CSV reports_

---

## 1. Project Overview
The **Hourly Test Tracker** is a web application with **two types of login** (Engineering and Production).  

- **Engineering Login** → requires uploading/fetching **4 CSV files** (each from different machines). These files will be merged, cleaned, and shown in a list view with filter options.  
- **Production Login** → works with **1 CSV file** only.  

**Purpose:** Provide a centralized tool to **merge tester CSVs**, analyze test runs, and allow filtering by time/date.

---

## 2. Technology Stack
- **Frontend** → React + TypeScript + Vite + Tailwind CSS  
- **Backend** → Node.js + Express  
- **CSV Parsing & Merging** → `csv-parser` in Node.js  
- **Database (Optional for later)** → MySQL (planned for persistence)  

---

## 3. Completed Features
✅ **Backend**
- Node.js + Express server initialized  
- Endpoint to fetch and parse a single CSV file  
- Endpoint to upload and merge **multiple CSVs (4 files)** and return unified data  

✅ **Frontend Setup**
- Vite + React + TypeScript initialized  
- Tailwind CSS successfully configured  
- Project folder structure ready (`src/components`, `src/pages`, etc.)  

---

## 4. Pending Features
### 🔹 Backend
- Add filtering logic (by `Date`, `Tester_Start_Time`, `Tester_End_Time`)  
- Add error handling (bad CSVs, missing files, invalid paths)  
- Add support for fetching files from other systems via IP (decide between **HTTP server on each machine** vs **file upload**)  

### 🔹 Frontend
- Build **Login Page** (Engineering vs Production login flow)  
- Build **CSV Upload / Path Input Form**  
  - Engineering: 4 file inputs (or paths)  
  - Production: 1 file input (or path)  
- Fetch merged data from backend and display in **List View**  
- Add **filters UI** (date/time range filtering)  
- Add **loading/error states** (e.g., when file parsing fails)  

### 🔹 Future Enhancements (Nice-to-have)
- Save merged results into a **database (MySQL)** for later retrieval  
- Add **charts/graphs** (test count per hour, success/failure rate)  
- Export filtered results as CSV/Excel  
- Authentication & user management (if needed)  

---

## 5. Current Blocker
👉 **How do we fetch the CSV files from different systems in your local network?**

Two options:  
1. **Run HTTP servers on each machine** -> backend fetches via `http://192.168.x.x:8000/file.csv`  
2. **SMB File Sharing method in windows** -> no change in server code, Using UNC (Universal Naming Convention) Path  

---

## 6. Next Immediate Step
We’re at the stage of **Frontend Development**.  

Next tasks:  
1. Create **Login Page (Engineering / Production)**  
2. Create **CSV Upload Form** (4 inputs for Engineering, 1 for Production)  
3. Connect the form → backend endpoint → display merged CSV data in a table  

---

📌 So far: **Backend CSV merging is ready, Tailwind is set up, frontend skeleton is ready.**  
📌 Next: **UI for login + CSV upload, then data display with filters.**
