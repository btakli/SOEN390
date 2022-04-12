from .test_setup import TestSetUp

class TestAppointmentViews(TestSetUp):
    """Test suite for views related to Appointment"""

    # ALL APPOINTMENT TESTS
    def test_doctor_cannot_get_appointments_when_no_appointment(self):
        """Appointment: Doctor cannot get their appointments when there are none"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_patient_cannot_get_appointments_when_no_appointment(self):
        """Appointment: Patient cannot get their appointments when there are none"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_doctor_can_get_all_appointments_when_one_appointment(self):
        """Appointment: Doctor can get all their appointments when there is one"""

        res1 = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res1.data['token'])

        res2 = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.appointment_data_1["patient"] = res2.data["user"]["id"]
        self.appointment_data_1["doctor"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_1, format='json')

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_patient_can_get_all_appointments_when_one_appointment(self):
        """Appointment: Patient can get all their appointments when there is one"""

        res1 = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res1.data['token'])

        res2 = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.appointment_data_1["doctor"] = res2.data["user"]["id"]
        self.appointment_data_1["patient"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_1, format='json')

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_doctor_can_get_all_appointments_when_n_appointment(self):
        """Appointment: Doctor can get all their appointments when there is n"""

        res1 = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res1.data['token'])

        res2 = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.appointment_data_1["patient"] = res2.data["user"]["id"]
        self.appointment_data_1["doctor"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_1, format='json')

        self.appointment_data_2["patient"] = res2.data["user"]["id"]
        self.appointment_data_2["doctor"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_2, format='json')

        self.appointment_data_3["patient"] = res2.data["user"]["id"]
        self.appointment_data_3["doctor"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_3, format='json')

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)

    def test_patient_can_get_all_appointments_when_n_appointment(self):
        """Appointment: Patient can get all their appointments when there is n"""

        res1 = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res1.data['token'])

        res2 = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.appointment_data_1["doctor"] = res2.data["user"]["id"]
        self.appointment_data_1["patient"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_1, format='json')

        self.appointment_data_2["doctor"] = res2.data["user"]["id"]
        self.appointment_data_2["patient"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_2, format='json')

        self.appointment_data_3["doctor"] = res2.data["user"]["id"]
        self.appointment_data_3["patient"] = res1.data["user"]["id"]
        self.client.post(self.create_appointment_url, self.appointment_data_3, format='json')

        res = self.client.get(self.list_appointment_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)