// Importa o módulo do Express Framework

const express = require('express')

// Inicializa um objeto de aplicação Express

const app = express()

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

app.use(express.json());

// //realiza log da requisição
app.get('*', function(req, res, next){
    console.log(new Date().toLocaleString(), req.method, req.path )
    next()
})

// Cria um manipulador da rota padrão

app.get('/', function (req, res) {

    res.send('Hello World')

})

//Lista produtos

app.get('/produtos', function (req, res) {

    res.json(lista_produtos);

})

//Lista produto por id

app.get('/produtos/:id', function (req, res) {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
    if (idx > -1) {
        res.json(lista_produtos.produtos[idx]);
    } else {
        res.status(404).json({
            message: "Produto não encontrado"
        })
    }
})

//Cria novo produto

app.post('/produtos', function (req, res){
    lista_produtos.produtos.push(req.body);
    res.status(200).json({
        message: "Produto cadastrado com sucesso",
        lista_produtos
    })
})

//Atualiza produto

app.put('/produtos/:id', function (req, res) {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
    if (idx > -1) {
        lista_produtos.produtos[idx] = req.body;
        res.status(200).json({
            message: `Produto ${id} alterado com sucesso`,
            lista_produtos
        })
    } else {
        res.status(404).json({
            message: "Produto não encontrado"
        })
    }
})

//Deleta produto

app.delete('/produtos/:id', function (req, res) {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
    if (idx > -1) {
        lista_produtos.produtos.splice(idx,1);
        res.status(200).json({
            message: `Produto ${id} excluído com sucesso`,
            lista_produtos
        })
    } else {
        res.status(404).json({
            message: "Produto não encontrado"
        })
    }
})

// Inicializa o servidor HTTP na porta 3000

app.listen(3000, function () {

    console.log('Servidor rodando na porta 3000')

})