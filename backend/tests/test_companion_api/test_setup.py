from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):

    def patient_latest_status_url(self, pk):
        return f'/api/doctor/patient/status/latest/{pk}/'

    def setUp(self):
        self.register_doctor_url = reverse("accounts:register_doctor_test")
        self.register_patient_url = reverse("accounts:register_patient")
        self.login_doctor_url = reverse("accounts:login_doctor")
        self.login_patient_url = reverse("accounts:login_patient")
        self.list_status_url = reverse("companion_api:status-list")
        self.create_status_url = reverse("companion_api:status-list")
        self.fake = Faker()

        # STATUS DATA

        self.status_data_null = {
            "status": None,
            "soreThroat": False,
            "runnyNose": False,
            "sneezing": False,
            "cough": False,
            "diffBreathing": False,
            "highTemp": False,
            "fever": False,
            "chills": False,
            "fatigue": False,
            "muscleAche": False,
            "smellOrTasteLoss": False,
            "headache": False,
            "stomachPain": False,
            "patient": None
        }

        self.status_data_1 = {
            "status": "Infected",
            "soreThroat": False,
            "runnyNose": False,
            "sneezing": False,
            "caugh": False,
            "diffBreathing": False,
            "highTemp": False,
            "fever": False,
            "chills": False,
            "fatigue": False,
            "muscleAche": False,
            "smellOrTasteLoss": False,
            "headache": False,
            "stomachPain": False
        }

        self.status_data_2 = {
            "status": "Healthy",
            "soreThroat": False,
            "runnyNose": False,
            "sneezing": False,
            "caugh": False,
            "diffBreathing": False,
            "highTemp": False,
            "fever": False,
            "chills": False,
            "fatigue": False,
            "muscleAche": False,
            "smellOrTasteLoss": False,
            "headache": False,
            "stomachPain": False
        }

        # USER DATA

        self.correct_user_data = {
            'email': self.fake.email(),
            'password': self.fake.password()
        }

        # DOCTOR DATA

        self.correct_doctor_data = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        # PATIENT DATA

        self.correct_patient_data = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()