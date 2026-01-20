# Hourly Test Tracker

## Logins

### Engineering Login (Admin User)
Needs password authentication

#### Input Page

1. **Path Section**
    * Contains four input fields and each accepts only the path string as the input. For example in format like UNC (Universal Naming convention).
2. **Input Fields**
    * **Set Date** - Fetch only the records in given specific date.
    * **Set Time** - Fetch only the records whose time should be greater than or equal to the given time.
3. **Submit** - On submit should fetch only the records by the give time and date. And redirect to the production dashboard page which has the table with all the fields and data.


### Production Login (public user)
#### Input Form (search parameters)
1. Date
2. Start Time
3. End Time
4. Test Id instead of Carrier SN
5. Shit (A / B / C)
6. Search Button

# Requirements

## Logins
- Engineering login is only ment for providing the file paths and setting the preffered date and time filters and apply fetch/search. It should be authenticated by password.
- Production login is meant for viewing and interacting with the user requested data by applying required filters and visualizing. When the user enters the fetch/search button from engineering login they'll be redirected to the production view page.
  
## To maintain the state
- Once the data has been fetched from the backend with the preffered date and time, it should be available through out the session until the user refreshes the page or he again fetches the data from engineering login. eventhough we logout and and login again to the production login, the data shouldn't be vanished, it should be same as we left before.
-  In engineering login after we enter the path and apply the fetch/submit button, we'll be redirected to the production page. suppose if we want to view the applied paths, the paths won't be there after we try to view them by engineering login. so another requirement is the applied paths should be available in the input fields through out the session util refresh

## Fields to Display

1. **Input** - Total number of records fetched with the applied filters
2. **Pass/Output** - Number of records whose `Tester_Result` value is `Pass`
3. **Yield %** - Output / Input * 100
4. **Retest %** 
5. **Failed Total** - Number of records whose `Tester_Result` value is `Fail` (or) `Input` - `Pass`
6. **Failed %** -  Failed Total / Input * 100
7. **Top Fail Symptoms** - Most common reasons for failure
8. **Top Fail Tester IDs** - Which testers failed most
9. **Top Fail Carrier SNs** - Carrier numbers that failed most
10. **Total Row** - Shows totals for whole shift/day



### Table (Date Grid)
Visualize rows in table with filter options

#### Columns to display on table

| Column Name | Description                                                                          |  
| :---------- | :------------------------------------------------------------------------------------|
| Time        | ****