#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# -------
# imports
# -------

from io import StringIO
from unittest import main, TestCase
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '../scraping'))
from plants import *
from animals import *
from parks import *

class Tests(TestCase):

    # ------
    # Plants
    # ------

    def test_plants_ecos_request(self):
        plantsList = plants_ecos_request()
        self.assertIsNotNone(plantsList)
        self.assertEqual(len(plantsList), 955)

    def test_plants_usda_request(self):
        plantsList = [{"sci_name": "Clematis socialis"}]
        plants_usda_request("https://plantsdb.xyz/search?limit=1&Genus=Clematis&Species=socialis", plantsList, 0)
        self.assertIsNotNone(plantsList)
        self.assertEqual(len(plantsList), 1)
        plant = plantsList[0]
        self.assertIn("sci_name", plant)
        self.assertIn("com_name", plant)
        self.assertIn("family", plant)
        self.assertIn("family_com", plant)
        self.assertIn("category", plant)
        self.assertIn("duration", plant)
        self.assertIn("growth", plant)
        self.assertIn("toxicity", plant)

    def test_plants_pretty_parse(self):
        plantsList = [{"sci_name": "Thelypteris (=latin) pilosa var. alabamensis", "states": ["AL"], "plan": None}]
        plants_pretty_parse(plantsList)
        self.assertIsNotNone(plantsList)
        self.assertEqual(len(plantsList), 1)
        plant = plantsList[0]
        self.assertIn("sci_name", plant)
        self.assertEqual(plant["sci_name"], "Thelypteris pilosa var. alabamensis")
        self.assertIn("com_name", plant)
        self.assertIn("family", plant)
        self.assertIn("family_com", plant)
        self.assertIn("category", plant)
        self.assertIn("duration", plant)
        self.assertIn("growth", plant)
        self.assertIn("toxicity", plant)

    # -------
    # Animals
    # -------

    def test_animals_ecos_requests(self):
        animalsList = animals_ecos_request()
        self.assertIsNotNone(animalsList)
        self.assertEqual(len(animalsList), 1358)

    def test_animals_pretty_parse(self):
        animalsList = [{"states": []}, {"states": ["AL"], "plan": None, "com_name": "A (=B) C", "sci_name": "D E (=F)"}]
        animals_pretty_parse(animalsList)
        self.assertIsNotNone(animalsList)
        self.assertEqual(len(animalsList), 1)
        animal = animalsList[0]
        self.assertEqual(animal["states"], ["AL"])
        self.assertEqual(animal["plan"], "None")
        self.assertEqual(animal["com_name"], "A C")
        self.assertEqual(animal["sci_name"], "D E")

    # -----
    # Parks
    # -----

    def test_parks_request_args(self):
        parksList = parks_request(-1, -1)
        self.assertIsNotNone(parksList)
        self.assertEqual(len(parksList), 0)

    def test_parks_request_single(self):
        parksList = parks_request(1, 1)
        self.assertIsNotNone(parksList)
        self.assertEqual(len(parksList), 1)
        self.assertEqual(parksList[0]["code"], "avia")

    def test_parks_request_pretty_parsing(self):
        parksList = parks_request(1, 1)
        park = parksList[0]
        self.assertEqual(park["address"], "16 South Williams St., Dayton, OH 45402")
        self.assertEqual(park["phone"], "(937) 225-7705")
        self.assertEqual(park["email"], "tom_engberg@nps.gov")
        self.assertEqual(park["images"], "https://www.nps.gov/common/uploads/structured_data/DCB2628F-1DD8-B71B-0BD78D1063069C70.jpg")

if __name__ == "__main__":  # pragma: no cover
    main()
