// index.js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let estudantes = [];

// Função para calcular média
function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return soma / notas.length;
}
// Teste de integração com GitHub
// Função para mostrar menu
function mostrarMenu() {
  console.log("\n===== GERENCIADOR DE ESTUDANTES =====");
  console.log("1 - Cadastrar estudante");
  console.log("2 - Listar estudantes");
  console.log("3 - Buscar estudante por nome");
  console.log("4 - Relatórios");
  console.log("5 - Sair");
  rl.question("Escolha uma opção: ", opcao => {
    switch (opcao) {
      case "1":
        cadastrarEstudante();
        break;
      case "2":
        listarEstudantes();
        break;
      case "3":
        buscarEstudante();
        break;
      case "4":
        mostrarRelatorios();
        break;
      case "5":
        console.log("Saindo...");
        rl.close();
        break;
      default:
        console.log("Opção inválida!");
        mostrarMenu();
    }
  });
}

// Função para cadastrar estudante
function cadastrarEstudante() {
  rl.question("Nome do estudante: ", nome => {
    rl.question("Idade: ", idade => {
      rl.question("Notas (separadas por vírgula): ", notasInput => {
        const notas = notasInput.split(",").map(n => parseFloat(n.trim()));
        const media = calcularMedia(notas);

        estudantes.push({
          nome,
          idade: parseInt(idade),
          notas,
          media
        });

        console.log(`Estudante ${nome} cadastrado com sucesso!`);
        mostrarMenu();
      });
    });
  });
}

// Função para listar estudantes
function listarEstudantes() {
  console.log("\n===== LISTA DE ESTUDANTES =====");
  estudantes.forEach((estudante, i) => {
    console.log(
      `${i + 1}. ${estudante.nome} | Idade: ${estudante.idade} | Média: ${estudante.media.toFixed(2)}`
    );
  });
  mostrarMenu();
}

// Função para buscar estudante por nome
function buscarEstudante() {
  rl.question("Digite o nome do estudante: ", nome => {
    const encontrado = estudantes.find(e =>
      e.nome.toLowerCase() === nome.toLowerCase()
    );

    if (encontrado) {
      console.log(`Encontrado: ${encontrado.nome}, média ${encontrado.media.toFixed(2)}`);
    } else {
      console.log("Estudante não encontrado.");
    }
    mostrarMenu();
  });
}

// Função para relatórios
function mostrarRelatorios() {
  console.log("\n===== RELATÓRIOS =====");
  const aprovados = estudantes.filter(e => e.media >= 7);
  const recuperacao = estudantes.filter(e => e.media >= 5 && e.media < 7);
  const reprovados = estudantes.filter(e => e.media < 5);

  console.log("Aprovados:", aprovados.map(e => e.nome));
  console.log("Recuperação:", recuperacao.map(e => e.nome));
  console.log("Reprovados:", reprovados.map(e => e.nome));

  mostrarMenu();
}

// Inicia o programa
mostrarMenu();
