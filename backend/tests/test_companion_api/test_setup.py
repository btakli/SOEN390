from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):

    def patient_latest_status_url(self, pk):
        return reverse("companion_api:patient_latest_status", kwargs={'pk':pk})

    def toggle_priority_url(self, pk):
        return reverse("companion_api:toggle_priority", kwargs={'pk':pk})

    def setUp(self):
        self.register_doctor_url = reverse("accounts:register_doctor_test")
        self.register_immigration_officer_url = reverse("accounts:register_immigration_officer_test")
        self.register_patient_url = reverse("accounts:register_patient_test")
        self.login_doctor_url = reverse("accounts:login_doctor")
        self.login_immigration_officer_url = reverse("accounts:login_immigration_officer")
        self.login_patient_url = reverse("accounts:login_patient")

        self.list_status_url = reverse("companion_api:status-list")
        self.create_status_url = reverse("companion_api:status-list")

        self.list_appointment_url = reverse("companion_api:appointment-list")
        self.create_appointment_url = reverse("companion_api:appointment-list")

        self.list_availability_url = reverse("companion_api:availability-list")
        self.create_availability_url = reverse("companion_api:availability-list")

        self.list_notification_url = reverse("companion_api:notification-list")
        self.create_notification_url = reverse("companion_api:notification-list")

        self.list_address_url = reverse("companion_api:address-list")
        self.create_address_url = reverse("companion_api:address-list")

        self.patients_url = reverse("companion_api:doctor_patients")
        self.doctor_url = reverse("companion_api:patient_doctor")
        self.officer_immigrants_url = reverse("companion_api:officer_immigrants")

        self.toggle_doctor_is_away_url = reverse("companion_api:toggle_is_away")

        self.fake = Faker()

        # NOTIFICATION DATA

        self.notification_data_1 = {
            "type": "Email",
            "subject": self.fake.text(max_nb_chars=20),
            "message": self.fake.paragraph(nb_sentences=1)
        }

        self.notification_data_2 = {
            "type": "Assignment",
            "subject": self.fake.text(max_nb_chars=20),
            "message": self.fake.paragraph(nb_sentences=1)
        }

        self.notification_data_3 = {
            "type": "Appointment",
            "subject": self.fake.text(max_nb_chars=20),
            "message": self.fake.paragraph(nb_sentences=1)
        }

        # ADDRESS DATA

        self.address_data_1 = {
            "name": self.fake.word(ext_word_list=['Olimpico', 'IGA', 'Hospital', 'Park']),
            "streetNumber": self.fake.building_number(),
            "streetName": self.fake.street_name(),
            "city": self.fake.city(),
            "province": self.fake.word(ext_word_list=['Quebec', 'Alberta', 'Ontario', 'Saskatchewan']),
            "postalCode": self.fake.postcode()
        }

        self.address_data_2 = {
            "name": self.fake.word(ext_word_list=['Olimpico', 'IGA', 'Hospital', 'Park']),
            "streetNumber": self.fake.building_number(),
            "streetName": self.fake.street_name(),
            "city": self.fake.city(),
            "province": self.fake.word(ext_word_list=['Quebec', 'Alberta', 'Ontario', 'Saskatchewan']),
            "postalCode": self.fake.postcode()
        }

        self.address_data_3 = {
            "name": self.fake.word(ext_word_list=['Olimpico', 'IGA', 'Hospital', 'Park']),
            "streetNumber": self.fake.building_number(),
            "streetName": self.fake.street_name(),
            "city": self.fake.city(),
            "province": self.fake.word(ext_word_list=['Quebec', 'Alberta', 'Ontario', 'Saskatchewan']),
            "postalCode": self.fake.postcode()
        }

        # AVAILABILITY DATA

        self.availability_data_1 = {
            "start": "2022-11-27 10:00",
            "end": "2022-11-27 13:00"
        }

        self.availability_data_2 = {
            "start": "2022-10-27 10:00",
            "end": "2022-10-27 13:00"
        }

        self.availability_data_3 = {
            "start": "2022-10-20 8:00",
            "end": "2022-10-20 10:00"
        }

        # APPOINTMENT DATA

        self.appointment_data_1 = {
            "patient": 0,
            "doctor": 0,
            "date": "2022-11-27 10:00"
        }

        self.appointment_data_2 = {
            "patient": 0,
            "doctor": 0,
            "date": "2022-10-27 14:00"
        }

        self.appointment_data_3 = {
            "patient": 0,
            "doctor": 0,
            "date": "2022-10-20 8:00"
        }

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

        # IMMIGRATION OFFICER DATA

        self.correct_immigration_officer_data = {
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

        self.correct_patient_data_2 = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        self.correct_patient_data_3 = {
            'first_name': self.fake.first_name(),
            'user': {
               'email': self.fake.email(),
                'password': self.fake.password() 
            }
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()