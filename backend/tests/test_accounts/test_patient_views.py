from .test_setup import TestSetUp
from accounts.models import User

class TestViews(TestSetUp):
    """Test suite for views related to the Patient"""
    # REGISTER TESTS
    def test_patient_cannot_register_with_no_data(self):
        """Registration: Patient cannot register with no data"""
        res = self.client.post(self.register_patient_url)
        self.assertEqual(res.status_code, 400)

    def test_patient_can_register_with_correct_data(self):
        """Registration: Patient can register with correct data"""
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.assertTrue(User.objects.filter(email = self.correct_patient_data['user']['email']).exists())
        self.assertEqual(res.data['patient']['first_name'], self.correct_patient_data['first_name'])
        self.assertEqual(res.status_code, 201)

    def test_patient_cannot_register_with_no_user(self):
        """Registration: Patient cannot register with no User (every Patient contains a User)"""
        res = self.client.post(self.register_patient_url, self.no_user_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_no_email(self):
        """Registration: Patient cannot register with no email attribute"""
        res = self.client.post(self.register_patient_url, self.no_email_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_no_password(self):
        """Registration: Patient cannot register with no password attribute"""
        res = self.client.post(self.register_patient_url, self.no_password_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_invalid_email_format(self):
        """Registration: Patient cannot register with an invalid email format"""
        self.correct_patient_data['user']['email'] = '123'
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_patient_cannot_register_with_existing_email(self):
        """Registration: Patient cannot register with an existing email (emails are unique)"""
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
        """Login: Patient can login once registered"""
        self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')

        self.assertEqual(res.status_code, 200)

    def test_patient_cannot_login_when_not_registered(self):
        """Login: Patient cannot login if not registered"""
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')

        self.assertEqual(res.status_code, 400)

    # USER VIEW
    def test_return_patient_valid_token_authorized(self):
        """User View: Return a valid token for the Patient when authorized"""
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 200)

    def test_return_patient_no_token_unauthorized(self):
        """User View: If no token for the Patient, we are unauthorized"""
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 401)

    def test_return_patient_invalid_token_unauthorized(self):
        """User View: Invalid token means Patient is unauthorized"""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.get(self.users_patient_url)

        self.assertEqual(res.status_code, 401)

    # LOGOUT VIEW
    def test_patient_can_logout_with_valid_token_authorized(self):
        """Logout View: Patient can logout when they have a valid token"""
        self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        res = self.client.post(self.login_patient_url, self.correct_patient_data['user'], format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 204)

    def test_patient_cannot_logout_with_invalid_token_unauthorized(self):
        """Logout View: Patient cannot logout when they do not have a valid token"""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 401)



