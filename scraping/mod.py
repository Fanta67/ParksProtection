import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import sessionmaker
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import os
from dotenv import load_dotenv
import requests
from wikidata import *

load_dotenv()

# use sqlite in memory for testing and postgresql to store in RDS; BE VERY CERTAIN WHEN COMMITTING TO RDS
engine = create_engine('postgresql://' + os.getenv('DB_USER') + ':' + os.getenv('DB_PASS') + '@' + os.getenv('DB_HOST') + ':' + os.getenv('DB_PORT') + '/' + os.getenv('DB_NAME'))
Base = declarative_base()

class Plant(Base):
	__tablename__ = 'plants'

	id = Column(Integer, primary_key=True)
	com_name = Column(String)
	sci_name = Column(String)
	status = Column(String)
	list_date = Column(String)
	family = Column(String)
	family_com = Column(String)
	category = Column(String)
	duration = Column(String)
	growth = Column(String)
	toxicity = Column(String)
	plan = Column(String)
	image = Column(String)
	des = Column(String)

	states = relationship("PlantState", back_populates="plant", cascade="all, delete, delete-orphan")

	def __repr__(self):
		return "<Plant(id=%d, com=%s, sci=%s, status=%s, date=%s, family=%s, family_com=%s, category=%s, duration=%s, growth=%s, toxicity=%s, plan=%s, image=%s)>" % \
		(self.id, self.com_name, self.sci_name, self.status, self.list_date, self.family, self.family_com, self.category, self.duration, self.growth, self.toxicity, self.plan, self.image)

class PlantState(Base):
	__tablename__ = 'plant_states'

	id = Column(Integer, primary_key=True)
	name = Column(String, nullable=False)
	plant_id = Column(Integer, ForeignKey('plants.id'))

	plant = relationship("Plant", back_populates="states")

	def __repr__(self):
		return "<State(name=%s)>" % self.name

class Animal(Base):
	__tablename__ = 'animals'

	id = Column(Integer, primary_key=True)
	com_name = Column(String)
	sci_name = Column(String)
	status = Column(String)
	list_date = Column(String)
	tax_group = Column(String)
	dps = Column(Boolean)
	aquatic = Column(Boolean)
	bcc = Column(Boolean)
	plan = Column(String)
	image = Column(String)
	des = Column(String)

	states = relationship("AnimalState", back_populates="animal", cascade="all, delete, delete-orphan")

	def __repr__(self):
		return "<Animal(id=%d, com=%s, sci=%s, status=%s, date=%s, group=%s, dps=%r, aquatic=%r, bcc=%r, plan=%s, image=%s)>" % \
		(self.id, self.com_name, self.sci_name, self.status, self.list_date, self.tax_group, self.dps, self.aquatic, self.bcc, self.plan, self.image)

class AnimalState(Base):
	__tablename__ = 'animal_states'

	id = Column(Integer, primary_key=True)
	name = Column(String, nullable=False)
	animal_id = Column(Integer, ForeignKey('animals.id'))

	animal = relationship("Animal", back_populates="states")

	def __repr__(self):
		return "<State(name=%s)>" % self.name

class Park(Base):
	__tablename__ = 'parks'

	code = Column(String, primary_key=True)
	name = Column(String)
	designation = Column(String)
	latitude = Column(Float)
	longitude = Column(Float)
	url = Column(String)
	desc = Column(String)
	weather = Column(String)
	directions = Column(String)
	address = Column(String)
	phone = Column(String)
	email = Column(String)
	images = Column(String)

	states = relationship("ParkState", back_populates="park", cascade="all, delete, delete-orphan")

	def __repr__(self):
		return "<Park(code=%s, name=%s, designation=%s, latitude=%f, longitude=%f, url=%s, desc=%s, weather=%s, directions=%s, address=%s, phone=%s, email=%s, images=%s)>" % \
		(self.code, self.name, self.designation , self.latitude, self.longitude, self.url, self.desc, self.weather, self.directions, self.address, self.phone, self.email, self.images)

class ParkState(Base):
	__tablename__ = 'park_states'

	id = Column(Integer, primary_key=True)
	name = Column(String, nullable=False)
	park_code = Column(String, ForeignKey('parks.code'))

	park = relationship("Park", back_populates="states")

	def __repr__(self):
		return "<State(name=%s)>" % self.name

def fetch_image(search):
	endpoint = "https://park-protection-image-search.cognitiveservices.azure.com/bing/v7.0/images/search?count=1000&q="
	headers = {"Ocp-Apim-Subscription-Key" : os.getenv("IMAGES_KEY")}

	# later change to full length
	r = requests.get(endpoint + search, headers=headers)
	rawData = r.json()
	imageURL = None
	if "value" in rawData and len(rawData["value"]) > 0:
		for value in rawData["value"]:
			url = value["contentUrl"]
			if("https://" in url):
				try:
					r = requests.get(url)
					if(r.status_code == 200):
						imageURL = url
						break
				except:
					pass
	return imageURL

Session = sessionmaker(bind=engine)
session = Session()

"""
rows = session.query(Animal).join(AnimalState).all()

for i in range(len(rows) - 1, -1, -1):
	print("trying: " + rows[i].sci_name)
	rows[i].des = wiki_search(rows[i].sci_name)
	# session.commit()
	print("succeeded: " + str(i))

rows = session.query(Plant).join(PlantState).all()

for i in range(len(rows) - 1, -1, -1):
	print("trying: " + rows[i].sci_name)
	rows[i].des = wiki_search(rows[i].sci_name)
	# session.commit()
	print("succeeded: " + str(i))

print("fails: " + str(fails))
"""

"""
rows = session.query(Animal).join(AnimalState).all()

fails = 0
flist = []
for i in range(0, len(rows)):
	print("trying: " + str(i))
	url = fetch_image(rows[i].sci_name)
	if(url is not None):
		rows[i].image = url
		# session.commit()
	else:
		fails += 1
		flist.append(rows[i].id)
	print("succeeded: " + str(i))

print("fails: " + str(fails))
print(flist)
"""

"""
rows = session.query(Plant).join(PlantState).all()

fails = 0
flist = []
for i in range(107, len(rows)):
	print("trying: " + str(i))
	url = fetch_image(rows[i].sci_name)
	if(url is not None):
		rows[i].image = url
		# session.commit()
	else:
		fails += 1
		flist.append(rows[i].id)
	print("succeeded: " + str(i))

print("fails: " + str(fails))
print(flist)
"""

"""
todel = session.query(Animal).join(AnimalState).filter(Animal.id.in_([4371, 6644, 1149, 7836, 3495])).all()
print(todel)

for el in todel:
	session.delete(el)

todel = session.query(Plant).join(PlantState).filter(PlantState.name.in_(['DC', 'GU', 'MP', 'AS', 'FM', 'PW', 'AK', 'HI', 'PR'])).all()
print("\n\nHERE\n\n")
print(todel)

# session.commit()
"""



