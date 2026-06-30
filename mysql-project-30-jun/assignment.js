const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "info123"     
});


con.connect(function(err){

    if(err) throw err;

    console.log("Connected!");


    con.query("CREATE DATABASE IF NOT EXISTS appon", function(err){

        if(err) throw err;

        console.log("Database Created");

        
        con.changeUser({database:"appon"}, function(err){

            if(err) throw err;
            let sql = `
            CREATE TABLE IF NOT EXISTS alia(
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20),
                address VARCHAR(20)
            )`;

            con.query(sql,function(err){

                if(err) throw err;

                console.log("Table Created");

                
                sql = `INSERT INTO alia(name,address)
                VALUES
                ('Sanjay','New Delhi'),
                ('Maya','Mysore'),
                ('Sanju','Bangalore'),
                ('Manju','Mangalore')`;

                con.query(sql,function(err){

                    if(err) throw err;

                    console.log("Records Inserted");

                  
                    con.query("SELECT * FROM alia",function(err,result){

                        if(err) throw err;

                        console.log(result);

                        // Select One Record
                        con.query("SELECT * FROM alia WHERE id=1",function(err,result){

                            if(err) throw err;

                            console.log(result);

                            // Delete Record
                            con.query("DELETE FROM alia WHERE id=2",function(err,result){

                                if(err) throw err;

                                console.log("Record Deleted");

                                // Add Column
                                con.query("ALTER TABLE alia ADD phone_number BIGINT",function(err){

                                    if(err) throw err;

                                    console.log("New Column Added");

                                    // Drop Column
                                    con.query("ALTER TABLE alia DROP COLUMN phone_number",function(err){

                                        if(err) throw err;

                                        console.log("Column Dropped");

                                        // Update Record
                                        con.query("UPDATE alia SET name='Mamtha' WHERE id=3",function(err){

                                            if(err) throw err;

                                            console.log("Record Updated");

                                            // Drop Primary Key
                                            con.query("ALTER TABLE alia DROP PRIMARY KEY",function(err){

                                                if(err)
                                                    console.log("Primary key cannot be dropped because AUTO_INCREMENT depends on it.");
                                                else
                                                    console.log("Primary Key Dropped");

                                                // Drop Table
                                                con.query("DROP TABLE alia",function(err){

                                                    if(err) throw err;

                                                    console.log("Table Dropped");

                                                    con.end();

                                                });

                                            });

                                        });

                                    });

                                });

                            });

                        });

                    });

                });

            });

        });

    });

});