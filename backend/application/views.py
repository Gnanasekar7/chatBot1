
import bcrypt
from flask_bcrypt import Bcrypt
from application import app
from flask import Response, request, jsonify
from datetime import  timedelta
from flask_pymongo import PyMongo
from flask_jwt_extended import create_access_token
from marshmallow import Schema, fields, validate, ValidationError

mongo_reg = PyMongo(app, uri='mongodb://localhost:27017/test')
db = mongo_reg.db
bcrypt = Bcrypt()

# Define a schema for the User model
class UserSchema(Schema):
    Firstname = fields.Str(required=True)
    Lastname = fields.Str(required=True)
    Email = fields.Email(required=True)
    Passw = fields.Str(required=True, validate=validate.Length(min=8, max=15))
    Cpass = fields.Str(required=True, validate=validate.Length(min=8, max=15))


# Create an instance of the User schema
user_schema = UserSchema()

# for registration and hashing the password before storing
@app.route('/Register', methods=['POST'])
def register():
    try:
        # Validate the input data against the User schema       
        data = user_schema.load(request.get_json())
        print(data)
        # Check if the email is already registered
        if db.users.find_one({'email': data['Email']}):
            return {'message': 'Email already registered'}
        # Check if the passwords match
        if data['Passw'] != data['Cpass']:
            return {'message': 'Passwords do not match'}
        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['Passw'].encode('utf-8'))
        # Save the user to the database
        user = {
            'firstname': data['Firstname'],
            'lastname': data['Lastname'],
            'email': data['Email'],
            'password': hashed_password
        }
        db.users.insert_one(user)
        return {'message': 'User registered successfully'}


    except ValidationError as error:
        # Return an error message if the input data does not match the schema
        return {'message': error.messages}, 400

# for logging in and check the password before login
@app.route('/login', methods=['POST'])
def check():
  if request.method=='POST':
    data = request.get_json()
    email = data["Email"]
    passw=data["Password"]
    user1 = db.users.find_one({'email': email})
  if user1:
      # check if the password matches the hashed password in the database
    if bcrypt.check_password_hash(user1['password'].decode('utf-8'), passw):
      token=create_access_token(identity=user1['email'], expires_delta=timedelta(seconds=10))
      response = jsonify({'message': 'Login successful'})
      response.headers['Authorization'] = f'Bearer {token}'
      response.headers.add('Access-Control-Allow-Origin', '*')
      print(response)
      return response
    else:
       return Response('InValid credendtials')

# for logging in and check the password before login and add the generated token to the headers while sending the response
@app.route('/admincheck',methods=['POST','GET'])
def admincheck():
  if request.method=='POST':
    data = request.get_json()
    email = data["Email"]
    passw=data["Password"]
    user1 = db.admin.find_one({'email': email})
    if user1:
       # check if the password matches the hashed password in the database
      if(passw==user1['Password']):
        token=create_access_token(identity=user1['email'], expires_delta=timedelta(seconds=10))
        print(token)
        response = jsonify({'message': 'Valid credendtials'})
        response.headers['Authorization'] = f'Bearer {token}'
        response.headers.add('Access-Control-Allow-Origin', '  *')
        response.headers.add('Access-Control-Allow-Headers', 'Authorization')
        print(response)
        return response
      else:
        return Response('Invalid credendtials')
      
#allows only if the response has token in headers for user
@app.route('/protected-user',methods=['POST','GET'])
def protecteduser():
     auth_header = request.headers.get('Authorization')
     if auth_header:
      return jsonify({'message': 'userToken is valid'})
     
#allows only if the response has token in headers for admin
@app.route('/protected-admin',methods=['POST','GET'])
def protectedadmin():
     auth_header = request.headers.get('Authorization')
     if auth_header:
      return jsonify({'message': 'Token is valid'})
     
# stores the questions by the admin in the db
@app.route('/Adminstore',methods=['POST','GET'])
def store():
    data = request.get_json()
    print(data)
    doc_dict = {"documents": data}
    response = jsonify({'message': 'Valid credendtials'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    print(response)
    db.Question.insert_one(doc_dict)
    return response

# display the questions by admin to the user
@app.route('/userreq',methods=['POST','GET'])
def get_collection():
    data = []
    cur=db.Question.find()
    for i in cur:
      i['_id']=str(i['_id'])
      data.append(i)
    return jsonify({'data': data})

#stores the actions of the user and update if the user already exists
@app.route('/history',methods=['POST','GET'])
def history():
  data = request.get_json()
  email=data['Email']
  new_input=data["myValues"]
  check=db.history.find_one({"email":email})
  #update if the user already exists
  if(check):
    existing_input = check['input']
    updated_input = existing_input + [new_input]
    db.history.update_one({'_id': check['_id']}, {'$set': {'input': updated_input}})
  #stores the actions of the user    
  else:
    Nhistory={
       'email':email,
       'input':new_input
    }
    db.history.insert_one(Nhistory)  

  response = jsonify({'message': 'Login successful'})
  response.headers.add('Access-Control-Allow-Origin', '*')
  print(response)
  return response

# fetch the history of the user to display it once the user login
@app.route('/fetch',methods=['POST','GET'])
def fetch():
    data = []
    cur=db.history.find()
    for i in cur:
      i['_id']=str(i['_id'])
      data.append(i)
    return jsonify({'data': data})