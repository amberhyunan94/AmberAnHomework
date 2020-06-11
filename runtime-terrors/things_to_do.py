def things_to_do():
    browser = Browser('chrome', headless=False)

    TBD 
    
    # usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    # browser.visit(usgs_url)
    # usgs_html = browser.html
    # usgs_soup = bs(usgs_html, 'html.parser')

    # hemisphere_image_list = []
    # hemisphere_titles = []
    # hemisphere_urls = []
    # results = usgs_soup.find('div', class_='result-list')

    # # iterates through hemispheres
    # for hemisphere in results.find_all('div', class_='item'):
    #     for title in hemisphere.find_all('h3'):
    #         hemisphere_titles.append(title.text.replace(' Enhanced', ''))
    #     for url in hemisphere.find_all(class_='description'):
    #         hemisphere_urls.append(url.a["href"])
    #         hemisphere_urls_cleaned= ["https://astrogeology.usgs.gov" + url for url in hemisphere_urls]

    # for click in hemisphere_urls_cleaned:
    #     time.sleep(5)
    #     browser = Browser('chrome', headless=False)
    #     clickurl = click
    #     browser.visit(clickurl)
    #     click_html = browser.html
    #     click_soup = bs(click_html, 'html.parser')
    #     click_div = click_soup.find('div', class_='download')
    #     hemisphere_image_list.append(click_soup.find("img", class_="wide-image")["src"])
    #     hemisphere_image_list_cleaned = ["https://astrogeology.usgs.gov" + url for url in hemisphere_image_list]
    #     return hemisphere_image_list_cleaned
