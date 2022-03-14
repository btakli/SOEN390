from .test_setup import TestSetUp
from accounts.models import User
from companion_api.models import Status

class TestDoctorViews(TestSetUp):
    """Test suite for views related to the Doctor"""
    # Status TESTS
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

        self.client.post(self.create_status_url, self.status_data, format='json')

        res = self.client.get(self.list_status_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_patient_can_get_all_status_when_n_status(self):
        """Status: Patient can get all their status when there is n"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_status_url, self.status_data, format='json')
        self.client.post(self.create_status_url, self.status_data, format='json')
        self.client.post(self.create_status_url, self.status_data, format='json')

        res = self.client.get(self.list_status_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)