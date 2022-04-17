from .test_setup import TestSetUp

class TestNotificationViews(TestSetUp):
    """Test suite for views related to Notification"""

    # ALL NOTIFICATION TESTS
    def test_patient_cannot_get_notifications_when_no_notification(self):
        """Notification: Patient cannot get their notifications when there are none"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.get(self.list_notification_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_patient_can_get_all_notifications_when_one_notification(self):
        """Notification: Patient can get all their notifications when there is one"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_notification_url, self.notification_data_1, format='json')

        res = self.client.get(self.list_notification_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_patient_can_get_all_notifications_when_n_notification(self):
        """Notification: Patient can get all their availabilities when there is n"""

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        self.client.post(self.create_notification_url, self.notification_data_1, format='json')
        self.client.post(self.create_notification_url, self.notification_data_2, format='json')
        self.client.post(self.create_notification_url, self.notification_data_3, format='json')

        res = self.client.get(self.list_notification_url)
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)