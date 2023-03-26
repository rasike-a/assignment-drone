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

# File Upload - express file upload is used to upload files. saved in /uploads/{code}/{image-name}.{image-extension} Max size limot to 4 MB

# Unit test - Unable to get up and running due to jest is not still supporting ES6 syntax (I have added few more scenarios to Postman collection to cover the validation scenarios)

# Post man collection - Attached in mail.

drone-create (success) - Create drone with correct parameters
drone-create-validations - Try create drone with wrong model / wrong state - Not allowed
drones-list - List all drones
get-drone-by-id - Get specific drone details
get-available-drones - Retun drones in IDLE state
load-drone - Load drone with given medications (Array of medication ids should provide as orderItemIds) and delivery location coordinates should provie
get-loaded-medications - Returns details for loaded medications for a given drone (drone id should provide as request param)
get-drone-battery-level - Returns the battery level of requested drone (sample request format - localhost:5000/api/drone/6419e8bde899b600420a5447/battery)
update-drone-state - Drone state updated (Sample format - localhost:5000/api/drone/6419e8bde899b600420a5447/state)
add-medication - Add medication with image (Sample format - localhost:5000/api/medication) Here post request body type should set to form-data to add a file from Postman with other attributes
get-medication-list - Retun list of added medications
add-medication-validations - Validate medication name and code for given conditions, allowed only names and code with given criteria.
