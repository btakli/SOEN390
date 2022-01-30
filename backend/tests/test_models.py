from django.test import TestCase
from companion_api.models import Person

import datetime

class PersonTestCase(TestCase):
    """This is a test case which tests that the attributes of the Person Model are properly set up.
    """
    def setUp(self):
        Person.objects.create(first_name="Brandon", last_name="Takli", email = "brandon@hotmail.com", date_of_birth = datetime.date(day=20, month=10, year=2000))
        Person.objects.create(first_name="John", last_name="Smith", email = "john@gmail.com", date_of_birth = datetime.date(day=2, month=1, year=2001))
    def test_person_attribute(self):
        """Check that the people are properly stored in the database"""
        p1 = Person.objects.get(first_name="Brandon")
        p2 = Person.objects.get(date_of_birth=datetime.date(day=2, month=1, year=2001))
        p3 = Person.objects.get(last_name="Smith")
        p4 = Person.objects.get(email="brandon@hotmail.com")
        self.assertEqual(p1.last_name, 'Takli')
        self.assertEqual(p2, p3)
        self.assertEqual(p1.email, "brandon@hotmail.com")
        self.assertEqual(p1, p4)
        