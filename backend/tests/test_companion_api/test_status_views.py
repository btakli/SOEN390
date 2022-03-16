from .test_setup import TestSetUp
from accounts.models import Patient, Doctor

class TestStatusViews(TestSetUp):
    """Test suite for views related to Status"""

    # ALL STATUS TESTS
    def test_patient_can_get_all_status_when_no_status(self):
        """Status: Patient can get their status when there are none"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_status_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_patient_can_get_all_status_when_one_status(self):
        """Status: Patient can get all their status when there is one"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_status_url, self.status_data_1, format='json')

        res = self.client.get(self.list_status_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_patient_can_get_all_status_when_n_status(self):
        """Status: Patient can get all their status when there is n"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_status_url, self.status_data_1, format='json')
        self.client.post(self.create_status_url, self.status_data_1, format='json')
        self.client.post(self.create_status_url, self.status_data_1, format='json')

        res = self.client.get(self.list_status_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)

    # DOCTOR PATIENT LATEST STATUS TESTS
    def test_doctor_can_get_patient_latest_status_when_no_status(self):
        """Status: Doctor can get their Patient latest status when there is none"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patient_latest_status_url(patient_pk))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, self.status_data_null)

    def test_doctor_can_get_patient_latest_status_when_one_status(self):
        """Status: Doctor can get their Patient latest status when there is one"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_status_url, self.status_data_1, format='json')

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patient_latest_status_url(patient_pk))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['status'], self.status_data_1['status'])

    def test_doctor_can_get_patient_latest_status_when_n_status(self):
        """Status: Doctor can get their Patient latest status when there is n"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_status_url, self.status_data_1, format='json')
        self.client.post(self.create_status_url, self.status_data_1, format='json')
        self.client.post(self.create_status_url, self.status_data_2, format='json')

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patient_latest_status_url(patient_pk))
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['status'], self.status_data_2['status'])