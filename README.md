# backend

run - npm install
run - node index.js

# db

MongoDB Atlas will be using - It has setup in my private cluster and app is configured to use it

# Drones - Drone routes - Postman Collection provides in a mail

Add Drone : post(addDrone) - localhost:5000/api/drone/
Get Drones : get(getDrones) - localhost:5000/api/drone/
Get Drone : get(getDroneById) - localhost:5000/api/drone/{:id}
Get Drone Battery Level : get(getDroneBatteryLevel) - localhost:5000/api/drone/{:id}/battery
Update Drone State : put(updateDroneState) - localhost:5000/api/drone/{:id}/state

# Medication - Medicatio routes

Add Medication : post(addMedication) - localhost:5000/api/medication/
Get Medications : get(getMedications) - localhost:5000/api/medication/
Get Medication : get(getMedicationById) - localhost:5000/api/medication/{:id}

# Dispatch - Dispatch routes

Load Drone : post(loadDrone) - localhost:5000/api/dispatch/
Get Available Drones : get(getAvailableDrones) - localhost:5000/api/dispatch/
Get Loaded Items : get(getLoadedItems) - localhost:5000/api/dispatch/{:id}

# Logger - Rolling file appender and console appender added in utils

# Scheduling - node-schedule is used to do the recursive jobs
