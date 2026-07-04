import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.config import settings


def send_email(receiver_email: str, subject: str, body: str):

    if not settings.EMAIL_USER or not settings.EMAIL_PASSWORD:
        print("Email credentials not configured.")
        return

    message = MIMEMultipart()

    message["From"] = settings.EMAIL_USER
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:

        server = smtplib.SMTP("smtp.gmail.com", 587)

        server.starttls()

        server.login(
            settings.EMAIL_USER,
            settings.EMAIL_PASSWORD
        )

        server.sendmail(
            settings.EMAIL_USER,
            receiver_email,
            message.as_string()
        )

        server.quit()

        print("Email Sent Successfully.")

    except Exception as e:

        print("Email Error:", e)