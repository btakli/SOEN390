from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_doctor_url = reverse("accounts:register_doctor_test")
        self.register_patient_url = reverse("accounts:register_patient_test")
        self.register_immigration_officer_url = reverse("accounts:register_immigration_officer_test")
        self.login_doctor_url = reverse("accounts:login_doctor")
        self.login_patient_url = reverse("accounts:login_patient")
        self.login_immigration_officer_url = reverse("accounts:login_immigration_officer")
        self.users_doctor_url = reverse("accounts:users_doctor")
        self.users_patient_url = reverse("accounts:users_patient")
        self.logout_url = reverse("accounts:knox_logout")
        self.fake = Faker()

        # USER DATA

        self.default_user_data = {
            'email': 'a@gmail.com',
            'password': '12345678'
        }
        self.correct_user_data = {
            'email': self.fake.email(),
            'password': self.fake.password()
        }

        self.no_email_user_data = {
            'password': self.fake.password()
        }

        self.no_password_user_data = {
            'email': self.fake.email()
        }

        # DOCTOR DATA

        self.default_doctor_data = {
            'first_name': 'Joe',
            'user': self.default_user_data
        }

        self.correct_doctor_data = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        self.no_user_doctor_data = {
            'first_name': self.fake.first_name()
        }

        self.no_first_name_doctor_data = {
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        self.no_email_doctor_data = {
            'first_name': self.fake.first_name(),
            'user': self.no_email_user_data
        }

        self.no_password_doctor_data = {
            'first_name': self.fake.first_name(),
            'user': self.no_password_user_data
        }

        # PATIENT DATA

        self.default_patient_data = {
            'first_name': 'Joe',
            'user': self.default_user_data
        }

        self.correct_patient_data = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        self.no_user_patient_data = {
            'first_name': self.fake.first_name()
        }

        self.no_first_name_patient_data = {
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        self.no_email_patient_data = {
            'first_name': self.fake.first_name(),
            'user': self.no_email_user_data
        }

        self.no_password_patient_data = {
            'first_name': self.fake.first_name(),
            'user': self.no_password_user_data
        }
         # IMMIGRATION OFFICER DATA

        self.correct_immigration_officer_data = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()