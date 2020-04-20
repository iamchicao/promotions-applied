const seguindo = require("./data/following");
const { alunos } = require("./data/alunos");
const { products } = require("./data/products");

const prompt = require("prompt");
const util = require("util");

console.clear();

// Map / Filter / Reduce /... (Funcionais); Retornam um array

//callback (função de retorno);
//const seguindoCopia = seguindo.map(callback);

//console.log(seguindoCopia);

//function retornaCallback() {
//    console.log('Ei, eu sou a função de retorno');
//}

//Arrow Functions
//const callback = () =>  console.log('Ei, eu sou a função de retorno');

//setTimeout(callback, 5000);

const seguindoCopia = seguindo.map(function (cadaItem, indice) {
  return {
    index: indice,
    username: cadaItem.login,
    userlink: cadaItem.url,
    userphoto: cadaItem.avatar_url,
  };
});

//Map

const alunosMaioresde25 = alunos.filter(
  (objetoAluno) => objetoAluno.idade > 25
);

const filtroPorBolsas = products.filter(
  (itemLoja) => itemLoja.category === "BAGS"
);

const name = "Francisco Junior";

const frutas = ["Maça", "Banana", "Tomate"];

const frutasLowercase = frutas.map((fruta) => fruta.toLowerCase());

//console.log(frutasLowercase.includes('TOMATE'.toLowerCase()));

// Fazer o node pedir ao usuário pelo termo que ele quer buscar
// Guardar esse termo numa variável
// Garantir que o termo seja em caixa baixa
// Garantir que os nome dos produtos também sejam em caixa baixa
// Percorrer todos os oobjetos de produtoe e verificar aquelee cujo o nome bata com o termo
// --ok

// prompt.start();

// prompt.get(['busca'], function (err, resultado) {
//     const { busca } = resultado
//     const buscaMinusculo = busca.toLowerCase();

//     const produtosEncontrados = products
//     .filter((produto) => produto.name.toLowerCase().includes(buscaMinusculo));

//     console.log(produtosEncontrados);
//     console.log(util.inspect(produtosEncontrados, {showHidden: false, depth: null})) //Expand object
// });

//Reduce

//Printa a soma das idades
const somaDasIdades = alunos.reduce((acumulador, aluno) => {
  acumulador = acumulador + aluno.idade;

  return acumulador;
}, 0);

//Printa os alunos com mais de 25 anos
const alunosMaioresde25Anos = alunos.reduce((acumulador, aluno) => {
  if (aluno.idade > 25) {
    acumulador.push(aluno);
  }

  return acumulador;
}, []);

//Printa a primeira letra de cada nome, tudo junto
const superNome = alunos.reduce((acumulador, aluno) => {
  acumulador = acumulador + aluno.nome[0];

  return acumulador;
}, "");

console.log(superNome);
