# myapp/management/commands/my_script.py
from __future__ import print_function
import requests
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from pprint import pprint

from django.core.management.base import BaseCommand
from mainFiles.models import User  # Import your model

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = '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'
api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

def get_random_meal():
    api_url = 'https://www.themealdb.com/api/json/v1/1/random.php'

    try:
        response = requests.get(api_url)
        response.raise_for_status()  
        data = response.json()
        meal = data['meals'][0]
        image_url = meal['strMealThumb']
        meal_name = meal['strMeal']
        return image_url, meal_name
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None, None

image_url, meal_name = get_random_meal()
subject = "Digital Recipe Book"
html_content="<html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Daily Recipe Email</title><style>body{font-family:'Arial',sans-serif;background-color:#f5f5f5;margin:0;padding:0;display:flex;justify-content:center;align-items:center;height:100vh;}#card{background-color:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);overflow:hidden;width:300px;text-align:center;padding:20px;}h1{color:#333;margin-top:10px;}img{max-width:100%;border-radius:8px;margin-top:10px;}</style></head><body><div id='card'><h1 style='color:#333;margin-top:10px;'>Try this new recipe at Digital Recipe Book</h1><a><img src='"+image_url+"' alt='"+meal_name+"' style='max-width:100%;border-radius:8px;margin-top:10px;'><h1 style='color:#333;margin-top:10px;'>"+meal_name+"</h1></a></div></body></html>"

sender = {"name":"nezuko","email":"nezchan05@gmail.com"}
reply_to = {"email":"nezchan05@gmail.com","name":"nezuko"}

class Command(BaseCommand):
    help = 'this script is to send mail to whoever subscribed'

    def handle(self, *args, **options):
        # Your script logic here
        user_info_objects = User.objects.all()
        email_list = [obj.Email for obj in user_info_objects]
        name_list = [obj.FirstName for obj in user_info_objects]
        for i in range(len(email_list)):

            to = [{"email":email_list[i],"name":name_list[i]}]
            cc = [{"email":email_list[i],"name":name_list[i]}]
            bcc = [{"email":email_list[i],"name":name_list[i]}]
    
            headers = {"Some-Custom-Name":"unique-id-1234"}
            params = {"parameter":"My param value","subject":"New Subject"}

            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(to=to, bcc=bcc, cc=cc, reply_to=reply_to, headers=headers, html_content=html_content, sender=sender, subject=subject)

            try:
                api_response = api_instance.send_transac_email(send_smtp_email)
                pprint(api_response)
                print(f"________{i+1}. Mail sent to {email_list[i]}")
            except ApiException as e:
                print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)