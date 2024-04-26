import mysql from "mysql2/promise"

const connection= mysql.createPool({
    host: "185.232.14.52",
    user: "u898129453_sonama",
    password: "Anhem12!",
    database: "u898129453_portal",
})

export default connection