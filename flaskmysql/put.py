from flask import Flask, request, jsonify

app = Flask(__name__)

students = [
    {"id": 1, "name": "Raj", "age": 21},
    {"id": 2, "name": "Ravi", "age": 22}
]

@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()

    for student in students:
        if student["id"] == id:
            student["name"] = data["name"]
            student["age"] = data["age"]

            return jsonify({
                "message": "Student updated successfully",
                "student": student
            })

    return jsonify({"message": "Student not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)