from selenium import webdriver
from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.support.ui import Select #I'm not sure if you need this line or not
import time
import unittest

class GUITests(unittest.TestCase):

    def setUp(self) :
        self.driver = webdriver.Chrome(executable_path='./chromedriver')
        time.sleep(3)

    def test_get_started(self): #1
        self.driver.get("https://www.parkprotection.me")
        button_name = self.driver.find_element_by_link_text('Get Started')

        button_name.click()

        time.sleep(3)
        expected_result = 'Parks'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
    
    def test_navbar_parks(self): #2
        self.driver.get("https://www.parkprotection.me")
        button_name = self.driver.find_element_by_link_text('Parks')

        button_name.click()

        time.sleep(3)
        expected_result = 'Parks'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
    
    def test_navbar_plants(self): #3
        self.driver.get("https://www.parkprotection.me")
        button_name = self.driver.find_element_by_link_text('Plants')

        button_name.click()

        time.sleep(3)
        expected_result = 'Plants'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_navbar_animals(self): #4
        self.driver.get("https://www.parkprotection.me")
        button_name = self.driver.find_element_by_link_text('Animals')

        button_name.click()

        time.sleep(3)
        expected_result = 'Animals'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_navbar_about(self): #5
        self.driver.get("https://www.parkprotection.me")
        button_name = self.driver.find_element_by_link_text('About')

        button_name.click()

        time.sleep(3)
        expected_result = 'ABOUT US'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
       
    def test_park_card(self): #6
        self.driver.get("https://www.parkprotection.me/Parks")
        time.sleep(3)
        button_name = self.driver.find_element_by_class_name('abli')

        button_name.click()
        time.sleep(3)

        
        expected_result = 'Abraham Lincoln Birthplace National Historical Park'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)

    def test_plants_card(self): #7
        self.driver.get("https://www.parkprotection.me/Plants")
        time.sleep(3)
        button_name = self.driver.find_element_by_class_name('1583')

        button_name.click()
        time.sleep(3)
        
        expected_result = 'Agate Desertparsley'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
    
    def test_animals_card(self): #8
        self.driver.get("https://www.parkprotection.me/Animals")
        time.sleep(3)
        button_name = self.driver.find_element_by_class_name('6956')

        button_name.click()
        time.sleep(3)
        
        expected_result = 'Alabama beach mouse'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)

    def test_animals_related_parks(self): #9
        self.driver.get("https://www.parkprotection.me/Animals/32")
        time.sleep(3)
        button_name = self.driver.find_element_by_link_text('Big Cypress National Preserve')

        button_name.click()
        time.sleep(3)
        
        expected_result = 'Big Cypress National Preserve'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)

    def test_plants_related_parks(self): #10
        self.driver.get("https://www.parkprotection.me/Plants/104")
        time.sleep(3)
        button_name = self.driver.find_element_by_link_text('Alibates Flint Quarries National Monument')

        button_name.click()
        time.sleep(3)
        
        expected_result = 'Alibates Flint Quarries National Monument'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)

    def test_parks_search(self): #11
        self.driver.get("https://www.parkprotection.me/Parks/search")
        time.sleep(3)
        expected_result = 'Results'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text
        
        self.assertEqual(expected_result, actual_result)
        
    def test_animals_search(self): #12
        self.driver.get("https://www.parkprotection.me/Animals/search")
        time.sleep(3)
        expected_result = 'Results'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text
        
        self.assertEqual(expected_result, actual_result)
        
    def test_plants_search(self): #13
        self.driver.get("https://www.parkprotection.me/Plants/search")
        time.sleep(3)
        expected_result = 'Results'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text
        
        self.assertEqual(expected_result, actual_result)
        
    def test_parks_search_results_1(self): #14
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
        
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('zion')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('zion')
        button_name.click()
        time.sleep(3)
        
        expected_result = 'Zion National Park'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_parks_search_results_2(self): #15
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
        
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('river')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('biso')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Big South Fork National River & Recreation Area'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_parks_search_results_3(self): #16
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('texas')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('bibe')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Big Bend National Park'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_animals_search_results_1(self): #17
        self.driver.get("https://www.parkprotection.me/Animals/search/")
        time.sleep(3)
        
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('wolf')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('37')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Red wolf'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_animals_search_results_2(self): #18
        self.driver.get("https://www.parkprotection.me/Animals/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('eagle')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('1626')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Bald eagle'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_animals_search_results_3(self): #19
        self.driver.get("https://www.parkprotection.me/Animals/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('turtle')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('451')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Plymouth Redbelly Turtle'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_plants_search_results_1(self): #20
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('blazing')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('4582')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Ash Meadows Blazingstar'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_plants_search_results_2(self): #21
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2')
        search_bar.send_keys('primrose')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('5970')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Antioch Dunes Evening Primrose'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)
        
    def test_plants_search_results_3(self): #22
        self.driver.get("https://www.parkprotection.me/Parks/search/")
        time.sleep(3)
                
        search_bar = self.driver.find_element_by_class_name('mr-sm-2 form-control')
        search_bar.send_keys('thistle')
        search_button = self.driver.find_element_by_class_name('searchButton')
        search_button.click()
        time.sleep(3)
        
        button_name = self.driver.find_element_by_class_name('2369')
        button_name.click()
        time.sleep(3)

        
        expected_result = 'Suisun Thistle'
        actual_result = self.driver.find_element_by_class_name('PageHeader').text

        self.assertEqual(expected_result, actual_result)

    def tearDown(self) :
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
#parks 44pgs, plants 43pgs, animals 58pgs
