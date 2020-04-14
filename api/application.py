from flask import Flask
from flask_restless import APIManager
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

# Load environemnt variables
load_dotenv()
# Create the Flask application and the Flask-SQLAlchemy object.
application = Flask(__name__)

# application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///memory'
application.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://' + os.environ['DB_USER'] + ':' + os.environ['DB_PASS'] + '@' + os.environ['DB_HOST'] + ':' + os.environ['DB_PORT'] + '/' + os.environ['DB_NAME']

db = SQLAlchemy(application)

# Create your Flask-SQLALchemy models as usual but with the following two
# (reasonable) restrictions:
#   1. They must have a primary key db.Column of type sqlalchemy.Integer or
#      type sqlalchemy.Unicode.
#   2. They must have an __init__ method which accepts keyword arguments for
#      all db.Columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model
#      supplies such a method, so you don't need to declare a new one).
class Animals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    com_name = db.Column(db.Unicode)
    sci_name = db.Column(db.Unicode)
    status = db.Column(db.Unicode)
    list_date = db.Column(db.Unicode)
    tax_group = db.Column(db.Unicode)
    dps = db.Column(db.Boolean)
    aquatic = db.Column(db.Boolean)
    bcc = db.Column(db.Boolean)
    plan = db.Column(db.Unicode)
    image = db.Column(db.Unicode)
    des = db.Column(db.Unicode)

class AnimalStates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))

    animal = db.relationship(Animals, backref=db.backref("states"))

class Plants(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    com_name = db.Column(db.Unicode)
    sci_name = db.Column(db.Unicode)
    status = db.Column(db.Unicode)
    list_date = db.Column(db.Unicode)
    family = db.Column(db.Unicode)
    family_com = db.Column(db.Unicode)
    category = db.Column(db.Unicode)
    duration = db.Column(db.Unicode)
    growth = db.Column(db.Unicode)
    toxicity = db.Column(db.Unicode)
    plan = db.Column(db.Unicode)
    image = db.Column(db.Unicode)
    des = db.Column(db.Unicode)

class PlantStates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))

    plant = db.relationship(Plants, backref=db.backref("states"))

class Parks(db.Model):
    code = db.Column(db.Unicode, primary_key=True)
    name = db.Column(db.Unicode)
    designation = db.Column(db.Unicode)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    url = db.Column(db.Unicode)
    desc = db.Column(db.Unicode)
    weather = db.Column(db.Unicode)
    directions = db.Column(db.Unicode)
    address = db.Column(db.Unicode)
    phone = db.Column(db.Unicode)
    email = db.Column(db.Unicode)
    images = db.Column(db.Unicode)

class ParkStates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    park_code = db.Column(db.Unicode, db.ForeignKey('parks.code'))
    
    park = db.relationship(Parks, backref=db.backref("states"))


# Search in results
def search_postprocessor(result=None, search_params=None, **kw):
    if(search_params != None and "search_query" in search_params):
        attributes = {'category', 'com_name', 'des', 'duration', 'family', 'family_com', 'growth', 'sci_name', 'status', 'toxicity', 'list_date', 'plan', 'tax_group', 'address', 'code', 'desc', 'designation', 'directions', 'email', 'name', 'phone', 'weather'}
        keywords = search_params["search_query"].lower().split()
        if(len(keywords) == 0):
            keywords = [" "]
        objects = []
        for instance in result["objects"]:
            instanceMatched = False
            for attribute in instance:
                if attribute == "states":
                    for state in instance["states"]:
                        for keyword in keywords:
                            if(keyword in state["name"].lower()):
                                keyword = keyword.upper()
                                matchSplit = state["name"].split()
                                match = None
                                for word in matchSplit:
                                    if keyword in word:
                                        match = word.replace(keyword, "<hlt>" + keyword + "</hlt>")
                                        break
                                if("id" in instance):
                                    objects.append({"id": instance["id"], "com_name": instance["com_name"], "image": instance["image"], "match": match})
                                else:
                                    objects.append({"code": instance["code"], "name": instance["name"], "image": instance["images"].split()[0], "match": match})
                                instanceMatched = True
                                break
                        if(instanceMatched):
                            break
                elif(attribute in attributes):
                    val = instance[attribute]
                    if(isinstance(val, str)):
                        for keyword in keywords:
                            val = val.lower()
                            if(keyword in val):
                                matchSplit = val.split()
                                match = None
                                for word in matchSplit:
                                    if keyword in word:
                                        match = word.replace(keyword, "<hlt>" + keyword + "</hlt>")
                                        break
                                if("id" in instance):
                                    objects.append({"id": instance["id"], "com_name": instance["com_name"], "image": instance["image"], "match": match})
                                else:
                                    objects.append({"code": instance["code"], "name": instance["name"], "image": instance["images"].split()[0], "match": match})
                                instanceMatched = True
                                break
                        if(instanceMatched):
                            break
        result["objects"] = objects
        result["num_results"] = len(objects)
        del result["page"]
        del result["total_pages"]

# Create the Flask-Restless API manager.
manager = APIManager(application, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
# manager.create_api(Person, methods=['GET', 'POST', 'DELETE'])
# manager.create_api(Article, methods=['GET'])

animals_blueprint = manager.create_api(Animals, methods=['GET'],
                        postprocessors={'GET_MANY': [search_postprocessor]} ,
                        max_results_per_page=1000,
                        results_per_page=9
                        )
plants_blueprint = manager.create_api(Plants, methods=['GET'],
                        postprocessors={'GET_MANY': [search_postprocessor]} ,
                        max_results_per_page=1000,
                        results_per_page=9
                        )
parks_blueprint = manager.create_api(Parks, methods=['GET'],
                        postprocessors={'GET_MANY': [search_postprocessor]} ,
                        max_results_per_page=1000,
                        results_per_page=9
                        )

@application.route('/')
def index():
    return "Available endpoints: /api/animals /api/plants /api/parks"

def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

application.after_request(add_headers)

# start the flask loop
application.run()

