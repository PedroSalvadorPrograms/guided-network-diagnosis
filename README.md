# Diagnostico Guiado de Redes e CFTV

Assistente tecnico simples para conduzir diagnosticos iniciais de rede, acesso remoto e camera offline.

## Stack

- Next.js
- TypeScript
- Supabase
- CSS
- GitHub Actions

## Entregas do MVP

- Wizard de diagnostico sem frontend pesado
- Geracao de resumo tecnico em poucos cliques
- Pode alimentar abertura de chamados
- Estrutura pronta para salvar execucoes no Supabase

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Se voce nao preencher as chaves do Supabase, o app sobe com dados de demonstracao.

## Variaveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Schema base

```sql
create table if not exists diagnostic_runs (
  id text primary key,
  symptom text not null,
  suspected_cause text not null,
  recommendation text not null,
  opened_ticket boolean not null default false,
  created_at timestamptz not null default now()
);
```

