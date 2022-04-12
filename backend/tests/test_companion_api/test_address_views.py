from .test_setup import TestSetUp

class TestAddressViews(TestSetUp):
    """Test suite for views related to Address"""

    # ALL STATUS TESTS
    def test_patient_cannot_get_addresses_when_no_address(self):
        """Address: Patient cannot get their addresses when there are none"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_address_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_patient_can_get_all_addresses_when_one_address(self):
        """Address: Patient can get all their addresses when there is one"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_address_url, self.address_data_1, format='json')

        res = self.client.get(self.list_address_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_patient_can_get_all_addresses_when_n_address(self):
        """Address: Patient can get all their availabilities when there is n"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_address_url, self.address_data_1, format='json')
        self.client.post(self.create_address_url, self.address_data_2, format='json')
        self.client.post(self.create_address_url, self.address_data_3, format='json')

        res = self.client.get(self.list_address_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)