from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret" 
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db" 

db = SQLAlchemy(app)
jwt = JWTManager(app)

