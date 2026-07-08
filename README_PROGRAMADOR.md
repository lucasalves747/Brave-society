# Brave Society — Instruções para o Programador

## Stack do Projeto
- **Framework:** React 19 + TypeScript
- **Estilização:** Tailwind CSS 4 + CSS customizado
- **Build Tool:** Vite 7
- **Gerenciador de pacotes:** pnpm

## Como Rodar Localmente

```bash
# 1. Instalar dependências
pnpm install

# 2. Rodar em desenvolvimento
pnpm dev

# 3. Build para produção
pnpm build
```

O servidor de desenvolvimento sobe em: http://localhost:3000

## Estrutura Principal

```
brave-society/
├── client/
│   ├── index.html          <- Fonts (Cormorant Garamond + Inter) carregadas aqui
│   └── src/
│       ├── index.css       <- Tokens de design, paleta, tipografia, utilitários
│       ├── App.tsx         <- Roteamento (tema dark)
│       └── pages/
│           └── Home.tsx    <- PÁGINA PRINCIPAL — todas as seções estão aqui
├── server/index.ts         <- Servidor Express (apenas para produção)
└── package.json
```

## Arquivo Principal: Home.tsx

Toda a landing page está em `client/src/pages/Home.tsx`.
O arquivo contém os seguintes componentes em ordem:

| Componente | Seção |
|---|---|
| `Nav` | Navegação fixa com scroll reveal |
| `HeroSection` | Hero com Miami skyline |
| `ThesisSection` | A Tese |
| `PillarsSection` | Os 5 Pilares de Valor |
| `ProgrammingSection` | Programação do clube |
| `CodeSection` | Código de Conduta |
| `FoundersSection` | Os 3 fundadores com fotos |
| `MembershipSection` | Valores e condições |
| `ApplySection` | Formulário de aplicação |
| `Footer` | Rodapé |

## Imagens (Assets)

As imagens estão hospedadas no CDN via `/manus-storage/...`.
Para usar em outro servidor (AWS S3, Cloudflare, etc.), substitua as URLs no objeto `ASSETS` no topo de `Home.tsx`:

```typescript
const ASSETS = {
  heroVideo:       "/images/ref_miami_skyline.jpg",
  yachtNight:      "/images/ref_yacht_miami_night.jpg",
  dinnerCandle:    "/images/ref_dinner_candle.jpg",
  winecellar:      "/images/ref_wine_cellar.jpg",
  ironman:         "/images/ref_ironman.jpg",
  founderEduardo:  "/images/founder_eduardo.jpg",
  founderHewerton: "/images/founder_hewerton.png",
};
```

Os arquivos de imagem originais estão no ZIP `brave_society_assets.zip`.
Coloque-os em `client/public/images/` e atualize os caminhos conforme acima.

## Paleta de Cores

| Cor | Hex | Uso |
|---|---|---|
| Noir (fundo principal) | `#05070B` | Background principal |
| Noir Blue | `#07111F` | Background seções alternadas |
| Antique Gold | `#C89B45` | Acentos, eyebrows, bordas |
| Warm Ivory | `#F4E8D0` | Texto principal |
| Muted Gold | `#D8C7A1` | Texto secundário |

## Tipografia

- **Títulos/Display:** Cormorant Garamond (Google Fonts) — pesos 400, 600, 700
- **Corpo/UI:** Inter (Google Fonts) — pesos 300, 400, 500, 600

## Formulário de Aplicação

O formulário atual simula o envio com `setTimeout`. Para integrar com backend real:

1. Localize a função `handleSubmit` dentro do componente `ApplySection`
2. Substitua o `await new Promise(...)` por uma chamada `fetch` ou `axios`
3. Conecte ao endpoint desejado (Webhook, HubSpot, Mailchimp, Make, Zapier, etc.)

Exemplo de integração:
```typescript
const res = await fetch("https://seu-backend.com/api/apply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

## Site ao Vivo (Manus Hosting)

URL: https://bravesociety-lawdyu6m.manus.space

## Dependências Principais

- `react` 19, `react-dom` 19
- `wouter` — roteamento client-side
- `framer-motion` — animações
- `tailwindcss` 4
- `lucide-react` — ícones
- `@radix-ui/*` — componentes acessíveis (via shadcn/ui)
