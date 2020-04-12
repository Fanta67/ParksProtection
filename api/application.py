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


# Create the database tables.
db.create_all()

# Create the Flask-Restless API manager.
manager = APIManager(application, flask_sqlalchemy_db=db)

class Searching:
    plant_search_terms = None

def plant_preprocessor(search_params=None, **kw):
    # if there was a search attempt let's handle it, if not leave it alone
    if(search_params != None and 'search_query' in search_params):
        # get all the keywords
        keywords = search_params['search_query'].split()
        # all the possible attributes we will search through
        attributes = ['category', 'com_name', 'des', 'duration', 'family', 'family_com', 'growth', 'sci_name', 'status', 'toxicity']
        # define our filters
        listDicts = []

        for keyword in keywords: # iterate through each keyword
            states_dict = dict(name='states__name', op='any', val=keyword.upper()) # states dict
            listDicts.append(states_dict)
            keyword = '%' + keyword + '%' # makes it so we can search anywhere in the string
            for attribute in attributes: # iterate through the columns/attributes
                new_dict = dict(name=attribute, op='ilike', val=keyword) # make a new filter dict
                listDicts.append(new_dict) # add it

        if("filters" not in search_params):
            search_params["filters"] = []
        search_params["filters"].append({"or": listDicts}) # set the search_params

    pass # end of function

def animal_preprocessor(search_params=None, **kw):

    # if there was a search attempt let's handle it, if not leave it alone
    if(search_params != None and 'search_query' in search_params):
        # get all the keywords
        keywords = search_params['search_query'].split()
        # all the possible attributes we will search through
        attributes = ['com_name', 'des', 'list_date', 'plan', 'sci_name', 'status', 'tax_group']
        # define our filters
        listDicts = []

        for keyword in keywords: # iterate through each keyword
            states_dict = dict(name='states__name', op='any', val=keyword.upper()) # states dict
            listDicts.append(states_dict)
            keyword = '%' + keyword + '%' # makes it so we can search anywhere in the string
            for attribute in attributes: # iterate through the columns/attributes
                new_dict = dict(name=attribute, op='ilike', val=keyword) # make a new filter dict
                listDicts.append(new_dict) # add it

        if("filters" not in search_params):
            search_params["filters"] = []
        search_params["filters"].append({"or": listDicts}) # set the search_params

    pass # end of function

def park_preprocessor(search_params=None, **kw):

    # if there was a search attempt let's handle it, if not leave it alone
    if(search_params != None and 'search_query' in search_params):
        # get all the keywords
        keywords = search_params['search_query'].split()
        # all the possible attributes we will search through
        attributes = ['address', 'code', 'desc', 'designation', 'directions', 'email', 'name', 'phone', 'weather']
        # define our filters
        listDicts = []

        for keyword in keywords: # iterate through each keyword
            states_dict = dict(name='states__name', op='any', val=keyword.upper()) # states dict
            listDicts.append(states_dict)
            keyword = '%' + keyword + '%' # makes it so we can search anywhere in the string
            for attribute in attributes: # iterate through the columns/attributes
                new_dict = dict(name=attribute, op='ilike', val=keyword) # make a new filter dict
                listDicts.append(new_dict) # add it

        if("filters" not in search_params):
            search_params["filters"] = []
        search_params["filters"].append({"or": listDicts}) # set the search_params

    pass # end of function



# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
from itertools import filterfalse
def search_process(result=None, **kw):
    print('POST PROCESSOR CALLED')
    #print(result)
    #print('the size of results is')
    #print(result)

    print('\n\n\n\n\n\n\n')
    print('plant search terms')
    print(Searching.plant_search_terms)
    if(Searching.plant_search_terms != None):
        print('\n\n\n\n\n\n\n')
        print('plant search terms is not null, now filtering')
        def search_filter(plant):
            #include_result = False
            for attribute in list(plant):
                for keyword in Searching.plant_search_terms:
                    #print('attribute, keyword', attribute, keyword)
                    if(isinstance(plant[attribute],str) and keyword in plant[attribute]):
                        print('keeping this one')
                        return False
            print('not keeping this one')
            return True
        print('results before')
        print(len(result['objects']))
        result['objects'][:] = filterfalse(search_filter, result['objects'])
        print('after')
        print(len(result['objects']))

    #print('PAGE 1 ')
    #result = {'hello':  'world'}
    #print(result)
    #print(kw)
    pass
    #return result

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
# manager.create_api(Person, methods=['GET', 'POST', 'DELETE'])
# manager.create_api(Article, methods=['GET'])


animals_blueprint = manager.create_api(Animals, methods=['GET'],
                        preprocessors={'GET_MANY': [animal_preprocessor]},
                        #postprocessors={'GET_MANY': [search_process]} ,
                        max_results_per_page=1000,
                        results_per_page=9
                        )
plants_blueprint = manager.create_api(Plants, methods=['GET'],
                        preprocessors={'GET_MANY': [plant_preprocessor]},
                        #postprocessors={'GET_MANY': [search_process]} ,
                        max_results_per_page=1000,
                        results_per_page=9
                        )
parks_blueprint = manager.create_api(Parks, methods=['GET'],
                        preprocessors={'GET_MANY': [park_preprocessor]},
                        #postprocessors={'GET_MANY': [search_process]} ,
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

