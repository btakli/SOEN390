from django.contrib.auth.tokens import PasswordResetTokenGenerator


class TokenGen(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return str(user.pk)+str(timestamp)+str(user.is_email_verified)

generate_token = TokenGen()