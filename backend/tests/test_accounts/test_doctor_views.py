from .test_setup import TestSetUp
from accounts.models import User

class TestDoctorViews(TestSetUp):
    """Test suite for views related to the Doctor"""
    # REGISTER TESTS
    def test_doctor_cannot_register_with_no_data(self):
        """Registration: Doctor cannot register with no data"""
        res = self.client.post(self.register_doctor_url)
        self.assertEqual(res.status_code, 400)

    def test_doctor_can_register_with_correct_data(self):
        """Registration: Doctor can register with correct data"""
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.assertTrue(User.objects.filter(email = self.correct_doctor_data['user']['email']).exists())
        self.assertEqual(res.data['doctor']['first_name'], self.correct_doctor_data['first_name'])
        self.assertEqual(res.status_code, 201)

    def test_doctor_cannot_register_with_no_user(self):
        """Registration: Doctor cannot register with no User (every Doctor contains a User)"""
        res = self.client.post(self.register_doctor_url, self.no_user_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_no_email(self):
        """Registration: Doctor cannot register with no email attribute"""
        res = self.client.post(self.register_doctor_url, self.no_email_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_no_password(self):
        """Registration: Doctor cannot register with no password attribute"""
        res = self.client.post(self.register_doctor_url, self.no_password_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_invalid_email_format(self):
        """Registration: Doctor cannot register with an invalid email format"""
        self.correct_doctor_data['user']['email'] = '123'
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')

        self.assertEqual(res.status_code, 400)

    def test_doctor_cannot_register_with_existing_email(self):
        """Registration: Doctor cannot register with an existing email (emails are unique)"""
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
        """Login: Doctor can login once registered"""
        self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')

        self.assertEqual(res.status_code, 200)

    def test_doctor_cannot_login_when_not_registered(self):
        """Login: Doctor cannot login if not registered"""
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')

        self.assertEqual(res.status_code, 400)

    # USER VIEW
    def test_return_doctor_valid_token_authorized(self):
        """User View: Return a valid token for the Doctor when authorized"""
        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 200)

    def test_return_doctor_no_token_unauthorized(self):
        """User View: If no token for the Doctor, we are unauthorized"""
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 401)

    def test_return_doctor_invalid_token_unauthorized(self):
        """User View: Invalid token means Doctor is unauthorized"""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.get(self.users_doctor_url)

        self.assertEqual(res.status_code, 401)

    # LOGOUT VIEW
    def test_doctor_can_logout_with_valid_token_authorized(self):
        """Logout View: Doctor can logout when they have a valid token"""
        self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        res = self.client.post(self.login_doctor_url, self.correct_doctor_data['user'], format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 204)

    def test_doctor_cannot_logout_with_invalid_token_unauthorized(self):
        """Logout View: Doctor cannot logout when they do not have a valid token"""
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + '123')
        res = self.client.post(self.logout_url)

        self.assertEqual(res.status_code, 401)


