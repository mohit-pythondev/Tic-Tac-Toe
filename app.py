from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'your_default_secret_key')
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tictactoe'
mongo = PyMongo(app)

@app.route('/')
def index():
    if 'username' in session:
        user = mongo.db.users.find_one({'username': session['username']})
        return render_template('index.html', username=session['username'], wins=user.get('wins', 0), opponent_wins=user.get('opponent_wins', 0))
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = generate_password_hash(request.form['password'])
        if mongo.db.users.find_one({'username': username}):
            return 'Username already exists!'
        mongo.db.users.insert_one({'username': username, 'password': password, 'wins': 0, 'opponent_wins': 0})
        session['username'] = username
        return redirect(url_for('index'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = mongo.db.users.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            session['username'] = username
            return redirect(url_for('index'))
        return jsonify({'error': 'Invalid username or password!'}), 400
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/update_wins', methods=['POST'])
def update_wins():
    user = mongo.db.users.find_one({'username': session['username']})
    if user:
        data = request.get_json()
        winner = data.get('winner')
        if winner == 'X':
            mongo.db.users.update_one({'username': session['username']}, {'$inc': {'wins': 1}})
        if winner == 'O':
            mongo.db.users.update_one({'username': session['username']}, {'$inc': {'opponent_wins': 1}})
        user = mongo.db.users.find_one({'username': session['username']})
        return jsonify({
            'wins': user.get('wins', 0),
            'opponent_wins': user.get('opponent_wins', 0)
        })
    return jsonify({'error': 'User not found'}), 404

@app.route('/get_initial_wins', methods=['GET'])
def get_initial_wins():
    user = mongo.db.users.find_one({'username': session['username']})
    if user:
        return jsonify({
            'wins': user.get('wins', 0),
            'opponent_wins': user.get('opponent_wins', 0)
        })
    return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
