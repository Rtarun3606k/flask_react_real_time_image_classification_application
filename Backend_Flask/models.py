from config import app , db

class Users(db.Model):
    Username = db.Column(db.String(40),nullable=False)
    id = db.Column(db.Integer(),nullable=False,primary_key = True)
    Useremail = db.Column(db.String(40),nullable=False,unique=True)
    password = db.Column(db.String(50),nullable=False)