# Implementación de autenticación robusta en Angular

El candidato debe implementar un sistema de autenticación en una aplicación Angular que intercepte requests y responses, maneje tokens de sesión y garantice la seguridad en el consumo de servicios. El sistema debe ser capaz de manejar la autenticación de usuarios y asegurar que solo los usuarios autorizados puedan acceder a los servicios backend. Los tokens de sesión deben ser gestionados de manera segura para prevenir vulnerabilidades. El sistema debe soportar una tasa de solicitudes de 1 500 por segundo en hora pico y mantener una latencia de respuesta inferior a 200ms. En caso de fallo del servicio de autenticación, el sistema debe proporcionar una respuesta de error clara al usuario.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | autenticación |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del interceptor de requests

**Objetivo:** Implementar un interceptor de requests que añada automáticamente el token de sesión a todas las solicitudes salientes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Diseñar e implementar un interceptor de requests en Angular.
- El interceptor debe añadir el token de sesión a las cabeceras de las solicitudes HTTP.
- Asegurar que el token se actualice automáticamente cuando expire.

**Entregable:** Interceptor de requests funcional que añade el token de sesión a las solicitudes.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo almacenar y recuperar el token de sesión de manera segura.
- Piensa en cómo manejar la expiración del token y la renovación automática.

</details>

### Fase 2: Implementación del interceptor de responses

**Objetivo:** Implementar un interceptor de responses que maneje los tokens de sesión y las respuestas de error.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseñar e implementar un interceptor de responses en Angular.
- El interceptor debe manejar la recepción de tokens de sesión y las respuestas de error.
- Asegurar que las respuestas de error sean manejadas de manera apropiada y que el usuario reciba información clara.

**Entregable:** Interceptor de responses funcional que maneja tokens de sesión y respuestas de error.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar diferentes tipos de respuestas de error y proporcionar información clara al usuario.
- Piensa en cómo asegurar que el token de sesión sea actualizado correctamente en caso de renovación.

</details>

### Fase 3: Integración y pruebas

**Objetivo:** Integrar los interceptores de requests y responses y realizar pruebas exhaustivas.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Integrar los interceptores de requests y responses en la aplicación Angular.
- Realizar pruebas unitarias y de integración para asegurar que los interceptores funcionen correctamente.
- Asegurar que el sistema maneje correctamente la autenticación y las respuestas de error.

**Entregable:** Aplicación Angular con interceptores de requests y responses integrados y probados.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo realizar pruebas unitarias y de integración efectivas para asegurar la funcionalidad de los interceptores.
- Piensa en cómo manejar casos de edge y asegurar que el sistema sea robusto.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los interceptores de requests y responses en Angular y para qué se utilizan?
- **paraQueSirve**: ¿Cuál es el propósito de los interceptores en el contexto de la autenticación y seguridad de la aplicación?
- **comoSeUsa**: ¿Cómo se implementan y configuran los interceptores de requests y responses en Angular?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar interceptores y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones de diseño y trade-offs implica la implementación de interceptores para la autenticación?

## Criterios de Evaluacion

- Implementación correcta de un interceptor de requests que añade el token de sesión a las solicitudes.
- Implementación correcta de un interceptor de responses que maneja tokens de sesión y respuestas de error.
- Integración exitosa de los interceptores en la aplicación Angular y realización de pruebas exhaustivas.
- Manejo correcto de la autenticación y las respuestas de error en la aplicación.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
