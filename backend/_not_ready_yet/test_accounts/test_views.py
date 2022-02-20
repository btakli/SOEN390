from .test_setup import TestSetUp
from django.contrib.auth.models import User

class TestViews(TestSetUp):

    # REGISTER TESTS
    def test_user_cannot_register_with_no_data(self):
        res = self.client.post(self.register_url)
        self.assertEqual(res.status_code, 400)

    def test_user_can_register_with_correct_data(self):
        res = self.client.post(self.register_url, self.correct_user_data, format='json')
        
        self.assertEqual(res.data['user']['email'], self.correct_user_data['email'])
        self.assertEqual(res.data['user']['username'], self.correct_user_data['username'])
        self.assertEqual(res.status_code, 201)

    def test_user_cannot_register_with_no_username(self):
        res = self.client.post(self.register_url, self.no_username_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_no_email(self):
        res = self.client.post(self.register_url, self.no_email_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_no_password(self):
        res = self.client.post(self.register_url, self.no_password_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_short_password(self):
        self.correct_user_data['password'] = '123'
        res = self.client.post(self.register_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_long_username(self):
        self.correct_user_data['username'] = '123'*100
        res = self.client.post(self.register_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_invalid_email_format(self):
        self.correct_user_data['email'] = '123'
        res = self.client.post(self.register_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_existing_username(self):
        self.client.post(self.register_url, self.default_user_data, format='json')

        self.correct_user_data['username'] = self.default_user_data['username']
        res = self.client.post(self.register_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_user_cannot_register_with_existing_email(self):
        self.client.post(self.register_url, self.default_user_data, format='json')

        self.correct_user_data['email'] = self.default_user_data['email']
        res = self.client.post(self.register_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    # LOGIN TESTS
    def test_user_can_login_when_registered(self):
        self.client.post(self.register_url, self.correct_user_data, format='json')
        res = self.client.post(self.login_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 200)

    def test_user_cannot_login_when_not_registered(self):
        res = self.client.post(self.login_url, self.correct_user_data, format='json')

        self.assertEqual(res.status_code, 400)

    # USER VIEW
    def test_return_user_valid_token_authorized(self):
        res = self.client.post(self.register_url, self.correct_user_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(self.user_url)

        self.assertEqual(res.status_code, 200)

    def test_return_user_no_token_unauthorized(self):
        res = self.client.get(self.user_url)

        self.assertEqual(res.status_code, 401)

    def test_return_user_invalid_token_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.get(self.user_url)

        self.assertEqual(res.status_code, 401)



