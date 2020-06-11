#import dependencies 
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time 
import pandas as pd
import re

def scrape_info():

    browser = Browser('chrome', executable_path='/usr/local/bin/chromedriver', headless=False)
    
    #get latest tweet 
    handle = "marswxreport"
    query="InSight"
    
    twitter_url = f'https://twitter.com/{handle}?lang=en'
    
    browser.visit(twitter_url)
    
    time.sleep(3)

    pattern = re.compile(query)

    html_twitter = browser.html
    soup_twitter = bs(html_twitter, 'html.parser')

    tweet = soup_twitter.find('span', text=pattern).text 
    
    #get news title and article
    news_url = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    
    browser.visit(news_url)
    
    time.sleep(3)

    html_news = browser.html
    soup_news = bs(html_news, 'html.parser')

    news_title = soup_news.find('div', class_="list_text").a.text
    news_article = soup_news.find('div', class_="article_teaser_body").text 
    
    #get featured image
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    
    browser.visit(image_url)
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('FULL IMAGE')
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('more info')
    
    time.sleep(3)

    html_image = browser.html
    soup_image = bs(html_image, 'html.parser')

    featured_image = soup_image.find('figure', class_='lede').a["href"]
    
    #get facts table
    facts_url = "https://space-facts.com/mars/"

    facts_table = pd.read_html(facts_url)    

    facts_table = facts_table[0]
    facts_table.columns = ["Property", "Value"]
    
    mars_table = facts_table.to_html()

    facts_table = facts_table.set_index('Property')
    facts_dict = facts_table['Value'].to_dict()

    #get hemisphere images

    #Cerberus
    hemisphere_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    
    browser.visit(hemisphere_url)
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Cerberus Hemisphere Enhanced')
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Open')
    
    time.sleep(3)

    html_cerberus = browser.html
    soup_cerberus = bs(html_cerberus, 'html.parser')

    cerberus_image = soup_cerberus.find('img', class_='wide-image')["src"]

    time.sleep(3)

    #Schiaparelli
    browser.visit(hemisphere_url)
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Schiaparelli Hemisphere Enhanced')
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Open')
    
    time.sleep(3)

    html_schiaparelli = browser.html
    soup_schiaparelli = bs(html_schiaparelli, 'html.parser')

    schiaparelli_image = soup_schiaparelli.find('img', class_='wide-image')["src"]

    time.sleep(3)

    #Syrtis Major
    browser.visit(hemisphere_url)
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Syrtis Major Hemisphere Enhanced')
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Open')
    
    time.sleep(3)

    html_syrtismajor = browser.html
    soup_syrtismajor = bs(html_syrtismajor, 'html.parser')

    syrtismajor_image = soup_syrtismajor.find('img', class_='wide-image')["src"]

    time.sleep(3)

    #Valles Marineris
    browser.visit(hemisphere_url)
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Valles Marineris Hemisphere Enhanced')
    
    time.sleep(3)
    
    browser.click_link_by_partial_text('Open')
    
    time.sleep(3)

    html_vallesmarineris = browser.html
    soup_vallesmarineris = bs(html_vallesmarineris, 'html.parser')

    vallesmarineris_image = soup_vallesmarineris.find('img', class_='wide-image')["src"]

    #store data in a dictionary
    results = {
        'news_title': news_title,
        'news_article': news_article,
        'tweet': tweet,
        'mars_table': mars_table,
        'featured_image': f"https://www.jpl.nasa.gov{featured_image}",
        'cerberus_image': f"https://astrogeology.usgs.gov{cerberus_image}",
        'schiaparelli_image': f"https://astrogeology.usgs.gov{schiaparelli_image}",
        'syrtismajor_image': f"https://astrogeology.usgs.gov{syrtismajor_image}",
        'vallesmarineris_image': f"https://astrogeology.usgs.gov{vallesmarineris_image}"
    }
    
    mars_results = {**results, **facts_dict}
    
    #close the browser
    browser.quit()
    
    return mars_results
