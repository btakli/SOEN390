from django.urls import reverse
from django.contrib.auth import tokens
from rest_framework.authtoken.models import Token

from accounts.models import Doctor, Patient
from accounts.utils import TokenGen
from .test_setup import TestSetUp


class TestApprovalViews(TestSetUp):
    """Test suite for views related to approval"""
    # REGISTER TESTS

    def test_approve_doctor_view(self):
        """Approval: Testing approve doctor view"""
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res1 = self.client.get(reverse("accounts:approve_doctor",kwargs={'user_id':"MQ=="}))

        self.assertEqual(res.status_code, 201)
        self.assertEqual(res1.status_code, 200)

    def test_approve_immigration_officer_view(self):
        """Approval: Testing approve immigration officer view"""
        res = self.client.post(self.register_immigration_officer_url, self.correct_immigration_officer_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        
        res1 = self.client.post(self.login_immigration_officer_url, self.correct_immigration_officer_data['user'], format='json')

        res2 = self.client.get(reverse("accounts:approve_immigration_officer",kwargs={'user_id':"MQ=="}))

        self.assertEqual(res.status_code, 201)
        self.assertEqual(res1.status_code, 200)
        self.assertEqual(res2.status_code, 200)

    def test_activate_email_view(self):
        """Approval: Testing activate email view to ensure a patient's email can be verified"""
        self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')
        generate_token = TokenGen()

        token = generate_token.make_token(Patient.objects.get(first_name=self.correct_patient_data['first_name']).user)

        res1 = self.client.get(reverse("accounts:activate_email",kwargs={'user_id':"MQ==",'token':token}))

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res1.status_code, 200)
