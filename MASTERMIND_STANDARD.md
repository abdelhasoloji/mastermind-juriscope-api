Mastermind Standard (API)

- Backend = source unique de vérité
- Stateless, JWT Supabase only
- Pattern obligatoire: POST /v1/jobs + GET /v1/jobs/{id}
- Exécution longue via n8n / workers, jamais sync
- Webhook callback possible: POST /v1/webhooks/n8n
- Déployable DEV/TEST/PROD/on-prem
