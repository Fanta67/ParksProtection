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

sys.path.append(os.path.join(os.path.dirname(__file__), "../scraping"))
from plants import *
from animals import *
from parks import *


class Tests(TestCase):

    # ------
    # Plants
    # ------

    def test_plants_num_results(self):
        r = requests.get("https://api.parkprotection.me/api/plants")
        assert r.status_code == 200
        d = r.json()
        assert d["num_results"] == 380

    def test_plants_list(self):
        r = requests.get("https://api.parkprotection.me/api/plants")
        assert r.status_code == 200
        d = r.json()
        assert len(d["objects"]) > 0
        assert d["objects"][0] == {
            "category": "Dicot",
            "com_name": "White Bladderpod",
            "des": "Physaria pallida (Synonym (taxonomy)\n",
            "duration": "Annual",
            "family": "Brassicaceae",
            "family_com": "Mustard",
            "growth": "Forb/Herb",
            "id": 104,
            "image": "https://c1.staticflickr.com/5/4075/4777566627_c972d6ea65_b.jpg",
            "list_date": "03-11-1987",
            "plan": "None",
            "sci_name": "Lesquerella pallida",
            "states": [{"id": 995, "name": "TX", "plant_id": 104}],
            "status": "Endangered",
            "toxicity": "None",
        }

    def test_plants_instance(self):
        r = requests.get("https://api.parkprotection.me/api/plants/104")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "category": "Dicot",
            "com_name": "White Bladderpod",
            "des": "Physaria pallida (Synonym (taxonomy)\n",
            "duration": "Annual",
            "family": "Brassicaceae",
            "family_com": "Mustard",
            "growth": "Forb/Herb",
            "id": 104,
            "image": "https://c1.staticflickr.com/5/4075/4777566627_c972d6ea65_b.jpg",
            "list_date": "03-11-1987",
            "plan": "None",
            "sci_name": "Lesquerella pallida",
            "states": [{"id": 995, "name": "TX", "plant_id": 104}],
            "status": "Endangered",
            "toxicity": "None",
        }

    def test_plants_pagination(self):
        r = requests.get("https://api.parkprotection.me/api/plants?results_per_page=3")
        assert r.status_code == 200
        d = r.json()
        assert {
            "num_results": 380,
            "objects": [
                {
                    "category": "Dicot",
                    "com_name": "White Bladderpod",
                    "des": "Physaria pallida (Synonym (taxonomy)\n",
                    "duration": "Annual",
                    "family": "Brassicaceae",
                    "family_com": "Mustard",
                    "growth": "Forb/Herb",
                    "id": 104,
                    "image": "https://c1.staticflickr.com/5/4075/4777566627_c972d6ea65_b.jpg",
                    "list_date": "03-11-1987",
                    "plan": "None",
                    "sci_name": "Lesquerella pallida",
                    "states": [{"id": 995, "name": "TX", "plant_id": 104}],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Dicot",
                    "com_name": "Ruth'S Goldaster",
                    "des": "Pityopsis ruthii is a rare species of flowering plant in the Asteraceae\n",
                    "duration": "Perennial",
                    "family": "Asteraceae",
                    "family_com": "Aster",
                    "growth": "Forb/Herb",
                    "id": 105,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/Pityopsis_ruthii_lg.jpg",
                    "list_date": "07-18-1985",
                    "plan": "None",
                    "sci_name": "Pityopsis ruthii",
                    "states": [{"id": 722, "name": "TN", "plant_id": 105}],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Dicot",
                    "com_name": "Hoover'S Woollystar",
                    "des": "Eriastrum hooveri is a rare species of flowering plant in the Polemoniaceae\nThis plant was considered to be in serious jeopardy in the 1980s when many of its populations, most of which occurred on private and unprotected land, were in immediate danger of being destroyed by one or more threats, including conversion of the land for agricultural use, oil well\n",
                    "duration": "Annual",
                    "family": "Polemoniaceae",
                    "family_com": "Phlox",
                    "growth": "Forb/Herb",
                    "id": 108,
                    "image": "https://calphotos.berkeley.edu/imgs/512x768/0000_0000/0216/2685.jpeg",
                    "list_date": "07-19-1990",
                    "plan": "Seneca and Enron Oil and Gas",
                    "sci_name": "Eriastrum hooveri",
                    "states": [{"id": 328, "name": "CA", "plant_id": 108}],
                    "status": "Recovery",
                    "toxicity": "None",
                },
            ],
            "page": 1,
            "total_pages": 127,
        }

    def test_plants_search(self):
        r = requests.get(
            'https://api.parkprotection.me/api/plants?results_per_page=1000&q={"search_query":"prairie"}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 10,
            "objects": [
                {
                    "com_name": "Field Locoweed",
                    "id": 209,
                    "image": "https://www.fs.fed.us/wildflowers/Rare_Plants/profiles/TEP/oxytropis_campestris_chartacea/images/oxytropis_campestris_v_chartacea_lg.jpg",
                    "match": "<hlt>prairie</hlt>s,",
                },
                {
                    "com_name": "Prairie White Fringed Orchid",
                    "id": 601,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Platanthera_leucophaea.jpg/220px-Platanthera_leucophaea.jpg",
                    "match": "<hlt>prairie</hlt>",
                },
                {
                    "com_name": "Great Plains White Fringed Orchid",
                    "id": 1669,
                    "image": "https://c2.staticflickr.com/4/3900/14787604013_7bb738a681_b.jpg",
                    "match": "<hlt>prairie</hlt>",
                },
                {
                    "com_name": "Harper'S Beauty",
                    "id": 3735,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Harperocallis_flava1.jpg/220px-Harperocallis_flava1.jpg",
                    "match": "<hlt>prairie</hlt>",
                },
                {
                    "com_name": "Schweinitz'S Sunflower",
                    "id": 3849,
                    "image": "https://limestonegrove.files.wordpress.com/2013/09/helianthus-schweinitzii-composite-flower.jpg?w=560&h=373",
                    "match": "<hlt>prairie</hlt>-like",
                },
                {
                    "com_name": "Prairie Lespedeza",
                    "id": 4458,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Lespedeza_leptostachya.jpg/220px-Lespedeza_leptostachya.jpg",
                    "match": "<hlt>prairie</hlt>",
                },
                {
                    "com_name": "Leafy Prairie Clover",
                    "id": 5498,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dalea_foliosa.jpg",
                    "match": "<hlt>prairie</hlt>",
                },
                {
                    "com_name": "Bradshaw'S Desertparsley",
                    "id": 5743,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lomatium_bradshawii_2.jpg/1200px-Lomatium_bradshawii_2.jpg",
                    "match": "<hlt>prairie</hlt>s.",
                },
                {
                    "com_name": "Prairiedawn",
                    "id": 6471,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Texas_Prairie_Dawn_01.jpg/220px-Texas_Prairie_Dawn_01.jpg",
                    "match": "<hlt>prairie</hlt>dawn",
                },
                {
                    "com_name": "Tinytim",
                    "id": 7699,
                    "image": "https://arkansasnativeplant.files.wordpress.com/2015/03/geocarpon-minimum-warren-prairie-1-of-1-2.jpg",
                    "match": "<hlt>prairie</hlt>s",
                },
            ],
        }

    def test_plants_sorting(self):
        r = requests.get(
            'https://api.parkprotection.me/api/plants?results_per_page=3&q={"order_by":[{"field":"family_com","direction":"desc"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 380,
            "objects": [
                {
                    "category": "Gymnosperm",
                    "com_name": "Florida Nutmeg",
                    "des": "Torreya taxifolia, commonly known as the Florida nutmeg, Florida torreya, gopher wood\n\nT. taxifolia became one of the first federally listed endangered plant species in the United States in 1984; the IUCN has listed the species as critically endangered since 1998. In 2010 98% of the mature trees of the species were believed to be have been destroyed due to a poorly understood fungal blight as well as inundation due to dams and destruction by White-tailed deer\n",
                    "duration": "Perennial",
                    "family": "Taxaceae",
                    "family_com": "Yew",
                    "growth": "Tree",
                    "id": 5391,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Torreya_taxifolia.jpg/240px-Torreya_taxifolia.jpg",
                    "list_date": "01-23-1984",
                    "plan": "None",
                    "sci_name": "Torreya taxifolia",
                    "states": [
                        {"id": 221, "name": "FL", "plant_id": 5391},
                        {"id": 222, "name": "GA", "plant_id": 5391},
                    ],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Monocot",
                    "com_name": "Tennessee Yelloweyed Grass",
                    "des": "Xyris tennesseensis is a rare species of flowering plant in the family Xyridaceae known by the common name Tennessee yellow-eyed grass. It is native to a small section of the Southeastern United States, including parts of the states of Alabama, Georgia (U.S. state)\nThis plant grows in open areas in wet habitat types such as streambanks, Seep (hydrology)\nThe plant requires open, sunny habitat for germination and growth, and it is threatened by the encroachment of large and woody vegetation in some areas. Proper land management includes the clearing of brush and the removal of introduced species\n",
                    "duration": "Perennial",
                    "family": "Xyridaceae",
                    "family_com": "Yellow-eyed Grass",
                    "growth": "Forb/Herb",
                    "id": 6010,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Xyris_tennesseensis.jpg/1200px-Xyris_tennesseensis.jpg",
                    "list_date": "07-26-1991",
                    "plan": "None",
                    "sci_name": "Xyris tennesseensis",
                    "states": [
                        {"id": 881, "name": "AL", "plant_id": 6010},
                        {"id": 882, "name": "GA", "plant_id": 6010},
                        {"id": 883, "name": "TN", "plant_id": 6010},
                    ],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Monocot",
                    "com_name": "Bunched Arrowhead",
                    "des": "Sagittaria fasciculata, the bunched arrowhead (also known as duck potato, Indian potato, or wapato) is a plant found in wetlands. This plant produces EatingSTATUS: Endangered, Federal Register, July 25, 1979\n\n",
                    "duration": "Perennial",
                    "family": "Alismataceae",
                    "family_com": "Water-plantain",
                    "growth": "Forb/Herb",
                    "id": 1720,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Sagittaria_fasciculata.jpg",
                    "list_date": "08-31-1979",
                    "plan": "None",
                    "sci_name": "Sagittaria fasciculata",
                    "states": [
                        {"id": 105, "name": "NC", "plant_id": 1720},
                        {"id": 106, "name": "SC", "plant_id": 1720},
                    ],
                    "status": "Endangered",
                    "toxicity": "None",
                },
            ],
            "page": 1,
            "total_pages": 127,
        }

    def test_plants_filtering(self):
        r = requests.get(
            'https://api.parkprotection.me/api/plants?results_per_page=3&q={"filters":[{"name":"states__name","op":"any","val":"TX"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert {
            "num_results": 25,
            "objects": [
                {
                    "category": "Dicot",
                    "com_name": "White Bladderpod",
                    "des": "Physaria pallida (Synonym (taxonomy)\n",
                    "duration": "Annual",
                    "family": "Brassicaceae",
                    "family_com": "Mustard",
                    "growth": "Forb/Herb",
                    "id": 104,
                    "image": "https://c1.staticflickr.com/5/4075/4777566627_c972d6ea65_b.jpg",
                    "list_date": "03-11-1987",
                    "plan": "None",
                    "sci_name": "Lesquerella pallida",
                    "states": [{"id": 995, "name": "TX", "plant_id": 104}],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Monocot",
                    "com_name": "Texas Wildrice",
                    "des": "Zizania texana is a rare species of grass known by the common name Texas wild rice. It is Endemism\n",
                    "duration": "Perennial",
                    "family": "Poaceae",
                    "family_com": "Grass",
                    "growth": "Graminoid",
                    "id": 805,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Zizania_texana_%28Texas_wild_rice%29_FWS_20534.jpg/1200px-Zizania_texana_%28Texas_wild_rice%29_FWS_20534.jpg",
                    "list_date": "05-27-1978",
                    "plan": "Edwards Aquifer Authority Recovery Implementation Program / EARIP",
                    "sci_name": "Zizania texana",
                    "states": [{"id": 887, "name": "TX", "plant_id": 805}],
                    "status": "Endangered",
                    "toxicity": "None",
                },
                {
                    "category": "Dicot",
                    "com_name": "Neches River Rosemallow",
                    "des": "Hibiscus dasycalyx is a species of hibiscus known by the common name Neches River rosemallow. It is endemism\nThis woody perennial herb grows up to 2.3 meters tall. The leaves are T-shaped and have three lobes.http://www.centerforplantconservation.org/Collection/CPC_ViewProfile.asp?CPCNum=2258 Hibiscus dasycalyx. {{Webarchive\n",
                    "duration": "Perennial",
                    "family": "Malvaceae",
                    "family_com": "Mallow",
                    "growth": "Forb/Herb",
                    "id": 1441,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hibiscus_dasycalyx.jpg/220px-Hibiscus_dasycalyx.jpg",
                    "list_date": "10-11-2013",
                    "plan": "Neches River rose-mallow -- Temple-Inland Forest Products Company",
                    "sci_name": "Hibiscus dasycalyx",
                    "states": [{"id": 563, "name": "TX", "plant_id": 1441}],
                    "status": "Threatened",
                    "toxicity": "None",
                },
            ],
            "page": 1,
            "total_pages": 9,
        }

    def test_plants_ecos_request(self):
        plantsList = plants_ecos_request()
        self.assertIsNotNone(plantsList)
        self.assertEqual(len(plantsList), 955)

    def test_plants_usda_request(self):
        plantsList = [{"sci_name": "Clematis socialis"}]
        plants_usda_request(
            "https://plantsdb.xyz/search?limit=1&Genus=Clematis&Species=socialis",
            plantsList,
            0,
        )
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
        plantsList = [
            {
                "sci_name": "Thelypteris (=latin) pilosa var. alabamensis",
                "states": ["AL"],
                "plan": None,
            }
        ]
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

    def test_animals_num_results(self):
        r = requests.get("https://api.parkprotection.me/api/animals")
        assert r.status_code == 200
        d = r.json()
        assert d["num_results"] == 510

    def test_animals_list(self):
        r = requests.get("https://api.parkprotection.me/api/animals")
        assert r.status_code == 200
        d = r.json()
        assert len(d["objects"]) > 0
        assert d["objects"][0] == {
            "aquatic": False,
            "bcc": False,
            "com_name": "Florida grasshopper sparrow",
            "des": "Florida grasshopper sparrow (Ammodramus savannarum floridanus) is an endangered subspecies of grasshopper sparrow native to the Florida dry prairie\nThe Florida grasshopper sparrow is one of four subspecies of grasshopper sparrows in North America, and is perhaps the most endangered.\n\n",
            "dps": False,
            "id": 32,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adult_Florida_grasshopper_sparrow.jpg/1200px-Adult_Florida_grasshopper_sparrow.jpg",
            "list_date": "07-31-1986",
            "plan": "None",
            "sci_name": "Ammodramus savannarum floridanus",
            "states": [{"animal_id": 32, "id": 388, "name": "FL"}],
            "status": "Endangered",
            "tax_group": "Birds",
        }

    def test_animals_instance(self):
        r = requests.get("https://api.parkprotection.me/api/animals/32")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "aquatic": False,
            "bcc": False,
            "com_name": "Florida grasshopper sparrow",
            "des": "Florida grasshopper sparrow (Ammodramus savannarum floridanus) is an endangered subspecies of grasshopper sparrow native to the Florida dry prairie\nThe Florida grasshopper sparrow is one of four subspecies of grasshopper sparrows in North America, and is perhaps the most endangered.\n\n",
            "dps": False,
            "id": 32,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adult_Florida_grasshopper_sparrow.jpg/1200px-Adult_Florida_grasshopper_sparrow.jpg",
            "list_date": "07-31-1986",
            "plan": "None",
            "sci_name": "Ammodramus savannarum floridanus",
            "states": [{"animal_id": 32, "id": 388, "name": "FL"}],
            "status": "Endangered",
            "tax_group": "Birds",
        }

    def test_animals_pagination(self):
        r = requests.get("https://api.parkprotection.me/api/animals?results_per_page=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 510,
            "objects": [
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "Florida grasshopper sparrow",
                    "des": "Florida grasshopper sparrow (Ammodramus savannarum floridanus) is an endangered subspecies of grasshopper sparrow native to the Florida dry prairie\nThe Florida grasshopper sparrow is one of four subspecies of grasshopper sparrows in North America, and is perhaps the most endangered.\n\n",
                    "dps": False,
                    "id": 32,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adult_Florida_grasshopper_sparrow.jpg/1200px-Adult_Florida_grasshopper_sparrow.jpg",
                    "list_date": "07-31-1986",
                    "plan": "None",
                    "sci_name": "Ammodramus savannarum floridanus",
                    "states": [{"animal_id": 32, "id": 388, "name": "FL"}],
                    "status": "Endangered",
                    "tax_group": "Birds",
                },
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "Golden-cheeked warbler",
                    "des": "golden-cheeked warbler (Setophaga chrysoparia formerly Dendroica chrysoparia), also known as the gold finch of Texas, is an endangered species of bird that breeds in Central Texas, from Palo Pinto County, TexasFile:DendraecaChrysopariaKeulemans.jpg\n",
                    "dps": False,
                    "id": 33,
                    "image": "https://animaldiversity.org/collections/contributors/usfws/goldencheekedwarbler/medium.jpg",
                    "list_date": "05-04-1990",
                    "plan": "Scarpato, Thomas V. and Neybund-Scarpato, Janet E.",
                    "sci_name": "Dendroica chrysoparia",
                    "states": [{"animal_id": 33, "id": 420, "name": "TX"}],
                    "status": "Endangered",
                    "tax_group": "Birds",
                },
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "Red wolf",
                    "des": "red wolf (Canis lupus rufus) is a Canis\nThe red wolfs proper taxonomic classification \u2014 in essence, whether it is an admixture of wolf and coyote or a third, distinct species \u2014 has been contentious for well over a century and is still under debate. Because of this, it is sometimes excluded from endangered species lists despite its critically low numbers. Since 1996 the IUCN has listed it as a vulnerable species\n",
                    "dps": False,
                    "id": 37,
                    "image": "https://media.mnn.com/assets/images/2016/07/red-wolf-canis-rufus.jpg",
                    "list_date": "03-11-1967",
                    "plan": "None",
                    "sci_name": "Canis rufus",
                    "states": [{"animal_id": 37, "id": 1149, "name": "FL"}],
                    "status": "Endangered",
                    "tax_group": "Mammals",
                },
            ],
            "page": 1,
            "total_pages": 170,
        }

    def test_animals_search(self):
        r = requests.get(
            'https://api.parkprotection.me/api/animals?results_per_page=1000&q={"search_query":"wound"}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 1,
            "objects": [
                {
                    "com_name": "Woundfin",
                    "id": 49,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Woundfin_(Plagopterus_argentissimus).jpg/240px-Woundfin_(Plagopterus_argentissimus).jpg",
                    "match": "<hlt>wound</hlt>fin",
                }
            ],
        }

    def test_animals_sorting(self):
        r = requests.get(
            'https://api.parkprotection.me/api/animals?results_per_page=3&q={"order_by":[{"field":"sci_name","direction":"desc"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 510,
            "objects": [
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "Preble's meadow jumping mouse",
                    "des": "Prebles meadow jumping mouse (Zapus hudsonius preblei) is a subspecies of meadow jumping mouse, endemic to the upland habitats of Colorado and Wyoming in North America. It is found nowhere else in the world. It is listed as Threatened under the United States Endangered Species Act; there is a major debate about whether it is a valid taxon.\n\n",
                    "dps": False,
                    "id": 4090,
                    "image": "https://pixnio.com/free-images/fauna-animals/rats-mice-and-voles-pictures/prebles-meadow-jumping-mouse-endengered-mammal-species-zapus-hudsonius-preblei.jpg",
                    "list_date": "05-13-1998",
                    "plan": "Bellvue WTP Ponds Toe Drains",
                    "sci_name": "Zapus hudsonius preblei",
                    "states": [
                        {"animal_id": 4090, "id": 1050, "name": "CO"},
                        {"animal_id": 4090, "id": 1051, "name": "WY"},
                    ],
                    "status": "Threatened",
                    "tax_group": "Mammals",
                },
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "New Mexico meadow jumping mouse",
                    "des": "meadow jumping mouse (Zapus hudsonius) is the most widely distributed mouse in the subfamily Zapodinae.  Its range extends from the Atlantic coast in the east to the Great Plains west, and from the arctic tree lines in Canada and Alaska to the north, and Georgia (U.S. state)\n",
                    "dps": False,
                    "id": 7965,
                    "image": "https://farm4.staticflickr.com/3641/3621794753_ced0b3499f_z.jpg",
                    "list_date": "07-10-2014",
                    "plan": "None",
                    "sci_name": "Zapus hudsonius luteus",
                    "states": [
                        {"animal_id": 7965, "id": 826, "name": "AZ"},
                        {"animal_id": 7965, "id": 827, "name": "CO"},
                        {"animal_id": 7965, "id": 828, "name": "NM"},
                    ],
                    "status": "Endangered",
                    "tax_group": "Mammals",
                },
                {
                    "aquatic": True,
                    "bcc": False,
                    "com_name": "Western glacier stonefly",
                    "des": "Zapada is a genus of spring stoneflies in the family Nemouridae. There are at least 10 described species in Zapada.\n\n\n\n",
                    "dps": False,
                    "id": 9133,
                    "image": "https://www.nationalparkstraveler.org/sites/default/files/resize/remote/de8bb958e3141f7c1edec99108ed4875-340x265.jpg?itok=WBRSmFZV",
                    "list_date": "12-23-2019",
                    "plan": "None",
                    "sci_name": "Zapada glacier",
                    "states": [
                        {"animal_id": 9133, "id": 1447, "name": "MT"},
                        {"animal_id": 9133, "id": 1448, "name": "WY"},
                    ],
                    "status": "Threatened",
                    "tax_group": "Insects",
                },
            ],
            "page": 1,
            "total_pages": 170,
        }

    def test_animals_filtering(self):
        r = requests.get(
            'https://api.parkprotection.me/api/animals?results_per_page=3&q={"filters":[{"name":"states__name","op":"any","val":"TX"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 70,
            "objects": [
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "Golden-cheeked warbler",
                    "des": "golden-cheeked warbler (Setophaga chrysoparia formerly Dendroica chrysoparia), also known as the gold finch of Texas, is an endangered species of bird that breeds in Central Texas, from Palo Pinto County, TexasFile:DendraecaChrysopariaKeulemans.jpg\n",
                    "dps": False,
                    "id": 33,
                    "image": "https://animaldiversity.org/collections/contributors/usfws/goldencheekedwarbler/medium.jpg",
                    "list_date": "05-04-1990",
                    "plan": "Scarpato, Thomas V. and Neybund-Scarpato, Janet E.",
                    "sci_name": "Dendroica chrysoparia",
                    "states": [{"animal_id": 33, "id": 420, "name": "TX"}],
                    "status": "Endangered",
                    "tax_group": "Birds",
                },
                {
                    "aquatic": False,
                    "bcc": False,
                    "com_name": "American burying beetle",
                    "des": "Nicrophorus americanus, also known as the It belongs to the order Coleoptera and the family Silphidae. The carrion beetle in North America is carnivorous, feeds on carrion and requires carrion to breed. It is also one of the few species of beetle to exhibit parental care. The decline of the American burying beetle has been attributed to habitat loss, alteration, and degradation, and they now occur over less than 10% of their historic range.\n\n",
                    "dps": False,
                    "id": 66,
                    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Nicrophorus_americanus_-_Sankt-Peterburg.jpg",
                    "list_date": "07-13-1989",
                    "plan": "ICP-A - Bravo Arkoma, LLC",
                    "sci_name": "Nicrophorus americanus",
                    "states": [
                        {"animal_id": 66, "id": 27, "name": "AR"},
                        {"animal_id": 66, "id": 28, "name": "KS"},
                        {"animal_id": 66, "id": 29, "name": "MA"},
                        {"animal_id": 66, "id": 30, "name": "NE"},
                        {"animal_id": 66, "id": 31, "name": "OH"},
                        {"animal_id": 66, "id": 32, "name": "OK"},
                        {"animal_id": 66, "id": 33, "name": "RI"},
                        {"animal_id": 66, "id": 34, "name": "SD"},
                        {"animal_id": 66, "id": 35, "name": "TX"},
                    ],
                    "status": "Endangered",
                    "tax_group": "Insects",
                },
                {
                    "aquatic": True,
                    "bcc": False,
                    "com_name": "Diminutive Amphipod",
                    "des": "Parsing error. View wikipedia page titled United States Fish and Wildlife Service list of threatened and endangered arthropods",
                    "dps": False,
                    "id": 224,
                    "image": "https://s3.amazonaws.com/images.federalregister.gov/ER09JY13.009/large.gif",
                    "list_date": "07-09-2013",
                    "plan": "Balmorhea State Park",
                    "sci_name": "Gammarus hyalleloides",
                    "states": [
                        {"animal_id": 224, "id": 316, "name": "NM"},
                        {"animal_id": 224, "id": 317, "name": "TX"},
                    ],
                    "status": "Endangered",
                    "tax_group": "Crustaceans",
                },
            ],
            "page": 1,
            "total_pages": 24,
        }

    def test_animals_ecos_requests(self):
        animalsList = animals_ecos_request()
        self.assertIsNotNone(animalsList)

    def test_animals_pretty_parse(self):
        animalsList = [
            {"states": []},
            {
                "states": ["AL"],
                "plan": None,
                "com_name": "A (=B) C",
                "sci_name": "D E (=F)",
            },
        ]
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

    def test_parks_num_results(self):
        r = requests.get("https://api.parkprotection.me/api/parks")
        assert r.status_code == 200
        d = r.json()
        assert d["num_results"] == 388

    def test_parks_list(self):
        r = requests.get("https://api.parkprotection.me/api/parks")
        assert r.status_code == 200
        d = r.json()
        assert len(d["objects"]) > 0
        assert d["objects"][0] == {
            "address": "2995 Lincoln Farm Road, Hodgenville, KY 42748",
            "code": "abli",
            "desc": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln.  His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War.  The country's first memorial to Lincoln, built with donations from young and old, enshrines the symbolic birthplace cabin.",
            "designation": "National Historical Park",
            "directions": "The Birthplace Unit of the park is located approximately 2 miles south of the town of Hodgenville on U.S. Highway 31E South. The Boyhood Home Unit at Knob Creek is located approximately 10 miles northeast of the Birthplace Unit of the park.",
            "email": "abli_administration@nps.gov",
            "images": "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg https://www.nps.gov/common/uploads/structured_data/3C8614D1-1DD8-B71B-0B1AF72CA452B051.jpg",
            "latitude": 37.5858662,
            "longitude": -85.67330523,
            "name": "Abraham Lincoln Birthplace National Historical Park",
            "phone": "(270) 358-3137",
            "states": [{"id": 391, "name": "KY", "park_code": "abli"}],
            "url": "https://www.nps.gov/abli/index.htm",
            "weather": "There are four distinct seasons in Central Kentucky. However, temperature and weather conditions can vary widely within those seasons. Spring and Fall are generally pleasant with frequent rain showers. Summer is usually hot and humid. Winter is moderately cold with mixed precipitation.",
        }

    def test_parks_instance(self):
        r = requests.get("https://api.parkprotection.me/api/parks/abli")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "address": "2995 Lincoln Farm Road, Hodgenville, KY 42748",
            "code": "abli",
            "desc": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln.  His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War.  The country's first memorial to Lincoln, built with donations from young and old, enshrines the symbolic birthplace cabin.",
            "designation": "National Historical Park",
            "directions": "The Birthplace Unit of the park is located approximately 2 miles south of the town of Hodgenville on U.S. Highway 31E South. The Boyhood Home Unit at Knob Creek is located approximately 10 miles northeast of the Birthplace Unit of the park.",
            "email": "abli_administration@nps.gov",
            "images": "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg https://www.nps.gov/common/uploads/structured_data/3C8614D1-1DD8-B71B-0B1AF72CA452B051.jpg",
            "latitude": 37.5858662,
            "longitude": -85.67330523,
            "name": "Abraham Lincoln Birthplace National Historical Park",
            "phone": "(270) 358-3137",
            "states": [{"id": 391, "name": "KY", "park_code": "abli"}],
            "url": "https://www.nps.gov/abli/index.htm",
            "weather": "There are four distinct seasons in Central Kentucky. However, temperature and weather conditions can vary widely within those seasons. Spring and Fall are generally pleasant with frequent rain showers. Summer is usually hot and humid. Winter is moderately cold with mixed precipitation.",
        }

    def test_parks_pagination(self):
        r = requests.get("https://api.parkprotection.me/api/parks?results_per_page=3")
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 388,
            "objects": [
                {
                    "address": "2995 Lincoln Farm Road, Hodgenville, KY 42748",
                    "code": "abli",
                    "desc": "For over a century people from around the world have come to rural Central Kentucky to honor the humble beginnings of our 16th president, Abraham Lincoln.  His early life on Kentucky's frontier shaped his character and prepared him to lead the nation through Civil War.  The country's first memorial to Lincoln, built with donations from young and old, enshrines the symbolic birthplace cabin.",
                    "designation": "National Historical Park",
                    "directions": "The Birthplace Unit of the park is located approximately 2 miles south of the town of Hodgenville on U.S. Highway 31E South. The Boyhood Home Unit at Knob Creek is located approximately 10 miles northeast of the Birthplace Unit of the park.",
                    "email": "abli_administration@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C861078-1DD8-B71B-0B774A242EF6A706.jpg https://www.nps.gov/common/uploads/structured_data/3C861263-1DD8-B71B-0B71EF9B95F9644F.jpg https://www.nps.gov/common/uploads/structured_data/3C86137D-1DD8-B71B-0B978BACD7EBAEF1.jpg https://www.nps.gov/common/uploads/structured_data/3C8614D1-1DD8-B71B-0B1AF72CA452B051.jpg",
                    "latitude": 37.5858662,
                    "longitude": -85.67330523,
                    "name": "Abraham Lincoln Birthplace National Historical Park",
                    "phone": "(270) 358-3137",
                    "states": [{"id": 391, "name": "KY", "park_code": "abli"}],
                    "url": "https://www.nps.gov/abli/index.htm",
                    "weather": "There are four distinct seasons in Central Kentucky. However, temperature and weather conditions can vary widely within those seasons. Spring and Fall are generally pleasant with frequent rain showers. Summer is usually hot and humid. Winter is moderately cold with mixed precipitation.",
                },
                {
                    "address": "Hulls Cove Visitor Center, Route 3, Bar Harbor, ME 04609",
                    "code": "acad",
                    "desc": "Acadia National Park protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States, an abundance of habitats, and a rich cultural heritage. At 3.5 million visits a year, it's one of the top 10 most-visited national parks in the United States. Visitors enjoy 27 miles of historic motor roads, 158 miles of hiking trails, and 45 miles of carriage roads.",
                    "designation": "National Park",
                    "directions": "From Boston take I-95 north to Augusta, Maine, then Route 3 east to Ellsworth, and on to Mount Desert Island. For an alternate route, continue on I-95 north to Bangor, Maine, then take Route 1A east to Ellsworth. In Ellsworth, take Route 3 to Mount Desert Island.",
                    "email": "acadia_information@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg https://www.nps.gov/common/uploads/structured_data/3C7B477B-1DD8-B71B-0BCB48E009241BAA.jpg https://www.nps.gov/common/uploads/structured_data/3C7B48F9-1DD8-B71B-0BD3B413E58978F8.jpg https://www.nps.gov/common/uploads/structured_data/3C7B4A95-1DD8-B71B-0B8C1868A4135836.jpg https://www.nps.gov/common/uploads/structured_data/3C7B4BEC-1DD8-B71B-0B2CF833F93140FF.jpg",
                    "latitude": 44.30777545,
                    "longitude": -68.30063316,
                    "name": "Acadia National Park",
                    "phone": "(207) 288-3338",
                    "states": [{"id": 338, "name": "ME", "park_code": "acad"}],
                    "url": "https://www.nps.gov/acad/index.htm",
                    "weather": "Located on Mount Desert Island in Maine, Acadia experiences all four seasons. Summer temperatures range from 45-90F (7-30C). Fall temperatures range from 30-70F (-1-21C). Typically the first frost is in mid-October and first snowfall begins in November and can continue through April with an average accumulation of 73 inches (185 cm). Winter temperatures range from 14-35F (-10 - 2C). Spring temperatures range from 30-70F (-1-21C).",
                },
                {
                    "address": "1250 Hancock Street, Quincy, MA 02169",
                    "code": "adam",
                    "desc": "From the sweet little farm at the foot of Penn\u2019s Hill to the gentleman\u2019s country estate at Peace field, Adams National Historical Park is the story of \u201cheroes, statesman, philosophers \u2026 and learned women\u201d whose ideas and actions helped to transform thirteen disparate colonies into one united nation.",
                    "designation": "National Historical Park",
                    "directions": "Traveling on U.S. Interstate 93, take exit 7 - Route 3 South to Braintree and Cape Cod. Take the first exit off Route 3 south - exit 19 - and follow signs toward Quincy Center. Continue straight on Burgin Parkway through six traffic lights. At the seventh traffic light, turn right onto Dimmock Street. Follow Dimmock Street one block and turn right onto Hancock Street. The National Park Service Visitor Center, located at 1250 Hancock Street on your left.  Validated parking is in the garage to the rear.",
                    "email": "adam_visitor_center@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C7C7416-1DD8-B71B-0B1B30D0827F7C74.jpg https://www.nps.gov/common/uploads/structured_data/3C7C7565-1DD8-B71B-0BEC729A3E865792.jpg https://www.nps.gov/common/uploads/structured_data/3C7C76BE-1DD8-B71B-0B6DFACFB45AC5A4.jpg https://www.nps.gov/common/uploads/structured_data/3C7C780E-1DD8-B71B-0B18B8DB9F39704F.jpg https://www.nps.gov/common/uploads/structured_data/3C7C7945-1DD8-B71B-0BE14B48DD78B777.jpg https://www.nps.gov/common/uploads/structured_data/3C7C7A77-1DD8-B71B-0BDA92321AD899C5.jpg https://www.nps.gov/common/uploads/structured_data/3C7C7BE3-1DD8-B71B-0B864F7398605B7E.jpg https://www.nps.gov/common/uploads/structured_data/3C7C7D4E-1DD8-B71B-0B48B5CDE41703D7.jpg",
                    "latitude": 42.2553961,
                    "longitude": -71.01160356,
                    "name": "Adams National Historical Park",
                    "phone": "(617) 770-1175",
                    "states": [{"id": 224, "name": "MA", "park_code": "adam"}],
                    "url": "https://www.nps.gov/adam/index.htm",
                    "weather": "Be prepared for hot, humid weather.  The historic homes are not air conditioned.\n\nWhile the visitor center remains open all year, the historic homes are closed from November 11 through May 17.",
                },
            ],
            "page": 1,
            "total_pages": 130,
        }

    def test_parks_search(self):
        r = requests.get(
            'https://api.parkprotection.me/api/parks?results_per_page=1000&q={"search_query":"yellow"}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 2,
            "objects": [
                {
                    "code": "grte",
                    "image": "https://www.nps.gov/common/uploads/structured_data/3C7FA4C5-1DD8-B71B-0B7FCC54E43FEE79.jpg",
                    "match": "<hlt>yellow</hlt>stone",
                    "name": "Grand Teton National Park",
                },
                {
                    "code": "yell",
                    "image": "https://www.nps.gov/common/uploads/structured_data/3C7D2FBB-1DD8-B71B-0BED99731011CFCE.jpg",
                    "match": "<hlt>yellow</hlt>stone",
                    "name": "Yellowstone National Park",
                },
            ],
        }

    def test_parks_sorting(self):
        r = requests.get(
            'https://api.parkprotection.me/api/parks?results_per_page=3&q={"order_by":[{"field":"designation","direction":"desc"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 388,
            "objects": [
                {
                    "address": "208 N. Maiden Street, Wartburg, TN 37887",
                    "code": "obed",
                    "desc": "The Obed Wild and Scenic River looks much the same today as it did when the first white settlers strolled its banks in the late 1700s. While meagerly populated due to poor farming soil, the river was a hospitable fishing and hunting area for trappers and pioneers. Today, the Obed stretches along the Cumberland Plateau and offers visitors a variety of outdoor recreational opportunities.",
                    "designation": "Wild & Scenic River",
                    "directions": "The Obed Wild & Scenic River Visitor Center is located at 208 North Maiden Street in downtown Wartburg, Tennessee.\n\nPlease use the link for more information.",
                    "email": "obri_information@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C792DFB-1DD8-B71B-0B5E8EB41685A5BB.jpg",
                    "latitude": 36.1056026036731,
                    "longitude": -84.5979170501232,
                    "name": "Obed Wild & Scenic River",
                    "phone": "(423) 346-6294",
                    "states": [{"id": 210, "name": "TN", "park_code": "obed"}],
                    "url": "https://www.nps.gov/obed/index.htm",
                    "weather": "The weather along the Cumberland Plateau can be best described as unpredictable. Each season brings its own weather patterns. \n\nSummers are generally hot and humid, with high temperatures sometimes eclipsing 90 degrees. The low temperatures in winter often dip below freezing. Spring sees the most amount of precipitation, but rainfall can occur in various amounts throughout the year.",
                },
                {
                    "address": "Rio Grande Wild & Scenic River, 1 Panther Junction, Big Bend National Park, TX 79834",
                    "code": "rigr",
                    "desc": "It is an irresistible playground where unruly rapids check your skills as a canyon wren\u2019s definitive call cascades down ancient limestone cliffs. Below the chasm, the canyon\u2019s raw beauty dances across mirrored water. While the primal nature of the river stirs hunger for spirited adventure, the river is also an undulant ribbon of wetland corridor and, against all odds, the lifeblood of the desert.",
                    "designation": "Wild & Scenic River",
                    "directions": "Hwy 118 south from Alpine; Hwy 385 south from Marathon; FM 170 from Presidio through Study Butte.",
                    "email": "bibe_info@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C8426FF-1DD8-B71B-0B98D6CA5C81BC50.jpg https://www.nps.gov/common/uploads/structured_data/3C842887-1DD8-B71B-0BB8F65C9EBB928E.jpg https://www.nps.gov/common/uploads/structured_data/3C8429D9-1DD8-B71B-0BF22A83419845E5.jpg https://www.nps.gov/common/uploads/structured_data/3C842B92-1DD8-B71B-0BCA4078E79F2F65.jpg https://www.nps.gov/common/uploads/structured_data/3C842E8F-1DD8-B71B-0BA998530F2A2D52.jpg https://www.nps.gov/common/uploads/structured_data/3C842FEA-1DD8-B71B-0B9996D58060FC66.jpg https://www.nps.gov/common/uploads/structured_data/3C84314F-1DD8-B71B-0B9CE8BB06320216.jpg",
                    "latitude": 29.52743158,
                    "longitude": -102.5979169,
                    "name": "Rio Grande Wild & Scenic River",
                    "phone": "(432) 477-2251",
                    "states": [{"id": 623, "name": "TX", "park_code": "rigr"}],
                    "url": "https://www.nps.gov/rigr/index.htm",
                    "weather": "Variable\n-- February-April: High temperatures range from mid-70sF (23C) to low-90sF (32C) with lows from the mid-30sF (2C) to mid-50sF (12C). Cold fronts can bring freezing weather with rain or snow.\n-- May-August: Temperatures are hot and the weather can be stormy. Temperatures over 100F (more than 38C) degrees.\n-- September-January:Temperatures are cooler. The weather can turn cold any time during these months.",
                },
                {
                    "address": "274 River Road, Beach Lake, PA 18405",
                    "code": "upde",
                    "desc": "Canoe through rapids and quiet pools as the Delaware River winds its way through a valley of swiftly changing scenery or fish amid rolling hills and riverfront villages in one of the finest fishing rivers in the northeastern United States. The clean water of the Delaware, the last major undammed river in the eastern United States, supports a healthy ecosystem and offers tranquility and excitement.",
                    "designation": "Scenic & Recreational River",
                    "directions": "See complete directions on Upper Delaware S&RR's webpage.",
                    "email": "upde_interpretation@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/CCDE00F6-1DD8-B71B-0BF8D6AEEFB16FAC.jpg https://www.nps.gov/common/uploads/structured_data/CD123899-1DD8-B71B-0BDDF82BB429114F.jpg https://www.nps.gov/common/uploads/structured_data/CD21EF64-1DD8-B71B-0B7828B4E7DB12A6.jpg https://www.nps.gov/common/uploads/structured_data/CD4534B6-1DD8-B71B-0B3123CAF4EAC62E.jpg https://www.nps.gov/common/uploads/structured_data/CD5A898D-1DD8-B71B-0B14C701B538CF14.jpg https://www.nps.gov/common/uploads/structured_data/CD6C7346-1DD8-B71B-0BC90615DE962D11.jpg",
                    "latitude": 41.66172578,
                    "longitude": -75.03861562,
                    "name": "Upper Delaware Scenic & Recreational River",
                    "phone": "(570) 685-4871",
                    "states": [
                        {"id": 219, "name": "NY", "park_code": "upde"},
                        {"id": 220, "name": "PA", "park_code": "upde"},
                    ],
                    "url": "https://www.nps.gov/upde/index.htm",
                    "weather": "Spring: Temperatures usually range from lows of 26 F to highs of 80 F with average rainfall of 5 inches.\n\nSummer: Temperatures usually range from lows of 55 F to highs of 85 F with average rainfall of 4 inches. \n\nFall: Temperatures usually range from lows of 30 F to highs of 83F. Fall foliage is at its peak sometime in October as daily mountain temperatures vary frequently and influence the change.\n\nWinter: Temperatures usually range from lows of 15 F to highs of 49 F.",
                },
            ],
            "page": 1,
            "total_pages": 130,
        }

    def test_parks_filtering(self):
        r = requests.get(
            'https://api.parkprotection.me/api/parks?results_per_page=3&q={"filters":[{"name":"states__name","op":"any","val":"TX"}]}'
        )
        assert r.status_code == 200
        d = r.json()
        assert d == {
            "num_results": 14,
            "objects": [
                {
                    "address": "37084 Alibates Rd., Potter County, TX 79036",
                    "code": "alfl",
                    "desc": "13,000 years ago this site was already well-known by mammoth hunters as a place to get the best stone for their tools. Centuries passed but the colorful flint found right here in the Texas panhandle never lost its value and usefulness. Visit and gain a sense of how integral this site was to the survival, commerce and culture of the High Plains.",
                    "designation": "National Monument",
                    "directions": 'Alibates Flint Quarries is located approximately 35 miles north of Amarillo, Texas. From I-40 in Amarillo, take Lakeside exit north towards Lake Meredith National Recreation Area. Exit on TX 136 north towards Borger. After about 30 miles, turn west from TX 136 onto Cas Johnson Road. Park Service signs will be visible. Proceed approximately 3 miles to "Y" intersection and bear to right. Go northwest approximately 2 miles to the Alibates Flint Quarries National Monument Visitor Center.',
                    "email": "lamr_interpretation@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C7EFA64-1DD8-B71B-0BD2E6EF7D52B0BF.jpg https://www.nps.gov/common/uploads/structured_data/3C84572F-1DD8-B71B-0B04E3B8365CE1BD.jpg https://www.nps.gov/common/uploads/structured_data/3C8458AC-1DD8-B71B-0B159537D27B805A.jpg https://www.nps.gov/common/uploads/structured_data/3C845A12-1DD8-B71B-0B5DCB73747198EF.jpg https://www.nps.gov/common/uploads/structured_data/3C845BA9-1DD8-B71B-0B63C45334DC3128.jpg",
                    "latitude": 35.5819662,
                    "longitude": -101.6717008,
                    "name": "Alibates Flint Quarries National Monument",
                    "phone": "(806) 857-6680",
                    "states": [{"id": 488, "name": "TX", "park_code": "alfl"}],
                    "url": "https://www.nps.gov/alfl/index.htm",
                    "weather": "The Texas Panhandle experiences a wide variety of weather conditions throughout the year. Winters are cold and windy, and summers are hot and dry. It is usually a good idea to bring a jacket with you if you are planning on hiking to the quarries with a ranger because the mesa gets very windy, even in the summer.",
                },
                {
                    "address": "10477 Highway 90 West, Del Rio, TX 78840",
                    "code": "amis",
                    "desc": "An oasis in the desert, Amistad National Recreation Area consists of the US portion of the International Amistad Reservoir. Amistad, whose name comes from the Spanish word meaning friendship, is best known for excellent water-based recreation, camping, hiking, rock art viewing, and its rich cultural history. Amistad is also home to a wide variety of plant and animal life above and below the water.",
                    "designation": "National Recreation Area",
                    "directions": "Six miles west of the HWY 90 and 277 North intersection.",
                    "email": "amis_interpretation@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C7F0F97-1DD8-B71B-0B2AE2BF68A9390E.jpg https://www.nps.gov/common/uploads/structured_data/3C8057C0-1DD8-B71B-0BDE87CC6BFEBFDE.jpg https://www.nps.gov/common/uploads/structured_data/3C80595D-1DD8-B71B-0BB1CD7674EB437B.jpg https://www.nps.gov/common/uploads/structured_data/3C805B38-1DD8-B71B-0BEB3AAF12CCD190.jpg https://www.nps.gov/common/uploads/structured_data/3C805CD0-1DD8-B71B-0B204F0B8630CEBC.jpg",
                    "latitude": 29.53539777,
                    "longitude": -101.075821,
                    "name": "Amistad National Recreation Area",
                    "phone": "(830) 775-7491",
                    "states": [{"id": 274, "name": "TX", "park_code": "amis"}],
                    "url": "https://www.nps.gov/amis/index.htm",
                    "weather": "Weather in Southwest Texas can change in a matter of minutes. It is best to check the local weather report. \nAmistad National Recreation Area usually has hot summers and mild winters.",
                },
                {
                    "address": "1 Panther Junction, Big Bend National Park, TX 79834",
                    "code": "bibe",
                    "desc": "There is a place in Far West Texas where night skies are dark as coal and rivers carve temple-like canyons in ancient limestone. Here, at the end of the road, hundreds of bird species take refuge in a solitary mountain range surrounded by weather-beaten desert. Tenacious cactus bloom in sublime southwestern sun, and diversity of species is the best in the country. This magical place is Big Bend...",
                    "designation": "National Park",
                    "directions": "Several highways lead to Big Bend National Park: TX 118 from Alpine to Study Butte or FM 170 from Presidio to Study Butte (then 26 miles east to park headquarters) or US 90 or US 385 to Marathon (then 70 miles south to park headquarters). \n\nDistances between towns and services are considerable. Be sure you have plenty of gas, oil, food, and water for your trip.",
                    "email": "bibe_info@nps.gov",
                    "images": "https://www.nps.gov/common/uploads/structured_data/3C84EF64-1DD8-B71B-0B44D9F693CAA78C.jpg https://www.nps.gov/common/uploads/structured_data/3C84F0B8-1DD8-B71B-0BE8B78FCC3B52A3.jpg https://www.nps.gov/common/uploads/structured_data/3C84F209-1DD8-B71B-0B6AA2D4E9522573.jpg https://www.nps.gov/common/uploads/structured_data/3C84F37F-1DD8-B71B-0B1EBFE7049A7274.jpg https://www.nps.gov/common/uploads/structured_data/3C84F4D3-1DD8-B71B-0B2F905EF012D45A.jpg",
                    "latitude": 29.29817767,
                    "longitude": -103.2297897,
                    "name": "Big Bend National Park",
                    "phone": "(432) 477-2251",
                    "states": [{"id": 163, "name": "TX", "park_code": "bibe"}],
                    "url": "https://www.nps.gov/bibe/index.htm",
                    "weather": "Variable\n-- February through April the park abounds with pleasant and comfortable temperatures.\n-- May through August is hot and can also be stormy. Temperatures regularly reach well over 100 degrees in the lower elevations and along the Rio Grande.\n-- September through January temperatures are cooler; the weather can quickly turn cold at any time during these months.",
                },
            ],
            "page": 1,
            "total_pages": 5,
        }

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
        self.assertEqual(
            park["images"],
            "https://www.nps.gov/common/uploads/structured_data/DCB2628F-1DD8-B71B-0BD78D1063069C70.jpg",
        )


if __name__ == "__main__":  # pragma: no cover
    main()
