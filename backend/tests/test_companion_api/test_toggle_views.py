from .test_setup import TestSetUp
from accounts.models import Patient, Doctor, ImmigrationOfficer

class TestToggleViews(TestSetUp):
    """Test suite for views related to Toggle Views"""

    # ALL TOGGLE TESTS
    def test_doctor_can_toggle_patient_priority(self):
        """Toggle Patient Priority: Doctor can toggle their patient priority"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        Doctor.objects.get(user_id=doctor_pk).patients.add(Patient.objects.get(user_id=patient_pk))

        priority_before = Patient.objects.get(user_id=patient_pk).is_priority

        res = self.client.put(self.toggle_priority_url(patient_pk))

        priority_after = Patient.objects.get(user_id=patient_pk).is_priority
        
        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(priority_before, priority_after)

    def test_immigration_officer_can_toggle_immigrant_priority(self):
        """Toggle Immigration Priority: Immigration Officer can toggle their immigrant priority"""

        res = self.client.post(self.register_immigration_officer_url, self.correct_immigration_officer_data, format='json')
        
        officer_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        res = self.client.post(self.register_patient_url, self.correct_patient_data, format='json')
        patient_pk = res.data['user']['id']
        ImmigrationOfficer.objects.get(user_id=officer_pk).immigrants.add(Patient.objects.get(user_id=patient_pk))

        priority_before = Patient.objects.get(user_id=patient_pk).is_immigration_priority

        res = self.client.put(self.toggle_priority_url(patient_pk))

        priority_after = Patient.objects.get(user_id=patient_pk).is_immigration_priority
        
        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(priority_before, priority_after)

    def test_doctor_can_toggle_is_away(self):
        """Toggle Doctor Is Away: Doctor can toggle if they are away"""

        res = self.client.post(self.register_doctor_url, self.correct_doctor_data, format='json')
        doctor_pk = res.data['user']['id']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + res.data['token'])

        is_away_before = Doctor.objects.get(user_id=doctor_pk).is_away

        res = self.client.put(self.toggle_doctor_is_away_url)

        is_away_after = Doctor.objects.get(user_id=doctor_pk).is_away
        
        self.assertEqual(res.status_code, 200)
        self.assertNotEqual(is_away_before, is_away_after)

    