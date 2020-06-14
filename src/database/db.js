// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() /* verbose serve para aparecer msgs no terminal */ 

//Criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//Exportar o arquivo
module.exports = db

//Utilizar o objeto banco de dados
/*
db.serialize(() => {
    
    //Criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 200",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas",
    ]

    function afterInsertData(err){
        if (err) {
            return console.log(err)
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this) 
        //this esta referenciando a resposta da função
    }

    //db.run(query, values, afterInsertData)


    //Consultar dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros:")
        console.log(rows)
    })

    //Deletar dados
    db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletados com sucesso")
    })

})
*/

