# 🚀 CRUD com Next.js + Laravel

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13%2B-blue.svg" />
  <img src="https://img.shields.io/badge/Laravel-10-red.svg" />
  <img src="https://img.shields.io/badge/TypeScript-4.x-blue.svg" />
  <img src="https://img.shields.io/badge/MIT-License-green.svg" />
</p>

## ✨ Visão Geral

Este projeto é um **CRUD completo (Create, Read, Update, Delete)** utilizando:

- Frontend em **Next.js** com **TypeScript**
- Backend em **Laravel**
- Interface moderna com **Material UI** e **Tailwind CSS**
- Formulários robustos com **React Hook Form** e **Yup**
- Integração eficiente com API REST usando **Axios**
- Feedback para o usuário com **React Hot Toast**

---

## 🛠️ Stack de Tecnologias

### Frontend (Next.js)

- Next.js
- TypeScript
- Axios
- React Hook Form
- React Hot Toast
- Yup
- Material UI
- Tailwind CSS

### Backend (Laravel)

- Laravel
- Eloquent ORM

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o repositório

\`\`\`bash
git clone https://github.com/adrianoct42/gove_challenge.git
\`\`\`

### 2️⃣ Rodar o Backend (Laravel)

Entre na pasta do Laravel e faça o seguinte:
(Lembre-se também de configurar o arquivo .env conforme os detalhes do seu banco!)

\`\`\`bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
\`\`\`

### 3️⃣ Rodar o Frontend (Next.js)

Entre na pasta do Next.js e faça o seguinte:

\`\`\`bash
npm install
npm run dev
\`\`\`

### 4️⃣ Configuração de CORS (Backend)

Certifique-se de configurar o CORS corretamente no Laravel para permitir chamadas do frontend:

\`\`\`php
// config/cors.php
'allowed_origins' => ['http://localhost:3000'],
\`\`\`

---

## 🖥️ Funcionalidades

✅ Listagem de itens  
✅ Criação de novo item  
✅ Edição de item existente  
✅ Exclusão de item  
✅ Validação de formulários com Yup  
✅ Feedback visual com React Hot Toast  
✅ Design responsivo com Material UI + Tailwind CSS

---
