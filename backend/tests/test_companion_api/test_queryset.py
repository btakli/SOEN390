from django.test import RequestFactory
from django.urls import reverse
from .test_setup import TestSetUp

class TestQuerySet(TestSetUp):

    def test_PatientsWithMatchingAddressView_queryset(self):
        """query_set: Testing query set of PatientsWithMatchingAddressView is successfully called when patient is authenticated"""
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(reverse("companion_api:patients_risk"))

        self.assertEqual(res.status_code,200)
        