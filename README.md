# Trustena Backend Starter – API

Backend façade standard Trustena.

## Objectif

- Fournir une API minimale et stable
- Exécuter les jobs async
- Remplacer totalement les Edge Functions
- Déployable en DEV / TEST / PROD / on-prem

## Responsabilités

Ce backend :
- vérifie le JWT Supabase
- crée et suit des jobs
- déclenche n8n / IA / traitements longs
- expose l’état des jobs au frontend

Ce backend ne gère pas :
- l’UI
- l’auth utilisateur (gérée par Supabase)
- les états UX

## Endpoints

Health :
    GET /healthz

Jobs :
    POST /v1/jobs
    GET  /v1/jobs/{id}

Webhook async (n8n) :
    POST /v1/webhooks/n8n

## Authentification

Le frontend envoie :
    Authorization: Bearer <access_token_supabase>

L’API vérifie le token avec :
    SUPABASE_JWT_SECRET

Aucun état session côté API.

## Modèle Job

Table `jobs` :
- id (uuid)
- type
- status : pending | running | completed | failed
- progress (0–100)
- payload
- result
- error
- created_by

Migration :
    migrations/001_jobs.sql

## Configuration

Exemple .env :
    PORT=3000
    DATABASE_URL=postgresql://user:pass@host:5432/db
    SUPABASE_JWT_SECRET=replace_me

Exemple fourni :
    .env.example

## Lancer en DEV

    npm install
    npm run build
    npm run start

Docker :
    docker build -t trustena-api .
    docker run --env-file .env -p 3000:3000 trustena-api

## Règles d’or Trustena (API)

- Pas de logique UI
- Pas d’Edge Functions
- Stateless
- JWT SupSA only
- Async = jobs + polling
- n8n pour l’exécution longue

## Réutilisation

Template clonable :
1. Cloner / template
2. Adapter .env
3. Appliquer migrations
4. Brancher le frontend Lovable

