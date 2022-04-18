from django.urls import reverse
from companion_api.models import Person
from accounts.models import Doctor, Patient, User
from faker import Faker
from .test_setup import TestSetUp
from knox.models import AuthToken



import datetime


class ModelTestCases(TestSetUp):
    """This is a test case which tests that the attributes of the Person Model are properly set up."""

    def setUp(self):
        super(ModelTestCases, self).setUp()
        Person.objects.create(
            first_name="Brandon",
            last_name="Takli",
            email="brandon@hotmail.com",
            date_of_birth=datetime.date(day=20, month=10, year=2000),
        )
        Person.objects.create(
            first_name="John",
            last_name="Smith",
            email="john@gmail.com",
            date_of_birth=datetime.date(day=2, month=1, year=2001),
        )
        self.fake = Faker()

    def test_person_attribute(self):
        """Check that the people are properly stored in the database"""
        p1 = Person.objects.get(first_name="Brandon")
        p2 = Person.objects.get(date_of_birth=datetime.date(day=2, month=1, year=2001))
        p3 = Person.objects.get(last_name="Smith")
        p4 = Person.objects.get(email="brandon@hotmail.com")
        self.assertEqual(p1.last_name, "Takli")
        self.assertEqual(p2, p3)
        self.assertEqual(p1.email, "brandon@hotmail.com")
        self.assertEqual(p1, p4)
    
    def test_superuser_can_be_created(self):
        """Admin: Ensure superuser (Admin) can properly be created with valid email and a password""" 
        email = "admin@email.com"
        superuser = User.objects.create_superuser(email,self.fake.password())
        #Ensure that the superuser was created with the right email
        self.assertEqual(superuser.email,email)
    
    def test_superuser_cant_be_created_without_email(self):
        """Admin: Ensure superuser (Admin) cannot be created without an email""" 
        email = None
        #Ensure exception is thrown
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email,self.fake.password())

    def test_superuser_cant_be_created_with_is_staff_false(self):
        """Admin: Ensure superuser (Admin) cannot be created when is_staff is set to false""" 
        email = "admin@email.com"
        #Ensure exception is thrown
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email,self.fake.password(),is_staff=False)    

    def test_superuser_cant_be_created_with_is_superuser_false(self):
        """Admin: Ensure superuser (Admin) cannot be created when is_superuser is set to false""" 
        email = "admin@email.com"
        #Ensure exception is thrown
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email,self.fake.password(),is_superuser=False)

    def test_superuser_can_access_ReassignPatientsToTempDoctorView(self):
        """Admin: Ensure superuser (Admin) can access ReassignPatientsToTempDoctorView""" 
        #Create 2 doctors
        resDoc1 = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        resDoc2 = self.client.post(self.register_doctor_url, self.correct_doctor_data2, format='json')

        id1 = resDoc1.data['user']['id']
        id2 = resDoc2.data['user']['id']

        #Create a patient
        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=id1).patients.add(Patient.objects.get(user_id=patient_pk))

        email = "admin@email.com"
        password = self.fake.password()
        
        json_data = {
            "doctor": id1,
            "temp_doctor": id2,
            "start_date": "2022-04-11",
            "end_date": "2022-04-15"
        }

        superuser = User.objects.create_superuser(email,password)
        token = AuthToken.objects.create(superuser)[1]
        #self.client.login(email=email,password=password)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        res1 = self.client.put(reverse("companion_api:reassign_patients"),json_data)

        self.assertEqual(res1.status_code,200)
        