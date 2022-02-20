from .test_setup import TestSetUp
from accounts.models import User

class TestViews(TestSetUp):

    # REGISTER TESTS
    def test_patient_cannot_register_with_no_data(self):
        res = self.client.post(self.register_patient_url)
        self.assertEqual(res.status_code, 400)

    def test_patient_can_register_with_correct_data(self):
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.assertTrue(User.objects.filter(email = self.correct_patient_data['user']['email']).exists())
        self.assertEqual(res.data['patient']['first_name'], self.correct_patient_data['first_name'])
        self.assertEqual(res.status_code, 201)

    def test_patient_cannot_register_with_no_user(self):
        res = self.client.post(self.register_patient_url, self.no_user_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_no_first_name(self):
        res = self.client.post(self.register_patient_url, self.no_first_name_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_no_email(self):
        res = self.client.post(self.register_patient_url, self.no_email_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_no_password(self):
        res = self.client.post(self.register_patient_url, self.no_password_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_invalid_email_format(self):
        self.correct_patient_data['user']['email'] = '123'
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_existing_email(self):
        self.client.post(self.register_patient_url, self.default_patient_data, format='json')

        self.correct_patient_data['user']['email'] = self.default_user_data['email']
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

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
    def test_patient_can_login_when_registered(self):
        self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')

        self.assertEqual(res.status_code, 200)

    def test_patient_cannot_login_when_not_registered(self):
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')

        self.assertEqual(res.status_code, 400)

    # USER VIEW
    def test_return_patient_valid_token_authorized(self):
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 200)

    def test_return_patient_no_token_unauthorized(self):
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 401)

    def test_return_patient_invalid_token_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 401)

    # LOGOUT VIEW
    def test_patient_can_logout_with_valid_token_authorized(self):
        self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 204)

    def test_patient_cannot_logout_with_invalid_token_unauthorized(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 401)



