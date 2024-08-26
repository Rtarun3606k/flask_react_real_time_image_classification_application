from config import app , jwt ,db
from flask import Flask , request, jsonify,send_file
from models import Users
from datetime import timedelta
import bcrypt
from flask_jwt_extended import JWTManager,create_access_token,jwt_required,get_jwt_identity
import io
import os
# from model_dector import dector,new
import subprocess
from subprocess import Popen , PIPE
import torch
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import cv2
import numpy as np



# model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

# # Function to perform object detection on an image
# class dector():

#     def detect_objects(image_path, output_path):
#     # Load image
        # print(f"Loading image from {image_path}")
#         image = Image.open(image_path)
#         image_np = np.array(image)

#         # Perform inference
#         print("Performing inference...")
#         results = model(image)

#         # Convert results to OpenCV format
#         image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

#         # Plot bounding boxes and labels
#         for *box, conf, cls in results.xyxy[0]:
#             xmin, ymin, xmax, ymax = [int(val) for val in box]
#             label = model.names[int(cls)]
#             confidence = float(conf)

#             # Draw rectangle and label on image
#             cv2.rectangle(image_cv, (xmin, ymin), (xmax, ymax), (0, 0, 255), 2)
#             cv2.putText(image_cv, f'{label} {confidence:.2f}', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

#         # Save the result to the output path
#         print(f"Saving processed image to {output_path}")
#         cv2.imwrite(output_path, image_cv)
















@app.route("/")
def func():
    # print("hello")
    return "hello"



@app.route("/get_user_data" , methods=["GET"])
@jwt_required()
def get_uers_data():
     current_user_email = get_jwt_identity()
     chceck_email = Users.query.filter_by(Useremail = current_user_email).first()
     if chceck_email:
          data = {
               "username" :chceck_email.Username, 
               "useremail" :chceck_email.Useremail, 
               "userid" :chceck_email.id, 
          }
          return jsonify(data)


@app.route("/users_list",methods=["GET"])
@jwt_required()
def users_list():
    check_user = get_jwt_identity()
    user_data = Users.query.all()
    if check_user:
         return jsonify({"msg":"your are not authorized to acces this feature!! plaese loggin to acces this feature!!"}),401
    list_of_users =[]
    for i in user_data:
         user_dict = {
              "usernam":i.Username,
              "useremail":i.Useremail
         }
         list_of_users.append(user_dict)
    return jsonify(users = list_of_users)


@app.route("/login",methods=["POST"])
def login():
    username = request.json.get("username",None)
    useremail = request.json.get("useremail",None)
    password = request.json.get("password",None)
    if (username=="" or username==None) and (useremail=="" or useremail==None) and  (password=="" or password==None):
        return jsonify({"msg":"All fields are required"}),401
    check_existing_user_email = Users.query.filter_by(Useremail=useremail).first()
    if check_existing_user_email:
        try:
            check_password_mathch = check_existing_user_email.password

            present_password = password.encode('utf-8')
            
            if(bcrypt.checkpw(present_password,check_password_mathch)):
                print("passed")
                expiration_of_token = timedelta(minutes=30)
                token = create_access_token(identity=useremail,expires_delta=expiration_of_token)
                return jsonify({"token":f"{token}","msg":"session started sucessfully"})
            else:
                return jsonify({"msg":f"Invalid user name or password"}),401
        except Exception as e:
                return jsonify({"msg":f"There was some error in logging in please try again later!! {e}"}), 401
    else:
                return jsonify({"msg":f"Invalid user name or password"}),401
            




@app.route("/register",methods=["POST"])
def register():
    username = request.json.get("username",None)
    useremail = request.json.get("useremail",None)
    password = request.json.get("password",None)
    # print(password)
    # print(useremail)
    # print(username)

    if (username=="" or username==None) and (useremail=="" or useremail==None) and  (password=="" or password==None):
        return jsonify({"msg":"All fields are required"}),401
    check_existing_user_email = Users.query.filter_by(Useremail=useremail).first()
    if check_existing_user_email:
        return jsonify({"msg":"User already exists by this email"}),401
    else:
        try : 
            utf_encode_password = password.encode('utf-8')
            salt = bcrypt.gensalt()
            hash_password = bcrypt.hashpw(utf_encode_password,salt)
            new_user = Users(Username = username,Useremail =useremail,password = hash_password)
            try:
                db.session.add(new_user)
                db.session.commit()
            except Exception as e:
                return jsonify({"msg":"Unable to register"}),405

            return jsonify({"msg":"Acount created sucessfully"}),200

        except Exception as e:
            return jsonify({"msg":"some unecpected error occured try again after some time"}),410
        

TEMP_DIR = 'temp'
RESULTS_DIR = 'results'
WEIGHTS_PATH = 'D:\\prodigy Infotech\\Login_Register_task_1\\Backend_Flask\\yolov5\\runs\\train\\exp3\\weights\\best.pt'
DETECT_SCRIPT = 'D:\\prodigy Infotech\\Login_Register_task_1\\Backend_Flask\\yolov5\\detect.py'
VENV_PYTHON = 'D:\\prodigy Infotech\\Login_Register_task_1\\Backend_Flask\\newenv\\Scripts\\python.exe'

# Ensure directories exist
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return {'error': 'No file part'}, 400

    file = request.files['file']
    if file.filename == '':
        return {'error': 'No selected file'}, 400

    # Save the uploaded file to a temporary directory
    temp_input_path = os.path.join(TEMP_DIR, file.filename)
    file.save(temp_input_path)

    # Define the paths for input and output files
    output_dir = os.path.join(RESULTS_DIR, 'processed_' + os.path.splitext(file.filename)[0])
    source_path = temp_input_path

    # Log the paths to verify
    print(f"Input Path: {temp_input_path}")
    print(f"Output Dir: {output_dir}")
    print(f"Source Path: {source_path}")
    print(f"Detect Script: {DETECT_SCRIPT}")
    print(f"Python Executable: {VENV_PYTHON}")

    # Run the YOLOv5 detection script using subprocess.Popen with the virtual environment's Python
    process = Popen([
        VENV_PYTHON, DETECT_SCRIPT,
        '--weights', WEIGHTS_PATH,
        '--source', source_path,
        '--project', RESULTS_DIR,
        '--name', 'processed_' + os.path.splitext(file.filename)[0]
    ], stdout=PIPE, stderr=PIPE)
    stdout, stderr = process.communicate()

    # Log the outputs
    print(f"stdout: {stdout.decode()}")
    print(f"stderr: {stderr.decode()}")

    # Check if the process ran successfully
    if process.returncode != 0:
        return {'error': f"Detection script error: {stderr.decode()}"}, 500

    # Check if the output file exists
    processed_image_path = os.path.join(output_dir, file.filename)
    if not os.path.exists(processed_image_path):
        return {'error': 'Processed file not found'}, 500

    # Send the processed image back to the client
    return send_file(processed_image_path, mimetype='image/jpeg')