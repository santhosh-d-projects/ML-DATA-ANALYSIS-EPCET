const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log("Connected Successfully!");

        const db = client.db("company");

        // =========================
        // Employee Collection
        // =========================
        const employee = db.collection("employee");

        await employee.deleteMany({});

        await employee.insertMany([
            {
                emp_name: "harika",
                emp_age: 23,
                job_role: "seller",
                salary: 20000
            },
            {
                emp_name: "teja",
                emp_age: 18,
                job_role: "store assistant",
                salary: 10000
            },
            {
                emp_name: "megha",
                emp_age: 25,
                job_role: "senior cashier",
                salary: 45000
            },
            {
                emp_name: "vijay",
                emp_age: 30,
                job_role: "store associate",
                salary: 30000
            }
        ]);

        console.log("\n===== Employee Collection =====");
        console.log(await employee.find().toArray());



        // =========================
        // Inventory Collection
        // =========================
        const inventory = db.collection("inventory");

        await inventory.deleteMany({});

        await inventory.insertMany([
            {
                item: "Pencil",
                price: 10,
                quantity: 100,
                category: "Stationery",
                producer: "Natraj"
            },
            {
                item: "Pen",
                price: 5,
                quantity: 150,
                category: "Stationery",
                producer: "Cello"
            },
            {
                item: "Eraser",
                price: 8,
                quantity: 200,
                category: "Stationery",
                producer: "Apsara"
            },
            {
                item: "Sharpener",
                price: 7,
                quantity: 50,
                category: "Stationery",
                producer: "Camlin"
            }
        ]);

        console.log("\n===== Inventory Collection =====");
        console.log(await inventory.find().toArray());



        // =========================
        // Scores Collection
        // =========================
        const scores = db.collection("scores");

        await scores.deleteMany({});

        await scores.insertMany([
            {
                test_answer: 100.66,
                test_answer2: 66
            },
            {
                test_answer: 42.8,
                test_answer2: 40.35
            },
            {
                test_answer: 133.33,
                test_answer2: 133
            },
            {
                test_answer: 23,
                test_answer2: 23
            }
        ]);

        console.log("\n===== Scores Collection =====");
        console.log(await scores.find().toArray());



        // =========================
        // Prices Collection
        // =========================
        const prices = db.collection("prices");

        await prices.deleteMany({});

        await prices.insertMany([
            {
                name: "soap",
                period: 1,
                daily_sales: [20, 30, 24, 14, 10]
            },
            {
                name: "pen",
                period: 4,
                daily_sales: [130, 100]
            },
            {
                name: "tooth paste",
                period: 3,
                daily_sales: [101, 150]
            },
            {
                name: "super pen",
                period: 1,
                daily_sales: [65, 80, 100, 198, 74, 276, 300]
            }
        ]);

        console.log("\n===== Prices Collection =====");
        console.log(await prices.find().toArray());

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();