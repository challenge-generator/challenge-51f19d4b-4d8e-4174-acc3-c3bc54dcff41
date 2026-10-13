# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de autenticación robusta en Angular**.

| | |
|---|---|
| Tema | autenticación |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript 5.8 / Angular 20 |
| Patron arquitectonico | capas estándar con servicios e interceptores dedicados |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.2.0
- @angular/common 20.2.0
- @angular/forms 20.2.0
- @angular/router 20.2.0
- @angular/platform-browser 20.2.0
- @angular/platform-browser-dynamic 20.2.0
- @angular/common/http 20.2.0
- rxjs 7.8.0
- typescript 5.8.0-dev.20240503
- jest 29.7.0
- @types/jest 29.5.12
- @angular-builders/jest 17.0.0
- @angular/material 17.3.0
- jwt-decode 4.0.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración del interceptor de requests**: Interceptor de requests funcional que añade el token de sesión a las solicitudes.
- **Fase 2 — Implementación del interceptor de responses**: Interceptor de responses funcional que maneja tokens de sesión y respuestas de error.
- **Fase 3 — Integración y pruebas**: Aplicación Angular con interceptores de requests y responses integrados y probados.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/app/core/interceptors/auth-request.interceptor.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/core/interceptors/auth-response.interceptor.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/core/services/auth.service.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/core/models/auth.models.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/core/utils/auth.utils.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/features/auth/auth.module.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/app/features/auth/login/login.component.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/tests/unit/interceptors/auth-request.interceptor.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/tests/unit/interceptors/auth-response.interceptor.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- [ ] `src/tests/unit/services/auth.service.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Referencias colgando (4)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/features/auth/login/login.component.ts` — `StorageService.get`
      Se invoca `get` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/auth/login/login.component.ts` — `StorageService.set`
      Se invoca `set` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/auth/login/login.component.ts` — `StorageService.remove`
      Se invoca `remove` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.4.0`
      typescript declara la version 5.4.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (19)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/app/core/interceptors/auth-request.interceptor.ts`
- `src/app/core/interceptors/auth-response.interceptor.ts`
- `src/app/core/services/auth.service.ts`
- `src/main.ts`
- `src/index.html`
- `src/app/core/services/storage.service.ts`
- `src/app/core/models/auth.models.ts`
- `src/app/core/utils/auth.utils.ts`
- `src/app/app.config.ts`
- `src/app/features/auth/auth.module.ts`
- `src/app/features/auth/login/login.component.ts`
- `src/app/shared/components/error-message/error-message.component.ts`
- `src/tests/unit/interceptors/auth-request.interceptor.spec.ts`
- `src/tests/unit/interceptors/auth-response.interceptor.spec.ts`
- `src/tests/unit/services/auth.service.spec.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/core/interceptors`
- `src/app/core/services`
- `src/app/core/models`
- `src/app/core/utils`
- `src/app/features/auth`
- `src/app/shared/components`
- `src/tests/unit/interceptors`
- `src/tests/unit/services`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con servicios e interceptores dedicados**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior
- Brecha que el reto ataca: Aplica conscientemente conceptos más profundos de consumo de servicios: intercepción de request y response, seguridad y manejo de tokens para consumo de servicios (P.ej. tokens de sesión)
- Mision: Candidato Senior con experiencia en Angular, trabajando en soluciones frontend robustas y seguras

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
