# SOEN390

Repository for the team project of SOEN390 for Winter 2022.

## Prerequisites

- [Python](https://www.python.org/downloads/)
- [node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Setup

```bash
$ python -m pip install -r requirements.txt
$ npm install @babel/core @babel/preset-env @babel/preset-react babel-loader react react-dom react-router-dom webpack webpack-cli
```

## Requirements

### Main Features

- Medical doctors and government health officials want to keep track of those infected with COVID-19. They wish to have a system that makes it easier for them to know the current state of COVID-19 patients and to give advice to these patients.

- The users of the application will be health officials, immigration officers, medical doctors, patients, and administrators of the system (who would assign doctors to patients on top of managing the user accounts of the system).

- The patient must update their status before a certain time of the day (e.g. 11:59PM). The list of details the patient is to provide (temperature, weight, list of symptoms etc.) is defined by the doctor who’s assigned to them (these could be different between patients). They can also re-update their status if there’s a change on the same day and they would like the doctor to be notified or, simply, because they made a mistake when updating their status.

- Health officials and medical doctors can monitor the status and symptoms of confirmed and unconfirmed patients of COVID-19, especially those who were identified through contact tracing. For example, a QR code can be provided with information on a patient’s symptoms or laboratory test results.

- Those patients are required to self-quarantine and keep updating their status using the app. The same updated information can be provided by confirmed COVID-19 patients. The application could use various means to inform and notify a user about the self-quarantine, including, if it’s a mobile app, using GPS, Bluetooth, etc. However, beyond the technical benefits and challenges, legal and moral issues must also be considered.

- The application should allow patients to contact their doctor, and vice versa, using chatbot, email, or other means, from within the application. The communication could be marked as “urgent” or “emergency” for priority review by the doctor.

- The application should have a dashboard that allows doctors to see their patients' status at a high level with some graphs or as a single form for each day. All of a patient’s previously submitted status updates should be accessible and may include the last time the patient has made changes and, possibly, the device from which the changes were made.

- The application must allow the doctors, health officials, or immigration officers to raise flags on certain COVID-19 patients, so that their updates are prioritized over others. Different users of the application must be allowed different visibility on the information stored in the app. For example, while a doctor may see everything, an immigration officer should probably see only identifying information and COVID-19 status, and nothing else.

- The application should also allow health officials to trace and notify the people with whom COVID-19 patients have been in contact, using their basic identification, contact information (telephone and email address), and address.

- The doctor can arrange appointments with a COVID-19 patient and notifications should be sent to the patient (email or SMS could be used for notifications and reminders).

- The application should also allow doctors to see which patient’s updates they have reviewed and which ones they have not reviewed yet (such as with a font color change or any other suggestions the team can come up with).

- The admin also must know how many patients are assigned to each doctor so that no doctor is overloaded while some others do not have as many patients.

### Additional Features

1. When a doctor has an emergency to attend to, the admin could reassign patients or suspected persons to another doctor.
2. The application should have interfaces (APIs) with/to other COVID-19 applications (for example the ones used by the Québec government or WHO).
3. The application should provide barcodes/QR codes for COVID-19 individual records, especially when sharing this information to be read in other media.
