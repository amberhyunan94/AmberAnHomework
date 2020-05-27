# import dependencies
import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
import time
import re

def scrape():

    mars_data = {}

    mars_data["news_data"] = marsNewsData()

    mars_data["img_list"] = marsFeaturedImageURL()

    mars_data["weather_info_list"] = marsWeather()

    mars_data["facts_df"] = marsFacts()

    mars_data["hemisphere_image_list_cleaned"] = marsHemisphereImageURLs()

    return mars_data
    print(mars_data)



# --------------------------------------------------------------------------

def marsNewsData():
    news_data = {}
    news_titles=[]
    paragraphs = []

    #making url
    base_url = "https://mars.nasa.gov/"
    #url to actually scrape title & paragraph
    nasa_url = "https://mars.nasa.gov/news/"
    response_1 = requests.get(nasa_url) 
    nasa_soup = bs(response_1.text, 'html.parser')

    #getting alll titles
    for title in nasa_soup.find_all(class_="content_title"):
        news_titles.append(title.find('a').get_text().strip())
    #getting all paragraphs
    for content in nasa_soup.find_all(class_="rollover_description_inner"):
        paragraphs.append(content.get_text().strip())

    news_data = {news_titles[i]: paragraphs[i] for i in range(len(news_titles))} 

    return news_data
    
    
# --------------------------------------------------------------------------

def marsFeaturedImageURL():
    #import splinter & use chromedriver to get the images
    from splinter import Browser
    #!which chromedriver

    #explore jpl site
    executable_path = {"executable_path": "chromedriver"}
    browser = Browser("chrome", **executable_path, headless=False)
    imageurl = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(imageurl)    

    html = browser.html 
    soup = bs(html, 'html.parser')
    img_list = []
    for x in range(10):
        #find images
        for image in soup.find_all('div',class_="img"):
            img_list.append(image.find('img').get('src'))
            img_list = [k for k in img_list if 'wallpaper' in k]
        try:
            browser.find_by_text('MORE')
        except:
            print(f'{x} Pages Loaded')
    
    def prepend(list, str): 
        
        # Using format() 
        str += '{0}'
        list = [str.format(i) for i in list] 
        return(list)

    urlbuilder = 'https://photojournal.jpl.nasa.gov/jpeg'
    list = img_list
    str = urlbuilder
    img_list = prepend(list, str)


    return img_list 

# --------------------------------------------------------------------------

def marsWeather(): 
    browser = Browser('chrome', headless=False)                                  
    twitter_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(twitter_url)
    time.sleep(10)
    twitter_html = browser.html
    soup = bs(twitter_html, 'html.parser')
    weather_info_list = []

    mars_weather = soup.find_all('span', text=re.compile("InSight sol"))
    for weather in soup.find_all('span', text=re.compile("InSight sol")):
        weather_info_list.append(weather.text)

    return weather_info_list

# --------------------------------------------------------------------------

def marsFacts():
    facts_url = 'https://space-facts.com/mars/'
    facts = pd.read_html(facts_url)
    facts_df = facts[0]
    facts_df.columns = ['Description','Value']
    facts_df

    return facts_df
# --------------------------------------------------------------------------

def marsHemisphereImageURLs():
    browser = Browser('chrome', headless=False)
    usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(usgs_url)
    usgs_html = browser.html
    usgs_soup = bs(usgs_html, 'html.parser')

    hemisphere_image_list = []
    hemisphere_titles = []
    hemisphere_urls = []
    results = usgs_soup.find('div', class_='result-list')

    # iterates through hemispheres
    for hemisphere in results.find_all('div', class_='item'):
        for title in hemisphere.find_all('h3'):
            hemisphere_titles.append(title.text.replace(' Enhanced', ''))
        for url in hemisphere.find_all(class_='description'):
            hemisphere_urls.append(url.a["href"])
            hemisphere_urls_cleaned= ["https://astrogeology.usgs.gov" + url for url in hemisphere_urls]

    for click in hemisphere_urls_cleaned:
        time.sleep(5)
        browser = Browser('chrome', headless=False)
        clickurl = click
        browser.visit(clickurl)
        click_html = browser.html
        click_soup = bs(click_html, 'html.parser')
        click_div = click_soup.find('div', class_='download')
        hemisphere_image_list.append(click_soup.find("img", class_="wide-image")["src"])
        hemisphere_image_list_cleaned = ["https://astrogeology.usgs.gov" + url for url in hemisphere_image_list]
        return hemisphere_image_list_cleaned

if __name__ == "__main__":
    print(scrape())


        