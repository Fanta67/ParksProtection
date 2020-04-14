
import requests
import json
import re
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import sessionmaker
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import os
from dotenv import load_dotenv

TOTAL_PARKS = 498


# use sqlite in memory for testing and postgresql to store in RDS; BE VERY CERTAIN WHEN COMMITTING TO RDS
# engine = create_engine('postgresql://' + os.getenv('DB_USER') + ':' + os.getenv('DB_PASS') + '@' + os.getenv('DB_HOST') + ':' + os.getenv('DB_PORT') + '/' + os.getenv('DB_NAME'), echo=True)
engine = create_engine('sqlite:///:memory:', echo=True)
Base = declarative_base()

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

Base.metadata.create_all(engine)

# simple and well formatted data source - fetch all and pretty parse in-line
def parks_request(total_limit=TOTAL_PARKS, page_limit=10):
	total_limit = TOTAL_PARKS if total_limit > TOTAL_PARKS else (0 if total_limit < 0 else total_limit)
	page_limit = 10 if not (0 <= page_limit <= 50) else page_limit
	endpoint = "https://developer.nps.gov/api/v1/parks?&api_key=5F6pdXkb7h3QTKUtTdBytI9J5OU24WgvgmYUAKBa&sort=parkCode"
	duplicates = set()
	parksList = []
	for start in range(1, total_limit + 1, page_limit):
		r = requests.get(endpoint + "&start=" + str(start) + "&limit=" + str(page_limit) + "&q=")
		rawData = r.json()['data']
		for parkRaw in rawData:
			if parkRaw['parkCode'] not in duplicates and parkRaw['latLong'] != "" and len(parkRaw['contacts']['emailAddresses']) > 0 and parkRaw['designation'] != "" and parkRaw['weatherInfo'] != "" and parkRaw['directionsInfo'] != "":
				parkData = dict()
				parkData['code'] = parkRaw['parkCode'] 
				duplicates.add(parkData['code'])
				parkData['name'] = parkRaw['fullName']
				parkData['designation'] = parkRaw['designation']
				parkData['latitude'] = float(parkRaw['latLong'].split(":")[1].split(",")[0])
				parkData['longitude'] = float(parkRaw['latLong'].split(":")[2])			
				parkData['url'] = parkRaw['url']
				parkData['desc'] = parkRaw['description']
				parkData['weather'] = parkRaw['weatherInfo']
				parkData['directions'] = parkRaw['directionsInfo']
				parkData['states'] = sorted(parkRaw['states'].split(","))
				for address in parkRaw['addresses']:
					if address['type'] == "Physical":
						parkData['address'] = re.sub("(, )+", ", ", address['line1'] + ", " + address['line2'] + ", " + address['line3'] + ", " + address['city'] + ", " + address['stateCode'] + " " + address['postalCode'])
				for phone in parkRaw['contacts']['phoneNumbers']:
					if phone['type'] == "Voice":
						chars = re.findall("[0-9]", phone['phoneNumber'])
						chars.insert(6, "-")
						chars.insert(3, ") ")
						chars.insert(0, "(")
						parkData['phone'] = "".join(chars)
				parkData['email'] = parkRaw['contacts']['emailAddresses'][0]['emailAddress']
				images = []
				for image in parkRaw['images']:
					images.append(image['url'])
				parkData['images'] = " ".join(images)
				if 'address' in parkData:
					parksList.append(parkData)
	return parksList

def parks_dump_json(parksList):
	with open("parks.json", "w") as outfile:
		json.dump(parksList, outfile)

def parks_commit_db(parksList):
	Session = sessionmaker(bind=engine)
	session = Session()
	# later change to full length
	for i in range(0, len(parksList)):
		print("trying commit for park i=%d" % (i))
		states = []
		for state in parksList[i]['states']:
			states.append(ParkState(name=state))
		del parksList[i]['states']
		park = Park(**parksList[i])
		park.states = states
		session.add(park)
		session.commit()
		print("succeeded commit for park i=%d" % (i))


