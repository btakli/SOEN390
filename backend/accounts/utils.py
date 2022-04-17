from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.conf import settings


class TokenGen(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk)+str(timestamp)+str(user.is_email_verified)

generate_token = TokenGen()

def send_admin_approval_email(admin, position, request):    
    current_site = get_current_site(request)
    email_subject = 'Approve Position Registration Request'
    email_body = render_to_string('email/approve_position_email.html', {
        'admin': str(admin),
        'position': str(position),
        'position_email': str(position.user.email),
        'position_proof': str(position.proof),
        'domain': current_site,
        'user_id': urlsafe_base64_encode(force_bytes(position.user_id)),
        'position_type': 'doctor' if position.user.is_doctor else 'immigration_officer'
    })
    
    email = EmailMessage(subject=email_subject, body=email_body,
        from_email=settings.EMAIL_FROM_USER,
        to=[admin.email]
        )

    email.send()

# EMAIL VERIFICATION
def send_verif_email(user, request):
    current_site = get_current_site(request)
    email_subject = 'Activate Covid-Tracker Account'
    email_body = render_to_string('email/activate_email.html', {
        'name': str(user),
        'domain': current_site,
        'user_id': urlsafe_base64_encode(force_bytes(user.user_id)),
        'token': generate_token.make_token(user.user)
    })
    
    email = EmailMessage(subject=email_subject, body=email_body,
        from_email=settings.EMAIL_FROM_USER,
        to=[user.user.email]
        )

    email.send()