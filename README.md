# 🏥 Astro Medical Starter

**Template gratuito para clínicas y centros médicos — Astro 7 + Tailwind v4 + WordPress headless ready.**

Diseño premium inspirado en el estilo MYDNA: tipografía bold, fondo blanco, acento lila, glassmorphism y animaciones suaves al scroll. Listo para producción, accesible (WCAG AA) y optimizado para Core Web Vitals.

> Creado por [Cris Culebras · Daruma Producciones](https://darumaproducciones.es) · Licencia MIT

---

## ✨ Demo

> 🚧 Próximamente — URL de demo en vivo

---

## 📋 Secciones incluidas

| Sección | Componente | Notas |
|---|---|---|
| Navegación | `Nav.astro` | Fija, blur backdrop, drawer mobile |
| Hero | `Hero.astro` | Vídeo de fondo, loader, animaciones stagger |
| Marquee | `Marquee.astro` | Banda de texto infinita, configurable |
| Sobre nosotros | `About.astro` | Stats animados, 3 columnas, glassmorphism |
| Servicios | `Services.astro` | Carrusel + **WordPress headless ready** |
| Ventajas | `Advantages.astro` | 3 tarjetas con número decorativo |
| Equipo | `Team.astro` | Hover con foto + tarjeta degradado |
| Historia | `History.astro` | Timeline interactivo con imágenes |
| Contacto | `Contact.astro` | Web3Forms / Formspree / Netlify / API propia |
| Footer | `Footer.astro` | Links + crédito |
| Cookies | `CookieBanner.astro` | Banner GDPR, guarda decisión 1 año |

---

## 🚀 Inicio rápido

```bash
# 1. Clona el repositorio
git clone https://github.com/DhiviPanda/astro-medical-starter
cd astro-medical-starter

# 2. Instala dependencias
npm install

# 3. Copia el archivo de variables de entorno
cp .env.example .env

# 4. Inicia el servidor de desarrollo
npm run dev        # http://localhost:4321

# 5. Build de producción
npm run build
npm run preview
```

---

## 🎨 Design system

```css
/* Colores principales */
--color-bg:           #ffffff
--color-surface:      #f4f4f6
--color-accent:       #8b7cf6   /* lila — cambiar por el color de tu marca */
--color-accent-text:  #6d56e8   /* lila WCAG AA para texto */
--color-text:         #0a0a0a
--color-muted:        #6b6b7a

/* Tipografía */
DM Sans (local, sin Google Fonts) — pesos 300 a 800

/* Bordes */
--radius-card: 1.25rem
```

Para cambiar el color de marca: busca `--color-accent` en `src/styles/global.css`.

---

## ⚙️ Stack

- **Astro 7** — static output, cero JS por defecto
- **Tailwind CSS v4** — via `@tailwindcss/postcss`
- **DM Sans** — fuente local (sin dependencias externas)
- **Web3Forms** — formulario sin backend
- **Vanilla JS** — sin frameworks

---

## 📝 Checklist de personalización

### Marca
- [ ] `Nav.astro` → cambia `MEDCLINIC` por el nombre de tu clínica
- [ ] `global.css` → actualiza `--color-accent` con tu color corporativo
- [ ] `public/favicon.svg` → sustituye por tu logo
- [ ] `BaseLayout.astro` → actualiza `title`, `description`, `ogImage`

### Contenido
- [ ] `Hero.astro` → titular, subtítulo, texto del milestone
- [ ] `Services.astro` → servicios reales (o conecta WordPress — ver abajo)
- [ ] `Team.astro` → miembros del equipo con fotos reales
- [ ] `About.astro` → estadísticas reales (años, pacientes, países)
- [ ] `History.astro` → hitos reales de la clínica
- [ ] `Footer.astro` → dirección, redes sociales

### Imágenes
Sustituye las URLs de Unsplash por imágenes propias en `public/images/`:

| Placeholder | Tamaño recomendado |
|---|---|
| Hero vídeo | `public/videos/dna-hero.webm` — 720×1280 |
| Hero poster | `public/videos/dna-poster.jpg` — 480×960 |
| Célula/molécula (About) | 600×800px |
| Servicios | 640×480px por servicio |
| Equipo | 400×500px por persona |
| Historia | 560×420px por hito |

### Vídeo hero
El starter incluye soporte para vídeo de fondo. Comprime tu vídeo a WebM antes de subirlo:
```bash
ffmpeg -i tu-video.mp4 -vf "scale=720:1280" -c:v libvpx-vp9 -b:v 0 -crf 35 -an public/videos/dna-hero.webm
ffmpeg -i public/videos/dna-hero.webm -ss 00:00:00.5 -frames:v 1 public/videos/dna-poster.jpg
```

---

## 📬 Formulario de contacto

Por defecto usa **Web3Forms** (gratis hasta 250 envíos/mes, sin backend).

### Web3Forms (por defecto)
1. Regístrate en [web3forms.com](https://web3forms.com)
2. Añade tu clave al `.env`: `WEB3FORMS_KEY=tu_clave`
3. En `Contact.astro` sustituye `TU_ACCESS_KEY_AQUI`

### Otras opciones

**Formspree:**
```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

**Netlify Forms:**
```html
<form netlify name="contacto" method="POST">
  <input type="hidden" name="form-name" value="contacto" />
```

**API propia:**
```js
// En el <script> de Contact.astro
const res = await fetch('https://tu-api.com/contacto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(data)),
});
```

**EmailJS:**
```bash
npm install @emailjs/browser
```
```js
import emailjs from '@emailjs/browser';
emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY');
```

> El honeypot anti-spam (`name="botcheck"`) funciona automáticamente con Web3Forms y Formspree.

---

## 🔌 WordPress headless (Servicios)

`Services.astro` soporta datos estáticos o WordPress headless. Para activar WordPress:

```js
// src/components/Services.astro — frontmatter
const WP_MODE    = true;
const WP_API_URL = 'https://cms.tudominio.com/wp-json/wp/v2/servicio?per_page=6&_embed';
```

**Campos que lee el componente:**

| Campo API | Uso |
|---|---|
| `title.rendered` | Título |
| `excerpt.rendered` | Descripción |
| `_embedded['wp:featuredmedia'][0].source_url` | Imagen |
| `link` | URL de la entrada |

Si la API falla, el componente cae silenciosamente a los datos estáticos.

El mismo patrón se puede aplicar a `Team.astro`, `History.astro` y `Advantages.astro`.

---

## 🌐 Deploy

### IONOS / Hosting compartido (FTP)
```bash
npm run build
# Sube el contenido de /dist a tu public_html via FTP
# El .htaccess incluido activa compresión y caché automáticamente
```

### Netlify / Vercel
```
Build command:     npm run build
Publish directory: dist
```

---

## 🔒 Seguridad

- `npm audit` → 0 vulnerabilidades
- Sin claves API expuestas en el código
- `.env` en `.gitignore`
- Headers de seguridad en `.htaccess` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- Honeypot anti-spam en el formulario

---

## ♿ Accesibilidad

- WCAG AA en contraste de color (`--color-muted: #6b6b7a`)
- Áreas táctiles mínimas 44×44px
- Orden de headings correcto
- `aria-hidden` en elementos decorativos
- `alt` en todas las imágenes

---

## 📄 Licencia

MIT — libre para uso personal y comercial. Si usas este template, agradeceríamos que mantuvieras el crédito en el footer o en el código. ¡Pero no es obligatorio!

---

## 🙋 Sobre la autora

Hecho con mucho ❤️ por **Cris Culebras Barreiro** — desarrolladora web freelance con más de 10 años de experiencia especializada en rendimiento web (WPO), SEO técnico y arquitectura moderna con **Astro + WordPress headless**.

Fundadora de **[Daruma Producciones](https://darumaproducciones.es)**, estudio de desarrollo web en Madrid orientado a resultados: sitios rápidos, accesibles y bien posicionados.

**Especialidades:**
- Arquitectura JAMstack: Astro, WordPress headless, APIs REST
- Core Web Vitals y optimización de rendimiento (WPO)
- SEO técnico: Schema.org, indexación, auditorías técnicas
- Licenciada en Bellas Artes — el diseño y el código van de la mano

**Proyectos destacados con este stack:**
- [FILMADRID Festival Internacional de Cine](https://filmadrid.com) — cliente desde 2017
- [La Parada del Bus](https://laparadadelbus.com) — portal de música indie, 54K impresiones en el primer mes
- [Ana Suela Fotografía](https://anasuela.com) — 93/100 PageSpeed, top 25 en Google en menos de 4 semanas

Este starter kit forma parte de una serie de templates open source para distintos sectores. El objetivo: que cualquier desarrolladora o desarrollador pueda arrancar un proyecto profesional sin perder días en configuración inicial.

📩 [hola@darumaproducciones.es](mailto:hola@darumaproducciones.es)
🌐 [darumaproducciones.es](https://darumaproducciones.es)
💼 [LinkedIn](https://www.linkedin.com/in/cris-culebras-barreiro/)
🐙 [GitHub](https://github.com/DhiviPanda)

> ¿Necesitas un template adaptado para tu sector o un sitio web a medida? [Hablamos](mailto:hola@darumaproducciones.es)

---

## 🔍 SEO

### Schema.org JSON-LD incluidos

| Schema | Dónde | Para qué |
|---|---|---|
| `MedicalClinic` | `BaseLayout.astro` | Entidad principal — nombre, dirección, teléfono, horarios, especialidades |
| `WebSite` | `BaseLayout.astro` | Sitelinks searchbox en Google |
| `BreadcrumbList` | `BaseLayout.astro` | Migas de pan en los resultados |
| `ItemList` + `MedicalProcedure` | `Services.astro` | Lista de servicios médicos estructurada |

### Personalizar los schemas

En `BaseLayout.astro` (frontmatter), cambia los valores por defecto:

```js
schemaName    = 'Nombre de tu clínica',
schemaPhone   = '+34 91 000 0000',
schemaEmail   = 'info@tudominio.es',
schemaAddress = 'Tu calle y número',
schemaCity    = 'Tu ciudad',
schemaPostalCode = '28001',
schemaCountry = 'ES',
schemaUrl     = 'https://tudominio.es',
```

O pásalos como props en cada página:

```astro
<BaseLayout
  title="Clínica García — Madrid"
  schemaName="Clínica García"
  schemaPhone="+34 91 111 2222"
  schemaUrl="https://clinicagarcia.es"
>
```

### Valida los schemas

Una vez en producción, valida en:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org)

### Meta tags incluidos

- `description`, `robots`, `canonical`
- Open Graph completo (title, description, image 1200×630, url, locale, site_name)
- Twitter Card (summary_large_image)

### Pendiente de configurar (no automático)

- [x] ~~Crear `public/og-default.jpg`~~ ✅ Ya incluida — 1200×630px
- [ ] Actualizar `schemaUrl` con tu dominio real
- [ ] Añadir perfiles sociales al array `sameAs` del schema
- [ ] Actualizar horarios de apertura en `openingHoursSpecification`
- [ ] Añadir `sitemap.xml` — instala `@astrojs/sitemap` o genera uno manualmente

---

## 🗂️ Guía completa de placeholders

Todo lo que necesitas sustituir antes de publicar en producción, ordenado por prioridad.

### 🔴 Imprescindible (sin esto no funciona)

| Qué | Dónde | Valor actual | Cómo cambiarlo |
|---|---|---|---|
| Nombre de la clínica | `Nav.astro`, `Footer.astro`, `Hero.astro`, `Contact.astro` | `MEDCLINIC` | Busca y reemplaza `MEDCLINIC` en todo el proyecto |
| Dominio | `BaseLayout.astro` → `schemaUrl` | `https://tudominio.es` | Tu URL real con https |
| Clave formulario | `Contact.astro` línea 49 | `TU_ACCESS_KEY_AQUI` | Tu clave de Web3Forms / Formspree |
| Teléfono | `Contact.astro` + `BaseLayout.astro` | `(+34) 91 000 0000` | Tu teléfono real |
| Email | `Contact.astro` + `BaseLayout.astro` | `info@medclinic.es` | Tu email real |
| Dirección | `Contact.astro` + `BaseLayout.astro` | `123 Health Avenue, Madrid` | Tu dirección real |

---

### 🟡 Importante (afecta al SEO y redes sociales)

| Qué | Dónde | Notas |
|---|---|---|
| Meta título | `BaseLayout.astro` → prop `title` | Por defecto: "MedClinic — Diagnóstico Médico Avanzado" |
| Meta descripción | `BaseLayout.astro` → prop `description` | Máx 160 caracteres |
| OG image | `public/og-default.jpg` | ✅ Ya incluida — 1200×630px |
| Schema nombre | `BaseLayout.astro` → `schemaName` | Nombre legal de la clínica |
| Schema especialidades | `BaseLayout.astro` → `medicalSpecialty` | Cambia `Genetics`, `Oncology`... por las tuyas |
| Schema horarios | `BaseLayout.astro` → `openingHoursSpecification` | Ajusta días y horas |
| Perfiles sociales | `BaseLayout.astro` → array `sameAs` | LinkedIn, Instagram, etc. |
| Sitemap | — | Instala `@astrojs/sitemap` y añade `site` en `astro.config.mjs` |

---

### 🟢 Imágenes placeholder (Unsplash → tus fotos)

Todas las imágenes actuales son de [Unsplash](https://unsplash.com) y son válidas para desarrollo.
**Para producción**, sustitúyelas por imágenes propias en `public/images/`.

#### Hero (vídeo)
| Archivo | Ruta | Tamaño | Notas |
|---|---|---|---|
| Vídeo hero | `public/videos/dna-hero.webm` | 720×1280px · <2MB | Loop sin audio |
| Poster vídeo | `public/videos/dna-poster.jpg` | 480×960px | Primer frame del vídeo |

#### Sección About (`src/components/About.astro`)
| Variable | Tamaño | Descripción |
|---|---|---|
| `IMG_CELL` | 600×800px | Imagen principal izquierda (célula, laboratorio, médico) |
| `IMG_MOLECULE` | 500×500px | Tarjeta molécula derecha |
| `AVATAR_1/2/3` | 80×80px | Fotos del equipo en el badge |

#### Sección Servicios (`src/components/Services.astro`)
Sustituye las URLs en el array `staticServices`:
```js
image: '/images/service-genetica.jpg',    // 640×480px
image: '/images/service-oncologia.jpg',   // 640×480px
image: '/images/service-asesoramiento.jpg', // 640×480px
image: '/images/service-diagnostico.jpg', // 640×480px
```

#### Sección Equipo (`src/components/Team.astro`)
Sustituye las URLs `photo` en el array `team`:
```js
photo: '/images/team-dra-mitchell.jpg',   // 400×500px · vertical
photo: '/images/team-laura-anderson.jpg', // 400×500px · vertical
photo: '/images/team-dra-davis.jpg',      // 400×500px · vertical
photo: '/images/team-dr-park.jpg',        // 400×500px · vertical
```

#### Sección Historia (`src/components/History.astro`)
Sustituye las URLs `img` en el array `milestones` (una por hito):
```js
img: '/images/history-2009.jpg',  // 560×420px
img: '/images/history-2012.jpg',  // 560×420px
// ... etc
```

---

### ⚪ Contenido de ejemplo (personaliza a tu clínica)

| Sección | Componente | Qué cambiar |
|---|---|---|
| Titular hero | `Hero.astro` | "Diagnóstico detallado de tu cuerpo" |
| Subtítulo hero | `Hero.astro` | "La salud es lo más importante..." |
| Milestone | `Hero.astro` | Fecha, número y texto del hito |
| Stats (About) | `About.astro` | 14 años, 39+ países, 99%, 25k+ pacientes |
| Servicios | `Services.astro` | Títulos y descripciones de cada servicio |
| Ventajas | `Advantages.astro` | Los 3 títulos y descripciones |
| Equipo | `Team.astro` | Nombres, roles y bios |
| Historia | `History.astro` | Años e hitos reales de la clínica |
| Datos contacto | `Contact.astro` | Teléfono, email, dirección |
| Footer | `Footer.astro` | Links legales, redes sociales |

---

### 🔵 Opcional (mejoras futuras)

- [ ] Añadir `@astrojs/sitemap` para generar `sitemap.xml` automático
- [ ] Sustituir `TU_ACCESS_KEY_AQUI` por una variable de entorno (`import.meta.env.WEB3FORMS_KEY`)
- [ ] Añadir Google Analytics o Plausible (respetuoso con GDPR) en `BaseLayout.astro`
- [ ] Conectar `Team.astro` e `History.astro` a WordPress headless (mismo patrón que `Services.astro`)
- [ ] Añadir páginas internas: `/servicios/[slug]`, `/equipo/[slug]`
- [ ] Versión EN (`/en/`) con `i18n` de Astro
