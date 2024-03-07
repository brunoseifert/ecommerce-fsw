# Projeto E-Commerce de Produtos Eletrônicos

Projeto de e-commerce de produtos eletrônicos com um design moderno, desenvolvido utilizando Next.js, TypeScript, NextAuth, Prisma, SupaBase e integração com Stripe.

## Índice

- [Sobre](#sobre)
- [Recursos](#recursos)
- [Testes de Pagamento](#testes-de-pagamento)
- [Configuração](#configuração)
- [Instalação](#instalação)

## Sobre

O projeto E-Commerce de Produtos Eletrônicos é uma plataforma moderna construída com Next.js, TypeScript e outras tecnologias, oferecendo uma experiência de compra intuitiva e segura para produtos eletrônicos.

## Recursos

- **Tailwind CSS e Shadcn-UI:** Design moderno e responsivo.
- **NextAuth:** Sistema de autenticação robusto com suporte para credenciais e login via Google ID.
- **Prisma:** Mapeamento de objeto-relacional para interação com o banco de dados.
- **SupaBase:** Banco de dados e backend serverless.
- **Stripe:** Integração para processamento de pagamentos.

## Testes de Pagamento
Para realizar testes de pagamento, utilize as seguintes informações:

- Número do Cartão: 4242 4242 4242 4242
- Data de Validade: Qualquer data futura
- Código de Verificação: Qualquer código de 3 dígitos
- Email: 123@gmail.com (ou qualquer outro email)
- **Isso permitirá que você teste a funcionalidade de pagamento sem a necessidade de dados reais.**

## Configuração
Configure as variáveis de ambiente necessárias. Crie um arquivo .env.local na raiz do projeto e preencha com suas chaves de API e configurações:
   - DATABASE_URL: SuaChave;
   - GOOGLE_CLIENT_ID: SuaChave;
   - GOOGLE_CLIENT_SECRET: SuaChave;
   - STRIPE_SECRET_KEY: SuaChave;
   - NEXT_PUBLIC_STRIPE_PUBLIC_KEY: SuaChave;
   - STRIPE_WEBHOOK_SECRET_KEY: SuaChave;
   - STRIPE_PUBLIC_KEY: SuaChave;
   - HOST_URL: SuaChave;
   - NEXTAUTH_SECRET: SuaChave:

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/brunoseifert/ecommerce-fsw.git
cd seu-projeto
npm install
