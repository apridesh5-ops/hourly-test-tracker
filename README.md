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

#### Table (Date Grid)
visualize rows in table with filter options
