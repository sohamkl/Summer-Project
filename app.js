//Core modules
const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');
const events = require('events');
//custom modules
const replaceHtml = require('./Modules/replaceHtml');
const user = require('./Modules/user');
/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please enter name: ", (name) => {
    console.log("You entered: "+name);
    rl.close();
})

rl.on('close', () => {
    console.log("Interface closed");
    process.exit(0);
})



let textIn = fs.readFileSync('input.txt','utf-8');
console.log(textIn);

let content = `Data read from input.txt: ${textIn}. \nDate created ${new Date()}`;
fs.writeFileSync('output.txt', content);



fs.readFile('start.txt', 'utf-8', (error1, data1) => {
    console.log(data1)
    fs.readFile(`${data1}.txt`, 'utf-8', (error2, data2) => {
        console.log(data2);
        fs.readFile('append.txt', 'utf-8', (error3, data3) => {
            console.log(data3);
            fs.writeFile('output.txt', `${data2}\n\n${data3}\n\nDate created ${new Date()}`, () =>{
                console.log('File written success');
            });    
        })
    })
})

console.log('Reading file...');
*/
const html = fs.readFileSync('./Template/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');



//Creating a simple web server

//Step1: create server
// const server = http.createServer((request, response) => {
    
//     let {query:query, pathname: path} = url.parse(request.url, true)
//     //console.log(x);
//     //let path = request.url;

const server = http.createServer();

server.on('request', (request, response) => {
    let {query:query, pathname: path} = url.parse(request.url, true)
    //console.log(x);
    //let path = request.url;
    
    if (path === '/' || path.toLocaleLowerCase() ==='/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You Are In Home Page'));
    } else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You Are In About Page'));
    
    } else if(path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You Are In Contacts Page'));

    } else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){
            let productHtmlArray = products.map((prod) => {               
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(productResponseHtml);

        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }
         
    } else {
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'ERROR 404: Page not found!'));
    }
})
//Step2: Start the server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server has started');
})

//Emitting and handling events
// let myEmitter = new user();

// myEmitter.on('userCreated', (id, name) => {
//     console.log(`A new user ${name} with ID ${id} is created!`);
// })

// myEmitter.on('userCreated', (id, name) => {
//     console.log(`A new user ${name} with ID ${id} is added to the database!`);
// })

// myEmitter.emit('userCreated', 101, 'John');

// server.on('request', (req, res) => {
//     fs.readFile('output.txt', (err, data) =>{
//         if (err){
//             res.end('Something went wrong');
//         }
//         res.end(data);
//     })
// })