from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from fuzzywuzzy import process

import numpy as np
import pandas as pd

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
CORS(app)


@app.route('/api/media/rs-movie', methods=['GET', 'POST'])
@cross_origin()
def receive_title():
    data = request.json
    # print(data, type(data))
    # return data
    print(data['original_title'])
    print(recommend_engine(data['original_title']))
    print(type(recommend_engine(data['original_title'])))
    # print(recommend_top_rated())
    top10_rs = recommend_engine(data['original_title']).to_list() # convert result from 'pandas.core.series.Series' to array 
    return jsonify(top10_rs)

def recommend_engine(title):
    df1 = pd.read_csv('./tmdb_5000_credits.csv')
    df2 = pd.read_csv('./tmdb_5000_movies.csv')

    df1.columns = ['id', 'tittle', 'cast', 'crew']
    df = df2.merge(df1, on='id')
    '''
      df.columns 
      ['budget', 'genres', 'homepage', 'id', 'keywords', 'original_language',
       'original_title', 'overview', 'popularity', 'production_companies',
       'production_countries', 'release_date', 'revenue', 'runtime',
       'spoken_languages', 'status', 'tagline', 'title', 'vote_average',
       'vote_count', 'tittle', 'cast', 'crew']
    '''
    tfidf = TfidfVectorizer(stop_words='english')
    df['overview'] = df['overview'].fillna('')
    tfidf_matrix = tfidf.fit_transform(df['overview'])

    cosin_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices = pd.Series(df.index, index=df['title']).drop_duplicates()

    def pred(title, cosin_matrix=cosin_sim):
        idx = process.extractOne(title, df['title'])[2]
        sim_scores = list(enumerate(cosin_matrix[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:11]
        movie_indices = [i[0] for i in sim_scores]
        movie_ratings = [i[1] for i in sim_scores]
        topMovies = df['id'].iloc[movie_indices]
        # topMovies['Score'] = movie_ratings
        return topMovies # mediaIds - type <class 'pandas.core.series.Series'>

    return pred(title)

def recommend_top_rated():
    df1 = pd.read_csv('./tmdb_5000_credits.csv')
    df2 = pd.read_csv('./tmdb_5000_movies.csv')

    df1.columns = ['id', 'tittle', 'cast', 'crew']
    df = df2.merge(df1, on='id')

    c = df['vote_average'].mean()
    m = df['vote_count'].quantile(0.95)
    qualified_movies = df.copy().loc[df['vote_count'] >= m]

    def weighted_rating(x):
        v = x['vote_count']
        r = x['vote_average']
        return (v / (v + m) * r) + (m / (v + m) * c)

    qualified_movies['score'] = qualified_movies.apply(weighted_rating, axis=1)

    qualified_movies = qualified_movies.sort_values('score', ascending=False)

    # Print the top 10 movies
    qualified_movies[['id', 'title', 'vote_count', 'vote_average', 'score']].head(10)

    return qualified_movies['id'].head(10)

@app.route('/api/rs')
@cross_origin()
def get_title():
    data = recommend_engine(receive_title())
    return jsonify(data)

@app.route('/')
def index():
    return 'ok'

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port = 5000)