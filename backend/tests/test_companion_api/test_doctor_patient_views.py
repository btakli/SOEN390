from .test_setup import TestSetUp
from accounts.models import Patient, Doctor

class TestDoctorPatientViews(TestSetUp):
    """Test suite for views related to Status"""

    # DOCTOR PATIENT TESTS
    def test_doctor_can_get_all_patients_when_no_patients(self):
        """Doctor_Patient: Doctor can get their patients when there are none"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.patients_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_doctor_can_get_all_patients_when_one_patient(self):
        """Doctor_Patient: Doctor can get their patients when there is one"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        # import pdb
        # pdb.set_trace()
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patients_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
    
    def test_doctor_can_get_all_patients_when_n_patients(self):
        """Doctor_Patient: Doctor can get their patients when there are n"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.post(self.register_patient_url, self.correct_patient_data_2, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.post(self.register_patient_url, self.correct_patient_data_3, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patients_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)