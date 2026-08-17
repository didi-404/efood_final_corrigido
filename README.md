# efood — projeto final corrigido

Projeto React + TypeScript do exercício eFood da EBAC.

## Correção principal desta versão

O checkout não utiliza mais páginas separadas para carrinho, entrega, pagamento e confirmação.
Todo o fluxo acontece dentro do mesmo painel lateral, conforme solicitado na correção:

**Carrinho → Entrega → Pagamento → Pedido realizado**

Ao trocar de etapa, o conteúdo do painel é substituído sem navegar para outra URL.

## Funcionalidades

- Restaurantes carregados da API da EBAC
- Página de restaurante e cardápio
- Modal de detalhes do prato
- Redux Toolkit para o carrinho
- Painel lateral do carrinho
- Formulário de entrega dentro do painel
- Formulário de pagamento dentro do painel
- POST do checkout com RTK Query
- Confirmação com `orderId` retornado pela API
- Limpeza do carrinho após compra concluída
- Configuração para deploy na Vercel

## Executar

```bash
npm install
npm run dev
```

## Validar antes de publicar

```bash
npm run build
```

## Deploy

O arquivo `vercel.json` mantém o funcionamento das rotas do React Router na Vercel.
