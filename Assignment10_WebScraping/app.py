
from flask import Flask, jsonify, redirect, render_template
import pymongo
# from pymongo import MongoClient
#from scrape_mars import scrape
import scrape_mars

client = pymongo.MongoClient('mongodb://localhost:27017/')

app = Flask(__name__)

db = client.mars_data_DB
mars_collection = db.mars_collection


@app.route("/")
def render_index():
    # Error handler for missing collection
    try:
        mars_find =  mars_collection.find_one()

        # Distributes data from collection
        news_title = mars_find['news_data']['news_titles']
        paragraph_text = mars_find['news_data']['paragraphs']
        featured_image_url = mars_find['img_list']
        mars_weather_tweet = mars_find['weather_info_list']
        mars_facts_table = mars_find['facts_df']
        hemisphere_title_1 = mars_find['hemisphere_titles'][0]
        hemisphere_img_1 = mars_find['hemisphere_image_list_cleaned'][0]
        hemisphere_title_2 = mars_find['hemisphere_titles'][1]
        hemisphere_img_2 = mars_find['hemisphere_image_list_cleaned'][1]
        hemisphere_title_3 = mars_find['hemisphere_titles'][2]
        hemisphere_img_3 = mars_find['hemisphere_image_list_cleaned'][2]
        hemisphere_title_4 = mars_find['hemisphere_titles'][3]
        hemisphere_img_4 = mars_find['hemisphere_image_list_cleaned'][3]
    except (IndexError, TypeError) as error_handler:

        # Missing collection; clears fields
        news_title = ""
        paragraph_text_1 =""
        paragraph_text_2 = ""
        featured_image_url = ""
        mars_weather_tweet = ""
        mars_facts_table = ""
        hemisphere_title_1 = ""
        hemisphere_img_1 = ""
        hemisphere_title_2 = ""
        hemisphere_img_2 = ""
        hemisphere_title_3 = ""
        hemisphere_img_3 = ""
        hemisphere_title_4 = ""
        hemisphere_img_4 = ""

    # ------------------------------------------------------------------------
    # Renders template to index.html
    # ------------------------------------------------------------------------
    return render_template("index.html", news_title=news_title,\
                                         paragraph_text_1=paragraph_text,\
                                         featured_image_url=featured_image_url,\
                                         mars_weather_tweet=mars_weather_tweet,\
                                         mars_facts_table=mars_facts_table,\
                                         hemisphere_title_1=hemisphere_title_1,\
                                         hemisphere_img_1=hemisphere_img_1,\
                                         hemisphere_title_2=hemisphere_title_2,\
                                         hemisphere_img_2=hemisphere_img_2,\
                                         hemisphere_title_3=hemisphere_title_3,\
                                         hemisphere_img_3=hemisphere_img_3,\
                                         hemisphere_title_4=hemisphere_title_4,\
                                         hemisphere_img_4=hemisphere_img_4)

# --------------------------------------------------------------------------
# Initializes scrape route; inserts results into  mars_data_DB in MongoDB
# --------------------------------------------------------------------------
@app.route('/scrape')
def scrape_mars_data():
    scrape_results = scrape_mars.scrape()
    mars_collection.replace_one({}, scrape_results, upsert=True)
    return redirect('http://localhost:5000/', code=302)

if __name__ == '__main__':
    app.run()