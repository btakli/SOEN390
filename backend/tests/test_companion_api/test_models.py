from companion_api.models import Person
from accounts.models import User
from faker import Faker
from .test_setup import TestSetUp


import datetime


class ModelTestCases(TestSetUp):
    """This is a test case which tests that the attributes of the Person Model are properly set up."""

    def setUp(self):
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