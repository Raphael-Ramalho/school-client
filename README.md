# Blog Escolar - Front-end

Este é o front-end do projeto Blog Escolar, uma plataforma para compartilhamento de posts entre alunos e professores.

## 🚀 Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Lib**: [HeroUI](https://heroui.com/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linguagem**: TypeScript
- **Consumo de API**: Fetch API

## 🛠️ Setup Inicial

### Pré-requisitos
- Node.js instalado (recomendado v20 ou superior)
- Backend ([school-api](../school-api)) em execução

### Instalação

```bash
# Clone o repositório e acesse a pasta
cd school-client

# Instalar dependências
npm install
```

### Execução

```bash
# Rodar em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## 🏗️ Arquitetura

A aplicação utiliza a arquitetura baseada em diretórios do Next.js App Router, focando em componentes modulares e responsivos.

- `/app`: Ponto de entrada da aplicação e definição de rotas.
  - `layout.tsx`: Estrutura base da página (HTML, Body, Fontes).
  - `page.tsx`: Componente principal que gerencia o estado global da página (listagem de posts, carregamento e controle de papéis).
  - `/components`: Componentes de interface reutilizáveis.
    - `AppHeader.tsx`: Cabeçalho dinâmico com seletor de papel (Role Selector).
    - `PostCard.tsx`: Gerencia a exibição de posts individuais e fornece formulários para criação/edição.
- `/types`: Contém definições de tipos TypeScript para garantir consistência em toda a aplicação.

### Fluxo de Dados
O front-end conecta-se ao backend local através da porta `3030`. As operações de listagem, criação, atualização e exclusão de posts são realizadas via chamadas HTTP (REST).

## 📖 Guia de Uso

### Papéis de Usuário (Roles)
A aplicação possui um sistema de troca de papéis em tempo real localizado no cabeçalho.

- **Aluno (Student)**:
  - Visualiza a lista de posts recentes.
  - Tem acesso apenas para leitura.
- **Professor (Teacher)**:
  - Pode criar novos posts clicando em "+ Criar post".
  - Pode editar o conteúdo de posts existentes.
  - Pode excluir posts da plataforma.

### Persistência de Estado
O papel selecionado é automaticamente persistido no `localStorage` do navegador. Isso significa que, ao recarregar a página, a aplicação manterá o papel (Aluno ou Professor) que você definiu anteriormente.
