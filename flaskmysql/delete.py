from flask import Flask, jsonify

app = Flask(__name__)

students = [
    {"id": 1, "name": "Raj", "age": 21},
    {"id": 2, "name": "Ravi", "age": 22}
]

@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    for student in students:
        if student["id"] == id:
            students.remove(student)
            return jsonify({"message": "Student deleted successfully"})

    return jsonify({"message": "Student not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)