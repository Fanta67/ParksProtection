#!/usr/bin/python3

"""
    parse.py

    MediaWiki API Demos
    Demo of `Parse` module: Parse content of a page

    MIT License
"""

import requests
import re

def wiki_search(search):
    S = requests.Session()

    URL = "https://en.wikipedia.org/w/api.php"

    # do a get request first

    # put name of what you want to search for in SEARCHPAGE

    SEARCHPAGE = search

    PARAMS = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": SEARCHPAGE
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()
    if (len(DATA['query']['search']) == 0):
        return "Page not found on wikipedia"

    # use the first result as the page for a parse

    PARAMS = {
        "action": "parse",
        "page": DATA['query']['search'][0]['title'],
        "format": "json",
        "prop": "wikitext"
    }

    R = S.get(url=URL, params=PARAMS)
    DATA = R.json()

    pagetext = DATA["parse"]["wikitext"]["*"]

    try:
        # remove speciesbox
        paragraph = re.sub('({{(.|\n)+?}}\n)', '', pagetext, 1)
        paragraph = re.search('(\'\'\'(.+\n+)+?(==))', paragraph).group()
        # remove next paragraph header
        paragraph = re.sub('(==)', '', paragraph)
        # parse and remove tags
        paragraph = re.sub('(<.+?>)', '<<<', paragraph)
        paragraph = re.sub('(<<<(.|\n)+?<<<)', '', paragraph)
        paragraph = re.sub('<<<', '', paragraph)
        # remove quotes and brackets
        paragraph = re.sub('\[', '', paragraph)
        paragraph = re.sub('\]', '', paragraph)
        paragraph = re.sub('\'', '', paragraph)
        # parse unclean bracket matching
        paragraph = re.sub('((.|\n)+?}}\n)', '', paragraph)
        #remove citation links
        paragraph = re.sub('({{(c|C)ite.+?}})', '', paragraph)
        paragraph = re.sub('(\|.+(\n|.))', '', paragraph)
        print(paragraph)
        if (paragraph == "") :
            return "Parsing error. View wikipedia page titled " + PARAMS["page"]
        return paragraph
    except AttributeError: 
        return "Parsing error. View wikipedia page titled " + PARAMS["page"]

# Animal pages tend to have a "The " that will get parsed out by the regex. We can add this in manually if we know we're searching an animal.

