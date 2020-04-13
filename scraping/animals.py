
import requests
import json
import re
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import os
from dotenv import load_dotenv


# use sqlite in memory for testing and postgresql to store in RDS; BE VERY CERTAIN WHEN COMMITTING TO RDS
# engine = create_engine('postgresql://' + os.getenv('DB_USER') + ':' + os.getenv('DB_PASS') + '@' + os.getenv('DB_HOST') + ':' + os.getenv('DB_PORT') + '/' + os.getenv('DB_NAME'), echo=True)
engine = create_engine('sqlite:///:memory:', echo=True)
Base = declarative_base()

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

Base.metadata.create_all(engine)

def animals_ecos_request():
	endpoint = "https://ecos.fws.gov/ecp/pullreports/catalog/species/report/species/export" 
	animalColumns = "columns=/species@sid,cn,sn,status,listing_date,gn,dps,is_aquatic,is_bcc;/species/range_state@abbrev;/species/conservation_plans@plan_title"
	# prevent null = scientific name, common name, date
	# allowed null = dps, aquatic, bcc, range_state, conservation_plan
	validFilters = "filter=/species@sn != ''&filter=/species@sn is not null&filter=/species@cn != ''&filter=/species@cn is not null&filter=/species@cn != 'None'&filter=/species@listing_date is not null"
	statusFilters = "filter=/species@status = 'Endangered' or /species@status = 'Recovery' or /species@status = 'Threatened'"
	animalFilters = "filter=/species@gn = 'Amphibians' or /species@gn = 'Arachnids' or /species@gn = 'Birds' or /species@gn = 'Clams' or /species@gn = 'Corals' or /species@gn = 'Crustaceans' or /species@gn = 'Fishes' or /species@gn = 'Insects' or /species@gn = 'Mammals' or /species@gn = 'Reptiles' or /species@gn = 'Snails'"

	r = requests.get(endpoint + "?" + animalColumns + "&" + validFilters + "&" + statusFilters + "&" + animalFilters)
	rawData = r.json()['data']

	animalsList = []
	duplicates = dict()
	for animalData in rawData:
		id = animalData[0]
		if id in duplicates:
			# don't append, modify old entry - can be duplicate due to states or conservation plans
			newState = animalData[9]
			newPlan = animalData[10]
			if newState is not None:
				if animalsList[duplicates[id]]["states"] is None:
					animalsList[duplicates[id]]["states"] = newState
				elif newState not in animalsList[duplicates[id]]["states"]:
					animalsList[duplicates[id]]["states"].append(newState)
					animalsList[duplicates[id]]["states"].sort()
			if newPlan is not None:
				if animalsList[duplicates[id]]["plan"] is None:
					animalsList[duplicates[id]]["plan"] = newPlan

		else:
			# append new animal's data
			duplicates[animalData[0]] = len(animalsList)
			animalDict = dict()
			animalDict['id'] = animalData[0]
			animalDict['com_name'] = animalData[1]
			animalDict['sci_name'] = animalData[2]['value']
			animalDict['status'] = animalData[3]
			animalDict['list_date'] = animalData[4]
			animalDict['tax_group'] = animalData[5]
			animalDict['dps'] = animalData[6]
			animalDict['aquatic'] = animalData[7] if animalData[7] is not None else True
			animalDict['bcc'] = animalData[8]
			animalDict['states'] = list() if animalData[9] is None else [animalData[9]]
			animalDict['plan'] = None if animalData[10] is None else animalData[10]['value']
			animalsList.append(animalDict)
	return animalsList

# remove invalid animals and prettify names
def animals_pretty_parse(animalsList):
	for i in range(len(animalsList) - 1, -1, -1):
		if len(animalsList[i]['states']) == 0:
			del animalsList[i]
		else:
			if animalsList[i]['plan'] is None:
				animalsList[i]['plan'] = "None"
			animalsList[i]['com_name'] = re.sub(" [(]=.*[)]", "", animalsList[i]['com_name']).title()
			animalsList[i]['sci_name'] = re.sub(" [(]=.*[)]", "", animalsList[i]['sci_name'])


# fetch images; only run if necessary, costs credits
def animals_fetch_images(animalsList):
	endpoint = "https://park-protection-image-search.cognitiveservices.azure.com/bing/v7.0/images/search?q="
	headers = {"Ocp-Apim-Subscription-Key" : os.getenv("IMAGES_KEY")}

	# later change to full length
	for i in range(len(animalsList) - 1, -1, -1):
		print("image request for i=%d" % (i))
		r = requests.get(endpoint + animalsList[i]["com_name"], headers=headers)
		rawData = r.json()
		if "value" in rawData and len(rawData["value"]) > 0:
			animalsList[i]["image"] = rawData["value"][0]["contentUrl"]
		else:
			del animalsList[i]
		print("image succeeded for i=%d" % (i))

def animals_json_dump(animalsList):
	with open("animals.json", "w") as outfile:
		json.dump(animalsList, outfile)


# add animal to database
def animals_commit_db(animalsList):
	Session = sessionmaker(bind=engine)
	session = Session()

	# later change to full length
	for i in range(0, len(animalsList)):
		print("adding animal for i=%d" % (i))
		states = []
		for state in animalsList[i]['states']:
			states.append(AnimalState(name=state))
		del animalsList[i]['states']
		animal = Animal(**animalsList[i])
		animal.states = states
		session.add(animal)
		session.commit()
		print("succeeded animal for i=%d" % (i))
