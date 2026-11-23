# Hearts of Iron IV: Líderes e História

Site estático com HTML, CSS e JavaScript puro. Os dados são carregados com `fetch` a partir de arquivos JSON, e os cards e a linha do tempo são criados dinamicamente pelo JavaScript.

## Seções

- **Entrada:** apresentação do tema com botões para as seções.
- **Personagens:** cards de líderes com busca por nome ou país.
- **Linha do tempo:** eventos principais da guerra, de 1933 a 1945.

## Como rodar

Não abra o `index.html` com duplo clique. O navegador bloqueia o `fetch` de arquivos locais (protocolo `file://`). Use um servidor local:

- **VS Code:** instale a extensão Live Server e clique em "Go Live".
- **Terminal:** dentro da pasta do projeto, rode `python3 -m http.server 8000` e acesse http://localhost:8000

## Estrutura

- `index.html`: estrutura da página e seções
- `css/style.css`: estilos e layout responsivo
- `js/script.js`: fetch, criação dos cards e da linha do tempo, e busca
- `data/hoi4.json`: dados dos personagens
- `data/historia.json`: eventos da linha do tempo
