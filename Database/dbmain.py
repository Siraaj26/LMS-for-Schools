import os
from dotenv import load_dotenv
load_dotenv()
from supabase import create_client
import requests
import json

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

supabase = create_client(url, key)




# create user
def add_student(fullname,email,password,parentemail)    :
    data = {
        "full_name": fullname,
        "email": email,
        "password": password,
        "parent_email": parentemail
    }
    #headers for curl
    url = "https://iggyleprkjwrveimubex.supabase.co/rest/v1/student_login"
    headers = {
        "apikey": key,  
        "Authorization": f"Bearer {key}", 
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=data, headers=headers)
    return response

email = "keagan@gmail"
fullname = "keagan"
parentemail = "parent@gmail"
password = "12849128491"

response = add_student(fullname,email,password,parentemail)

if response.status_code == 201:
    print("Student added successfully:", response.json())
else:
    print("Error:", response.status_code, response.text)


# curl to test
# curl 'https://iggyleprkjwrveimubex.supabase.co/rest/v1/grades?select=maths' 
# -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto" 
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto"