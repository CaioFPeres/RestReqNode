const fs = require('fs');
const http = require('http');
const url = require('url');


const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer( async (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const requestUrl = url.parse(req.url);
    let completePath = requestUrl.pathname;
    let path = completePath.split('/').slice(1)[0];

    let fileContent;

    if(path == "")
        path = "index.html";

    else if(path == "get_version"){

        // recebendo dados
        /*
        
        let data = "";

        req.on("data", datachunk => {
            data = data + datachunk;
        });

        req.on("end", () => {   
            //recebeu os dados do request

        });
        */

        //pega arquivo que está escrita a versão
        let version = fs.readFileSync("version");

        //mandar informações pra quem fez o request e finalizar a requisição
        res.end(version + "\n");

        return;
    }

    try{
        fileContent = fs.readFileSync(path);
        res.end(fileContent, 'utf-8');
    }
    catch(err){
        console.log("Arquivo não encontrado: " + path);
        if(path != "favicon.ico"){
            res.statusCode = 404;
            fileContent = fs.readFileSync("404.html");
            res.end(fileContent);
        }
    }


});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
