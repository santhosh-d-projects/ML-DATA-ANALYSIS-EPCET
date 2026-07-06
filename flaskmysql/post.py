from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="info123",
    database="student"
)

cursor = db.cursor()

# POST Method
@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()

    sql = "INSERT INTO record (id, name, age, sex) VALUES (%s, %s, %s, %s)"
    values = (
        data["id"],
        data["name"],
        data["age"],
        data["sex"]
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({"message": "Student added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)