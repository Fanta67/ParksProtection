
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
from time import sleep


# use sqlite in memory for testing and postgresql to store in RDS; BE VERY CERTAIN WHEN COMMITTING TO RDS
# engine = create_engine('postgresql://' + os.getenv('DB_USER') + ':' + os.getenv('DB_PASS') + '@' + os.getenv('DB_HOST') + ':' + os.getenv('DB_PORT') + '/' + os.getenv('DB_NAME'), echo=True)
engine = create_engine('sqlite:///:memory:')
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

Base.metadata.create_all(engine)

def plants_ecos_request():
	endpoint = "https://ecos.fws.gov/ecp/pullreports/catalog/species/report/species/export"
	# scientific name, status
	plantColumns = "columns=/species@sid,sn,status,listing_date;/species/range_state@abbrev;/species/conservation_plans@plan_title"
	# prevent null = scientific name, common name, date
	# allowed null = range_state, conservation_plan
	validFilters = "filter=/species@sn != ''&filter=/species@sn is not null&filter=/species@cn != ''&filter=/species@cn is not null&filter=/species@cn != 'None'&filter=/species@listing_date is not null"
	statusFilters = "filter=/species@status = 'Endangered' or /species@status = 'Recovery' or /species@status = 'Threatened'"
	plantFilters = "filter=/species@gn = 'Conifers and Cycads' or /species@gn = 'Ferns and Allies' or /species@gn = 'Flowering Plants'"

	r = requests.get(endpoint + "?" + plantColumns + "&" + validFilters + "&" + statusFilters + "&" + plantFilters)
	rawData = r.json()['data']

	plantsList = []
	duplicates = dict()
	for plantData in rawData:
		id = plantData[0]
		if id in duplicates:
			# don't append, modify old entry - can be duplicate due to states or conservation plans
			newState = plantData[4]
			newPlan = plantData[5]
			if newState is not None:
				if plantsList[duplicates[id]]["states"] is None:
					plantsList[duplicates[id]]["states"] = newState
				elif newState not in plantsList[duplicates[id]]["states"]:
					plantsList[duplicates[id]]["states"].append(newState)
					plantsList[duplicates[id]]["states"].sort()
			if newPlan is not None:
				if plantsList[duplicates[id]]["plan"] is None:
					plantsList[duplicates[id]]["plan"] = newPlan

		else:
			# append new plant's data
			duplicates[plantData[0]] = len(plantsList)
			plantDict = dict()
			plantDict['id'] = plantData[0]
			plantDict['sci_name'] = plantData[1]['value']
			plantDict['status'] = plantData[2]
			plantDict['list_date'] = plantData[3]
			plantDict['states'] = list() if plantData[4] is None else [plantData[4]]
			plantDict['plan'] = None if plantData[5] is None else plantData[5]['value']
			plantsList.append(plantDict)
	return plantsList

def plants_usda_request(endpoint, plantsList, i):
	# print("trying data for i=%d" % (i), flush=True)
	try:
		r = requests.get(endpoint)
	except requests.exceptions.ConnectionError:
		print("sleeping: %d" % (i), flush=True)
		sleep(10)
		r = requests.get(endpoint)

	result = r.json()
	if result['returned'] == 0:
		del plantsList[i]
	else:
		plantData = result['data'][0]
		"""
		endpoint = "https://park-protection-image-search.cognitiveservices.azure.com/bing/v7.0/images/search?q="
		headers = {"Ocp-Apim-Subscription-Key" : os.getenv("IMAGES_KEY")}
		r = requests.get(endpoint + plantsList[i]['sci_name'], headers=headers)
		imageData = r.json()
		"""
		# if 'value' not in imageData or len(imageData['value']) == 0 or 
		if not plantData or plantData['Common_Name'] == "" or plantData['Family'] == "" or plantData['Family_Common_Name'] == "" or plantData['Category'] == "" or plantData['Duration'] == "" or plantData['Growth_Habit'] == "":
			del plantsList[i]
		else:
			plantsList[i]['com_name'] = plantData['Common_Name'].title()
			plantsList[i]['family'] = plantData['Family'].title()
			plantsList[i]['family_com'] = re.sub(" family", "", plantData['Family_Common_Name'])
			plantsList[i]['category'] = plantData['Category'].title()
			plantsList[i]['duration'] = plantData['Duration'].title()
			plantsList[i]['growth'] = plantData['Growth_Habit'].title()
			plantsList[i]['toxicity'] = plantData['Toxicity'] if plantData['Toxicity'] != "" else "None"
			# plantsList[i]["image"] = imageData['value'][0]['contentUrl']
	# print("succeeded data for i=%d" % (i), flush=True)

# remove invalid plants and prettify names
def plants_pretty_parse(plantsList):
	endpoint = "https://plantsdb.xyz/search?limit=1"
	for i in range(len(plantsList) - 1, -1, -1):
		if len(plantsList[i]['states']) == 0:
			del plantsList[i]
		else:
			if plantsList[i]['plan'] is None:
				plantsList[i]['plan'] = "None"
			plantsList[i]['sci_name'] = re.sub(" [(]=.*[)]", "", plantsList[i]['sci_name'])
			nameSplit = plantsList[i]['sci_name'].split()
			genus = nameSplit[0]
			if len(nameSplit) == 1:
				del plantsList[i]
			else:
				species = nameSplit[1]
			if len(nameSplit) > 2:
				if nameSplit[2] == "ssp." or nameSplit[2] == "subsp.":
					ssp = nameSplit[3]
					plants_usda_request(endpoint + "&Genus=" + genus + "&Species=" + species + "&Subspecies=" + ssp, plantsList, i)
				elif nameSplit[2] == "var.":
					var = nameSplit[3]
					plants_usda_request(endpoint + "&Genus=" + genus + "&Species=" + species + "&Variety=" + var, plantsList, i)
				else:
					del plantsList[i]
			else:
				plants_usda_request(endpoint + "&Genus=" + genus + "&Species=" + species, plantsList, i)

def plants_json_dump(plantsList):
	plantsList.sort(key = lambda i: i['com_name'])
	with open("plants.json", "w") as outfile:
		json.dump(plantsList, outfile)


def plants_commit_db(plantsList):
	Session = sessionmaker(bind=engine)
	session = Session()
	for i in range(0, len(plantsList)):
		print("trying commit for i=%d" % (i), flush=True)
		states = []
		for state in plantsList[i]['states']:
			states.append(PlantState(name=state))
		del plantsList[i]['states']
		plant = Plant(**plantsList[i])
		plant.states = states
		session.add(plant)
		session.commit()
		print("succeeded commit for i=%d" % (i), flush=True)


