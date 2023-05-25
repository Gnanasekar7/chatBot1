import dbm
import json
import unittest
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from bson import ObjectId
from unittest.mock import patch

from pymongo import MongoClient
from application import app
from application.views import create_access_token


# Create a test class for the registration and login endpoints
class AuthenticationTestCase(unittest.TestCase):
    def setUp(self):
        # Set up a test Flask app and PyMongo connection
        app.config['TESTING'] = True
        app.config['MONGO_URI'] = 'mongodb://localhost:27017/test'
        self.app = app.test_client()
        self.mongo = PyMongo(app)
        self.bcrypt = Bcrypt()

        # Clear the users collection before each test
        self.mongo.db.users.delete_many({})
   
    def test_successful_registration_and_login(self):
        # Send a POST request with valid registration data
        registration_data = {
            'Firstname': 'John',
            'Lastname': 'Doe',
            'Email': 'john@example.com',
            'Passw': 'password',
            'Cpass': 'password'
        }
        registration_response = self.app.post('/Register', json=registration_data)

        # Check the registration response status code and message
        self.assertEqual(registration_response.status_code, 200)
        self.assertEqual(registration_response.json, {'message': 'User registered successfully'})

        # Check if the user is saved in the database
        user = self.mongo.db.users.find_one({'email': 'john@example.com'})
        self.assertIsNotNone(user)
        self.assertEqual(user['firstname'], 'John')
        self.assertEqual(user['lastname'], 'Doe')
        self.assertTrue(self.bcrypt.check_password_hash(user['password'], 'password'))

        # Send a POST request with valid login data
        login_data = {
            'Email': 'john@example.com',
            'Password': 'password'
        }
        login_response = self.app.post('/login', json=login_data)

        # Check the login response status code and message
        self.assertEqual(login_response.status_code, 200)
        self.assertEqual(login_response.json['message'], 'Login successful')

        # Check if the response contains an access token
        self.assertIn('Authorization', login_response.headers)

    def test_invalid_credentials(self):
           # Create a user in the database
        user = {
             'Email': 'john@example.com',
             'Password': 'password'
        }
        self.mongo.db.users.insert_one(user)
        # Send a POST request with invalid login data
        login_data = {
            'Email': 'john@example.com',
            'Password': 'wrong_password'
        }
        response = self.app.post('/login', json=login_data)
        user1 = self.mongo.db.users.find_one({'email': login_data['Email']})

        if user1:
        # Check the response status code and message
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json ,{'message': 'inValid credentials'})

    def test_email_already_registered(self):
        # Create a user in the database
        user = {
            'firstname': 'Jane',
            'lastname': 'Doe',
            'email': 'jane@example.com',
            'password': self.bcrypt.generate_password_hash('password').decode('utf-8')
        }
        self.mongo.db.users.insert_one(user)

        # Send a POST request with the same email for registration
        registration_data = {
            'Firstname': 'John',
            'Lastname': 'Smith',
            'Email': 'jane@example.com',
            'Passw': 'password',
            'Cpass': 'password'
        }
        registration_response = self.app.post('/Register', json=registration_data)

        # Check the registration response status code and message
        self.assertEqual(registration_response.status_code, 200)
        self.assertEqual(registration_response.json, {'message': 'Email already registered'})
   

    def test_admin_valid_credentials(self):

        data = {
            "Email": "admin@example.com",
            "Password": "adminpassword"
        }
        response = self.app.post('/admincheck', json=data)
        self.assertEqual(response.status_code, 200)

    def test_admin_invalid_credentials(self):
        data = {
            "Email": "admin@example.com",
            "Password": "wrongpassword"
        }
        response = self.app.post('/admincheck', json=data)
        self.assertEqual(response.status_code, 200)
        # self.assertEqual(response.headers['Content-Type'], 'text/plain')
        self.assertNotIn('Authorization', response.headers)
        self.assertEqual(response.data.decode(), 'Invalid credentials')

    def test_valid_user_token(self):
        with app.test_client() as client:
            headers = {'Authorization': 'userToken'}
            response = client.get('/protected-user', headers=headers)
            data = response.get_json()
            
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'userToken is valid')

   
    def test_valid_admin_token(self):
        with app.test_client() as client:
            headers = {'Authorization': 'adminToken'}
            response = client.get('/protected-admin', headers=headers)
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'adminToken is valid')


    def test_adminstore(self):
        data = {
            'documents': [
                {'question': 'What is your name?'},
                {'question': 'How old are you?'},
                {'question': 'What is your favorite color?'}
            ]
        }
        response = self.app.post('/Adminstore', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        self.assertEqual(response.json['message'], 'Response received')

        # Check if any documents exist in the Question collection
        inserted_data = self.mongo.db.Question.find_one()
        self.assertIsNotNone(inserted_data)



    def test_get_collection(self):
        # Insert some sample questions into the database
        questions = [
            {
                '_id': '646c637780af4ac605a64a5b',
                'documents': {'documents': [{'question': 'What is your name?'}, {'question': 'How old are you?'}, {'question': 'What is your favorite color?'}]}
            },
            {
                '_id': '646c637780af4ac605a64a5f',
                'question': 'What is your name?'
            },
            {
                '_id': '646c637780af4ac605a64a60',
                'question': 'How old are you?'
            },
            {
                '_id': '646c637780af4ac605a64a61',
                'question': 'What is your favorite color?'
            }
        ]
        self.mongo.db.Question.insert_many(questions)

        # Send a GET request to the endpoint
        response = self.app.get('/userreq')

        # Check the response status code
        self.assertEqual(response.status_code, 200)

        # Check if the questions are present in the response data
        response_data = response.json['data']
        for question in questions:
            self.assertIn(question, response_data)
   

    def test_history_route(self):
        # Create a sample request data
        request_data = {
            'Email': 'test@example.com',
            'myValues': ['value1', 'value2']
        }
        
        # Send a POST request to the history route
        response = self.app.post('/history', json=request_data)
        
        # Assert that the response is successful (status code 200)
        self.assertEqual(response.status_code, 200)
        
        # Assert that the response contains the expected message
        expected_message = {'message': 'History'}
        self.assertEqual(json.loads(response.get_data()), expected_message)


    def test_fetch_route(self):
        # Assuming there are some history entries in the database
        
        # Send a GET request to the fetch route
        response = self.app.get('/fetch')
        
        # Assert that the response is successful (status code 200)
        self.assertEqual(response.status_code, 200)
        
        # Assert that the response contains the expected data
        # You may need to access the database to perform this assertion
        
        # Parse the response data as JSON
        response_data = json.loads(response.get_data())
        
        # Assuming the data field contains a list of history entries
        self.assertIsInstance(response_data['data'], list)

 