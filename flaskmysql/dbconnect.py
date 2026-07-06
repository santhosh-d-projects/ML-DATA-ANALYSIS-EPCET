from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="info123",
    database="student"
)

cursor = db.cursor(dictionary=True)


@app.route('/students', methods=['GET'])
def get_students():
    cursor.execute("SELECT * FROM record")
    students = cursor.fetchall()
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)