from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
CORS(app)


@app.route('/api/media', methods=['GET', 'POST'])
@cross_origin()
def receive_title():
    # data = request.form
    data = request.json
    print(data)
    return data


@app.route('/')
def index():
    return 'ok'


if __name__ == '__main__':
    app.run()