// ===== Personagens =====

// URL do arquivo de dados dos personagens (consumido via fetch)
const URL_DADOS = "data/hoi4.json";

// Referências aos elementos do HTML
const areaCards = document.getElementById("cards");
const campoBusca = document.getElementById("busca");
const mensagem = document.getElementById("status");

// Lista completa carregada do JSON, usada pela busca
let personagens = [];

// Remove acentos e deixa em minúsculo para comparar textos
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Cria um card completo com createElement e appendChild.
// O HTML não tem nenhum card fixo: tudo é montado aqui.
function criarCard(p) {
  // Container principal do card
  const card = document.createElement("article");
  card.classList.add("card", p.faccao === "Eixo" ? "eixo" : "aliado");

  // Área de imagem (usamos a bandeira em emoji)
  const imagem = document.createElement("div");
  imagem.classList.add("card-imagem");
  imagem.textContent = p.imagem;

  // Área de texto
  const corpo = document.createElement("div");
  corpo.classList.add("card-corpo");

  const faccao = document.createElement("span");
  faccao.classList.add("faccao");
  faccao.textContent = p.faccao;

  const nome = document.createElement("h2");
  nome.textContent = p.nome;

  const pais = document.createElement("p");
  pais.classList.add("pais");
  pais.textContent = p.pais;

  const cargo = document.createElement("p");
  cargo.classList.add("cargo");
  cargo.textContent = p.cargo;

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  descricao.textContent = p.descricao;

  const estado = document.createElement("p");
  estado.classList.add("estado");
  estado.textContent = `Status: ${p.status} (${p.anoFalecimento})`;

  // Monta a hierarquia: textos dentro do corpo, corpo e imagem dentro do card
  corpo.append(faccao, nome, pais, cargo, descricao, estado);
  card.append(imagem, corpo);

  return card;
}

// Limpa a área de cards e exibe a lista recebida
function renderizar(lista) {
  areaCards.innerHTML = "";
  lista.forEach(p => areaCards.appendChild(criarCard(p)));

  mensagem.textContent = lista.length > 0
    ? `${lista.length} personagem(ns) exibido(s).`
    : "Nenhum personagem encontrado para essa busca.";
}

// Faz o fetch do JSON, converte a resposta e renderiza os cards
function carregarDados() {
  fetch(URL_DADOS)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(dados => {
      personagens = dados;
      renderizar(personagens);
    })
    .catch(erro => {
      mensagem.textContent = "Não foi possível carregar os dados. Veja o README para rodar em um servidor local.";
      console.error("Falha ao carregar os dados:", erro);
    });
}

// Filtra os cards pelo nome ou pelo país conforme o usuário digita
campoBusca.addEventListener("input", () => {
  const termo = normalizar(campoBusca.value.trim());

  const filtrados = personagens.filter(p =>
    normalizar(p.nome).includes(termo) || normalizar(p.pais).includes(termo)
  );

  renderizar(filtrados);
});

// ===== História =====

// URL do arquivo com os eventos da linha do tempo (consumido via fetch)
const URL_HISTORIA = "data/historia.json";

const linhaDoTempo = document.getElementById("linha-do-tempo");
const mensagemHistoria = document.getElementById("status-historia");

// Cria um item da linha do tempo com createElement e appendChild
function criarEvento(evento) {
  const item = document.createElement("li");
  item.classList.add("evento");

  const ano = document.createElement("span");
  ano.classList.add("ano");
  ano.textContent = evento.ano;

  const titulo = document.createElement("h3");
  titulo.textContent = evento.titulo;

  const descricao = document.createElement("p");
  descricao.textContent = evento.descricao;

  item.append(ano, titulo, descricao);
  return item;
}

// Faz o fetch dos eventos e monta a linha do tempo na ordem do arquivo
function carregarHistoria() {
  fetch(URL_HISTORIA)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(eventos => {
      eventos.forEach(e => linhaDoTempo.appendChild(criarEvento(e)));
      mensagemHistoria.textContent = "";
    })
    .catch(erro => {
      mensagemHistoria.textContent = "Não foi possível carregar a linha do tempo. Veja o README para rodar em um servidor local.";
      console.error("Falha ao carregar a história:", erro);
    });
}

// Inicia as duas seções ao abrir a página
carregarDados();
carregarHistoria();
