Vaccine Registration App README

Use Case Description:

This application is designed to manage vaccine registration for a hypothetical vaccination drive. It includes the following features for users and administrators:

For Users:

1. Registration:
   - Users can register with the following mandatory fields:
     - Name
     - PhoneNumber
     - Age
     - Pincode
     - Aadhar No

2. User Authentication:
   - Users can log in using their PhoneNumber and password, which they set during registration.

3. Vaccine Slot Availability:
   - Users can view available vaccine time slots on a given day, based on their vaccination status (first/second dose).

4. Slot Registration:
   - Users can register for a vaccine slot for the first or second dose.
   - Example: Register for the 1st dose on June 1st at 11 AM.

5. Second Dose Registration:
   - Users can register for the second dose only after completing their first dose.
   - Once a registered time slot expires, the user is considered vaccinated for that registered dose.

6. Slot Updates:
   - Users can update or change their registered slot up to 24 hours before the appointment.

For Admin:

1. Admin Login:
   - Admins can log in using their credentials, which must be manually created in the database.

2. User Management:
   - Admins can check the total number of registered users and filter them by Age, Pincode, and Vaccination status (none/First dose completed/All completed) - Optional.

3. Slot Management:
   - Admins can check the number of registered slots for the vaccine, including first dose, second dose, and total slots on a given day.

4. Vaccine Slot Details:
   - Admins can view detailed information about vaccine slots, including date, time, and availability.

Deployment Information:

- The application uses Node.js and MongoDB for its backend.
- It is recommended to deploy the app on a Node.js hosting platform and connect it to a MongoDB Atlas database for production use.

Important Dates and Timings:

- The vaccination drive is scheduled from June 1st, 2021, to June 30th, 2021.
- Vaccine slots are available daily from 10 AM to 5 PM.
- Each vaccine slot has a duration of 30 minutes.
- In each slot, there are 10 vaccine doses available.

Total Available Vaccine Doses:

- Total available vaccine doses for the entire drive: 4,200 doses (30 days * 14 hours * 10 doses/hour).

Slot Registration Limit:

- Once 10 vaccine doses in a slot are registered, that time slot becomes unavailable for further registrations unless the registered user modifies their slot to a different one.

For API Documentation and Implementation Details, please refer to the code repository and associated documentation.

