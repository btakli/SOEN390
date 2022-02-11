from rest_framework.test import APITestCase
from django.urls import reverse
from faker import Faker

class TestSetUp(APITestCase):
    def setUp(self):
        self.register_url = reverse("accounts:register")
        self.login_url = reverse("accounts:login")
        self.user_url = reverse("accounts:user")
        self.fake = Faker()

        self.default_user_data = {
            'username': 'test',
            'email': 'a@gmail.com',
            'password': '12345678'
        }

        self.correct_user_data = {
            'username': self.fake.user_name(),
            'email': self.fake.email(),
            'password': self.fake.password()
        }

        self.no_password_user_data = {
            'username': self.fake.user_name(),
            'email': self.fake.email()
        }

        self.no_email_user_data = {
            'username': self.fake.user_name(),
            'password': self.fake.password()
        }

        self.no_username_user_data = {
            'email': self.fake.email(),
            'password': self.fake.password()
        }

        return super().setUp()

    def tearDown(self):
        return super().tearDown()