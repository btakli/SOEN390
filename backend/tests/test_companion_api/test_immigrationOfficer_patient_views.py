from .test_setup import TestSetUp
from accounts.models import Patient, Doctor

class TestImmigrationOfficerImmigrantViews(TestSetUp):
    """Test suite for views related to Immigration Officer Immigrants"""

    # IMMIGRATION OFFICER IMMIGRANT TESTS
    def test_immigrationofficer_can_get_all_immigrants_when_no_immigrants(self):
        """ImmigrationOfficer_Immigrant: Immigration Officer can get their immigrants when there are none"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.patients_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_immigrationofficer_can_get_all_immigrants_when_one_immigrant(self):
        """ImmigrationOfficer_Immigrant: Immigration Officer can get their immigrants when there is one"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        res = self.client.get(self.patients_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
    
    def test_immigrationofficer_can_get_all_immigrants_when_n_immigrants(self):
        """ImmigrationOfficer_Immigrant: Immigration Officer can get their immigrants when there are n"""

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