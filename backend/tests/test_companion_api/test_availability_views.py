from .test_setup import TestSetUp

class TestAvailabilityViews(TestSetUp):
    """Test suite for views related to Availability"""

    # ALL AVAILABILITY TESTS
    def test_doctor_cannot_get_availabilities_when_no_availability(self):
        """Availability: Doctor cannot get their availabilities when there are none"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_availability_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_doctor_can_get_all_availabilities_when_one_availability(self):
        """Availability: Doctor can get all their availabilities when there is one"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_availability_url, self.availability_data_1, format='json')

        res = self.client.get(self.list_availability_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_doctor_can_get_all_availabilities_when_n_availability(self):
        """Availability: Doctor can get all their availabilities when there is n"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_availability_url, self.availability_data_1, format='json')
        self.client.post(self.create_availability_url, self.availability_data_2, format='json')
        self.client.post(self.create_availability_url, self.availability_data_3, format='json')

        res = self.client.get(self.list_availability_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)