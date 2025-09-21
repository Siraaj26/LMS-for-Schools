from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from supabase import create_client
import requests
import json

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)

# Initialize Supabase client
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

#function to simultaneously add parent table data
def add_parent(parent_email):
    data = {
        "parent_email": parent_email
    }
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}", 
        "Content-Type": "application/json"
        }
    url = f"{url}/rest/v1/parent_login"
    response = requests.post(url, json=data, headers=headers)
    return response


# Function to add student to the Supabase database
def add_student(fullname, email, password, parentemail):
    data = {
        "full_name": fullname,
        "email": email,
        "password": password,
        "parent_email": parentemail
    }
    headers = {
        "apikey": key,  
        "Authorization": f"Bearer {key}", 
        "Content-Type": "application/json"
    }
    url = f"{url}/rest/v1/student_login"
    response = requests.post(url, json=data, headers=headers)
    add_parent(parentemail)
    return response

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    parent_email = data.get("parent_email")
    phone_number = data.get("phone_number")
    current_grade = data.get("current_grade")



if __name__ == "__main__":
    app.run(debug=True)
