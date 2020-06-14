const express = require("express") /* solicitando e inicializando o express */
const server = express() /* executando o express num objeto (server) */

const db = require("./database/db") /* pegar o banco de dados */

//Configurar pasta publica
server.use(express.static("public"))

//Habilitar req.body
server.use(express.urlencoded({extended: true}))


//Utilizando template nunjucks
const nunjucks = require("nunjucks") /* solicitando e inicializando o nunjucks */
//primeiro parametro: qual pasta
//segundo argumento: um objeto (qual o servidor e desativando o cache temporariamente)
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


//Configurar caminhos da aplicação
//req: requisição
//res: resposta
//dirname: retorna o diretorio atual
server.get("/", function(req, res){
    return res.render("index.html")
})

server.get("/create-point", function(req, res){

    //req.query: query string da url

    return res.render("create-point.html")
})

server.post("/savepoint", function(req, res){

    //req.body: corpo do formulario
    //console.log(req.body)

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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        
        console.log("Cadastrado com sucesso")
        console.log(this) 
        //this esta referenciando a resposta da função

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", function(req, res){

    //req.query: query string da url
    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if (err) {
            return console.log(err)
        }
    
        const total  = rows.length

        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    })
})



//Ligar servidor
server.listen(3000) /* ouve a porta 3000 */


