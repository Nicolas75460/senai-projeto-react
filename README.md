# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

SENAI Projeto React

Aplicação web para apoiar os estudos de React no segundo semestre do curso de Front-End do SENAI. O projeto reúne ferramentas práticas em uma única interface, com navegação por abas e tema claro/escuro.

## Tecnologias

- React 19
- Vite 5
- JavaScript (JSX)
- `lucide-react` para ícones

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação e execução

No diretório do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço exibido no terminal, normalmente [http://localhost:5173](http://localhost:5173). O Vite atualiza a página automaticamente durante o desenvolvimento.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm start` | Alias para `npm run dev`. |
| `npm run build` | Gera a versão otimizada para produção em `dist/`. |
| `npm run preview` | Disponibiliza localmente a última build de produção. |

## Funcionalidades

- Dashboard com estatísticas de estudo.
- Quadro de tarefas.
- Simulador de estado do React.
- Calculadora de notas.
- Feed de tecnologia.
- Cheatsheet de React.
- Quiz interativo.
- Meta diária de estudo com registro de horas e persistência no navegador.
- Alternância entre tema claro e escuro, preservada no navegador.

## Estrutura principal

```text
src/
├── App.jsx                 # Componente principal e navegação
├── App.css                 # Estilos da aplicação
├── index.jsx               # Ponto de entrada do React
└── components/             # Funcionalidades e componentes da interface
```

Para criar uma nova funcionalidade, adicione o componente correspondente em `src/components/` e registre sua renderização e navegação em `src/App.jsx`.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
