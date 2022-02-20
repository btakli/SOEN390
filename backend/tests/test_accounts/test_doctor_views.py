from .test_setup import TestSetUp
from accounts.models import User

class TestViews(TestSetUp):

    # REGISTER TESTS
    def test_doctor_cannot_register_with_no_data(self):
        res = self.client.post(self.register_doctor_url)
        self.assertEqual(res.status_code, 400)

    def test_doctor_can_register_with_correct_data(self):
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.assertTrue(User.objects.filter(email = self.correct_doctor_data['user']['email']).exists())
        self.assertEqual(res.data['doctor']['first_name'], self.correct_doctor_data['first_name'])
        self.assertEqual(res.status_code, 201)

    def test_doctor_cannot_register_with_no_user(self):
        res = self.client.post(self.register_doctor_url, self.no_user_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_no_first_name(self):
        res = self.client.post(self.register_doctor_url, self.no_first_name_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_no_email(self):
        res = self.client.post(self.register_doctor_url, self.no_email_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_no_password(self):
        res = self.client.post(self.register_doctor_url, self.no_password_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_invalid_email_format(self):
        self.correct_doctor_data['user']['email'] = '123'
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_existing_email(self):
        self.client.post(self.register_doctor_url, self.default_doctor_data, format='json')

        self.correct_doctor_data['user']['email'] = self.default_user_data['email']
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)


    # For potential future conditions on Field Type Constraints
    # def test_user_cannot_register_with_short_password(self):
    #     self.correct_user_data['password'] = '123'
    #     res = self.client.post(self.register_url, self.correct_user_data, format='json')

    #     self.assertEqual(res.status_code, 400)

    # def test_user_cannot_register_with_long_username(self):
    #     self.correct_user_data['username'] = '123'*100
    #     res = self.client.post(self.register_url, self.correct_user_data, format='json')

    #     self.assertEqual(res.status_code, 400)


    # LOGIN TESTS
    def test_doctor_can_login_when_registered(self):
        self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')

        self.assertEqual(res.status_code, 200)

    def test_doctor_cannot_login_when_not_registered(self):
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')

        self.assertEqual(res.status_code, 400)

    # USER VIEW
    def test_return_doctor_valid_token_authorized(self):
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 200)

    def test_return_doctor_no_token_unauthorized(self):
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 401)

    def test_return_doctor_invalid_token_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 401)

    # LOGOUT VIEW
    def test_doctor_can_logout_with_valid_token_authorized(self):
        self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 204)

    def test_doctor_cannot_logout_with_invalid_token_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 401)


