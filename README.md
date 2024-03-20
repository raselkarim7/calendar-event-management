
# Calendar Events Management 

## Deployed in Vercel
### Please Check this: https://calendar-event-management-ye5v.vercel.app/

### Clone this repository at first and run below commands in the Root Directory
```sh
npm install
```

```sh
npm start
```

### These commands will 
- Install **concurrently** package in root directory
- Install related dependencies inside the [**packages/backend**](/packages/backend/) and [**packages/frontend**](/packages/frontend/) directory. 
- And then will **run** both **backend** and **frontend**. 

### After running the project, URL:
Backend: http://localhost:5000/
<br />
Frontend: http://localhost:3000/

### Note
- **Backend: Implementation is done**
- **Frontend: Implementation is done** 

### Backend run guide.
**If you want to run the backend application on local machine**
- You have to edit [packages\backend\.env](\.env)
- Here have to uncomment the local db url and comment the mongo db atlas like below
```sh
MONGO_URI=mongodb://127.0.0.1:27017/calender_events_db
# MONGO_URI=mongodb+srv://raselkarim7:0Sn8W8sLfyP5gakG@calendereventsdb.trsgqph.mongodb.net/?retryWrites=true&w=majority&appName=CalenderEventsDB
```




### Tools
- **husky** added 
- husky will run linter in **Frontend** part while **pre-commit**, and check the linter  
- Also husky will build the **Frontend** while **pre-push** and won't push in case of build failure. 

### UI Snapshots

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)