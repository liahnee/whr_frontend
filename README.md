This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Web Health Recording (WHR)

This project was built as a tool for medical scribes in training, pre-med students, and others to practice taking in-clinic notes.
Users can: 
1. create an account
2. create multiple patients up to 10 
3. create multiple chief complaints per patient
4. create multiple charts/notes per chief complaint

### Sets used

React, Redux, Semantic-UI-React, React Table, HOC, yarn
[Link to Frontend Git](https://github.com/liahnee/whr_frontend)

Ruby on Rails, RestClient, Postgres, JWT
[Link to Backend Git](https://github.com/liahnee/whr_backend)

### Home 


Left Table: List of all patients that User created. Patient name can be clicked to view chief complaints. New chief complaint can be added with icon to the of the name. 

Center Table: List of chief complaints of the patient. The arrow on the left opens list of past charts created. Clicking on the chief complaint adds patient to the schedule with the selected chief complaint. <br />
**Note: If the patient is already selected in the room, you need to 'checkout' the patient before rescheduling.**

Right Table: List of selected patients to be seen in the room. 

### Room 

Top left dropdown: User has list of scheduled patients to choose from. Patients can be switched around without being checked out. 

Patient card: Name, chief complaint, and checkout button to unschedule the patient without creating a chart. 

Dates: required to create a chart. 

HPI, ROS, PE: Places to take notes.

Diagnosis search bar: Enter in a keyword to search through ICD-11 and click on the magnifying glasses icon on the right. Diagnosis Dropdown menu will be updated with 50 search results. 

Prescription: Will be updated in the future.

### New Pt

All fields except additional questions for females must be filled out to create a patient. 
First and last names must be between 2~12 letters long.
Age must be an integer between 1~120.

Personality, lifestyle, and finance category will be used in future updates. They do not affect current activities. 
