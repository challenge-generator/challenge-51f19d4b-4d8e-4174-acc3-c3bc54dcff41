# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/app/core/interceptors/auth-request.interceptor.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/core/interceptors/auth-response.interceptor.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/core/services/auth.service.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/core/models/auth.models.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/core/utils/auth.utils.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/features/auth/auth.module.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/app/features/auth/login/login.component.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/tests/unit/interceptors/auth-request.interceptor.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/tests/unit/interceptors/auth-response.interceptor.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.
- `src/tests/unit/services/auth.service.spec.ts` — El topic pide autenticacion/seguridad: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/features/auth/login/login.component.ts` — `StorageService.get`: Se invoca `get` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/auth/login/login.component.ts` — `StorageService.set`: Se invoca `set` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/auth/login/login.component.ts` — `StorageService.remove`: Se invoca `remove` sobre `StorageService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.4.0`: typescript declara la version 5.4.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior

### Brecha de conocimiento
Aplica conscientemente conceptos más profundos de consumo de servicios: intercepción de request y response, seguridad y manejo de tokens para consumo de servicios (P.ej. tokens de sesión)

### Misión / candidato
Candidato Senior con experiencia en Angular, trabajando en soluciones frontend robustas y seguras

### Reto
- Tema: autenticación
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación de autenticación robusta en Angular
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del interceptor de requests — objetivo: Implementar un interceptor de requests que añada automáticamente el token de sesión a todas las solicitudes salientes. — entregable (NO resolver): Interceptor de requests funcional que añade el token de sesión a las solicitudes.
- Fase 2: Implementación del interceptor de responses — objetivo: Implementar un interceptor de responses que maneje los tokens de sesión y las respuestas de error. — entregable (NO resolver): Interceptor de responses funcional que maneja tokens de sesión y respuestas de error.
- Fase 3: Integración y pruebas — objetivo: Integrar los interceptores de requests y responses y realizar pruebas exhaustivas. — entregable (NO resolver): Aplicación Angular con interceptores de requests y responses integrados y probados.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "angular-authentication-app",
  "version": "0.0.1",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.2.0",
    "@angular/common": "20.2.0",
    "@angular/compiler": "20.2.0",
    "@angular/core": "20.2.0",
    "@angular/forms": "20.2.0",
    "@angular/platform-browser": "20.2.0",
    "@angular/platform-browser-dynamic": "20.2.0",
    "@angular/router": "20.2.0",
    "@angular/common/http": "20.2.0",
    "@angular/material": "17.3.0",
    "rxjs": "7.8.0",
    "jwt-decode": "4.0.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-builders/jest": "17.0.0",
    "@angular-devkit/build-angular": "20.2.0",
    "@angular/cli": "20.2.0",
    "@angular/compiler-cli": "20.2.0",
    "@types/jest": "29.5.12",
    "jest": "29.7.0",
    "jest-preset-angular": "14.0.3",
    "typescript": "~5.4.0"
  },
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"],
    "globalSetup": "jest-preset-angular/global-setup",
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/src/test.ts"
    ],
    "coverageReporters": ["html", "text-summary"],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.module.ts",
      "!src/**/*.interface.ts",
      "!src/**/index.ts",
      "!src/**/*.mock.ts",
      "!src/test.ts",
      "!src/**/*.spec.ts"
    ]
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-authentication-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        },
        "@schematics/angular:service": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/angular-authentication-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "angular-authentication-app:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "angular-authentication-app:build:production"
            },
            "development": {
              "browserTarget": "angular-authentication-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "angular-authentication-app:build"
          }
        },
        "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            "configPath": "./jest.config.js",
            "tsConfig": "tsconfig.spec.json",
            "polyfills": ["zone.js", "zone.js/testing"]
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json"
            ],
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    }
  },
  "defaultProject": "angular-authentication-app",
  "cli": {
    "analytics": false,
    "packageManager": "npm"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom", "dom.iterable", "scanner"],
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
    "**/*.stories.ts",
    "src/test.ts",
    "src/**/*.mock.ts"
  ]
}

// === ARCHIVO: src/app/core/interceptors/auth-request.interceptor.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // TODO: Implementar la lógica para añadir el token de sesión a las solicitudes salientes.
    // Debe verificar si el token existe y está válido antes de añadirlo a los headers.
    // En caso de token expirado, debe manejar la renovación del token antes de proceder.
    // Solo añadir el token a rutas que no sean de autenticación (evitar loops).
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // TODO: Manejar errores específicos de autenticación (ej. 401, 403)
        return throwError(() => error);
      })
    );
  }
}

// === ARCHIVO: src/app/core/interceptors/auth-response.interceptor.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResponseInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // TODO: Procesar respuestas exitosas para extraer tokens de sesión o actualizarlos.
          // Ejemplo: Si la respuesta contiene un nuevo token, almacenarlo.
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // TODO: Manejar respuestas de error específicas (ej. 401, 403, 500).
        // Ejemplo: Redirigir a login si el token es inválido o expiró.
        return throwError(() => error);
      })
    );
  }
}

// === ARCHIVO: src/app/core/services/auth.service.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthToken } from '../models/auth.models';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: { username: string; password: string }): Observable<AuthToken> {
    // TODO: Implementar la lógica de login.
    // Debe realizar una solicitud HTTP al endpoint de autenticación.
    // Almacenar el token recibido y actualizar el estado de autenticación.
    return this.http.post<AuthToken>('/api/auth/login', credentials).pipe(
      tap((token) => {
        this.storageService.setItem(this.TOKEN_KEY, token.accessToken);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // TODO: Implementar la lógica de logout.
    // Eliminar el token de sesión y actualizar el estado de autenticación.
    this.storageService.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  refreshToken(): Observable<AuthToken> {
    // TODO: Implementar la lógica de renovación de token.
    // Debe realizar una solicitud HTTP al endpoint de renovación.
    // Almacenar el nuevo token y mantener el estado de autenticación.
    return this.http.post<AuthToken>('/api/auth/refresh', {}).pipe(
      tap((token) => {
        this.storageService.setItem(this.TOKEN_KEY, token.accessToken);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    // TODO: Implementar la lógica para obtener el token almacenado.
    // Verificar si el token existe y está válido antes de retornarlo.
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    // TODO: Implementar la lógica para verificar si el token es válido.
    // Usar jwt-decode para extraer la fecha de expiración y compararla con la fecha actual.
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRequestInterceptor } from './app/core/interceptors/auth-request.interceptor';
import { AuthResponseInterceptor } from './app/core/interceptors/auth-response.interceptor';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error('Error al bootstrap la aplicación Angular:', err));

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Angular Authentication App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Aplicación Angular con sistema de autenticación robusto">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
  <noscript>
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>JavaScript requerido</h1>
      <p>Por favor, habilite JavaScript en su navegador para usar esta aplicación.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: src/app/core/services/storage.service.ts ===
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;
  private useSessionStorage: boolean = false;

  constructor() {
    this.storage = localStorage;
  }

  setUseSessionStorage(useSession: boolean): void {
    this.useSessionStorage = useSession;
    this.storage = useSession ? sessionStorage : localStorage;
    this.migrateTokensIfNeeded();
  }

  private migrateTokensIfNeeded(): void {
    const sourceStorage = this.useSessionStorage ? localStorage : sessionStorage;
    const token = sourceStorage.getItem(TOKEN_KEY);
    if (token && !this.getToken()) {
      this.storage.setItem(TOKEN_KEY, token);
    }
    const refreshToken = sourceStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken && !this.getRefreshToken()) {
      this.storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    const expiry = sourceStorage.getItem(TOKEN_EXPIRY_KEY);
    if (expiry && !this.getTokenExpiry()) {
      this.storage.setItem(TOKEN_EXPIRY_KEY, expiry);
    }
  }

  setToken(token: string, expiresIn?: number): void {
    this.storage.setItem(TOKEN_KEY, token);
    if (expiresIn) {
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
      this.storage.setItem(TOKEN_EXPIRY_KEY, expiryDate.getTime().toString());
    }
  }

  getToken(): string | null {
    return this.storage.getItem(TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    this.storage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN_KEY);
  }

  getTokenExpiry(): number | null {
    const expiry = this.storage.getItem(TOKEN_EXPIRY_KEY);
    return expiry ? parseInt(expiry, 10) : null;
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) {
      return true;
    }
    return Date.now() > expiry;
  }

  removeToken(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(TOKEN_EXPIRY_KEY);
  }

  removeRefreshToken(): void {
    this.storage.removeItem(REFRESH_TOKEN_KEY);
  }

  clear(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(REFRESH_TOKEN_KEY);
    this.storage.removeItem(TOKEN_EXPIRY_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getStorageType(): string {
    return this.useSessionStorage ? 'sessionStorage' : 'localStorage';
  }

  setSecureItem(key: string, value: string): void {
    const encoded = btoa(encodeURIComponent(value));
    this.storage.setItem(key, encoded);
  }

  getSecureItem(key: string): string | null {
    const encoded = this.storage.getItem(key);
    if (!encoded) {
      return null;
    }
    try {
      return decodeURIComponent(atob(encoded));
    } catch {
      return null;
    }
  }
}

// === ARCHIVO: src/app/core/models/auth.models.ts ===
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
  user: UserProfile;
}

export interface TokenData {
  sub: string;
  username: string;
  email?: string;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  avatarUrl?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthError {
  error: string;
  message: string;
  statusCode: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// === ARCHIVO: src/app/core/utils/auth.utils.ts ===
import { TokenData } from '../models/auth.models';

export function decodeToken(token: string): TokenData | null {
  return null;
}

export function isTokenExpired(token: string): boolean {
  return true;
}

export function getTokenExpirationDate(token: string): Date | null {
  return null;
}

export function getTokenRemainingTime(token: string): number {
  return 0;
}

export function hasRole(token: string, role: string): boolean {
  return false;
}

export function hasAnyRole(token: string, roles: string[]): boolean {
  return false;
}

export function hasPermission(token: string, permission: string): boolean {
  return false;
}

export function formatTokenHeader(token: string): string {
  return `Bearer ${token}`;
}

export function validateTokenFormat(token: string): boolean {
  return false;
}

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { routes } from './app.routes';
import { AuthRequestInterceptor } from './core/interceptors/auth-request.interceptor';
import { AuthResponseInterceptor } from './core/interceptors/auth-response.interceptor';
import { authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([])
    ),
    provideStore({
      auth: authReducer,
      router: routerReducer
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    provideRouterStore(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthResponseInterceptor,
      multi: true
    },
    {
      provide: 'BASE_URL',
      useValue: 'http://localhost:3000'
    },
    {
      provide: 'AUTH_CONFIG',
      useValue: {
        tokenKey: 'auth_token',
        refreshTokenKey: 'refresh_token',
        tokenExpirationBuffer: 300,
        retryAttempts: 3,
        retryDelay: 1000
      }
    }
  ]
};

// === ARCHIVO: src/app/features/auth/auth.module.ts ===
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Iniciar Sesión' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Registrarse' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Recuperar Contraseña' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Restablecer Contraseña' }
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    data: { title: 'Verificar Email' }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule {
  static forRoot(): any {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}

// === ARCHIVO: src/app/features/auth/login/login.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, takeUntil, finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    ErrorMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = signal<string | null>(null);
  rememberMe = signal(false);
  
  emailValidationError = computed(() => {
    const email = this.loginForm?.get('email');
    if (email?.hasError('required') && email?.touched) {
      return 'El correo electrónico es requerido';
    }
    if (email?.hasError('email') && email?.touched) {
      return 'Por favor ingresa un correo electrónico válido';
    }
    return null;
  });
  
  passwordValidationError = computed(() => {
    const password = this.loginForm?.get('password');
    if (password?.hasError('required') && password?.touched) {
      return 'La contraseña es requerida';
    }
    if (password?.hasError('minlength') && password?.touched) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return null;
  });
  
  private destroy$ = new Subject<void>();
  
  private readonly MIN_PASSWORD_LENGTH = 8;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000;
  
  private loginAttempts = 0;
  private lockoutEndTime = 0;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated$();
      if (isAuthenticated) {
        this.handleSuccessfulLogin();
      }
    });
  }
  
  ngOnInit(): void {
    this.initializeForm();
    this.checkExistingSession();
    this.setupAutoLogoutListener();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
      rememberMe: [false]
    });
  }
  
  private checkExistingSession(): void {
    const savedEmail = this.storageService.get('saved_email');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }
  
  private setupAutoLogoutListener(): void {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        if (!isAuth && this.authService.getToken()) {
          this.handleSessionExpired();
        }
      });
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }
    
    if (this.isLockedOut()) {
      this.handleLockout();
      return;
    }
    
    this.performLogin(this.loginForm.value);
  }
  
  private performLogin(credentials: LoginForm): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.authService.login({
      email: credentials.email,
      password: credentials.password
    })
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.handleLoginSuccess(response, credentials);
      },
      error: (error) => {
        this.handleLoginError(error);
      }
    });
  }
  
  private handleLoginSuccess(response: any, credentials: LoginForm): void {
    this.loginAttempts = 0;
    
    if (credentials.rememberMe) {
      this.storageService.set('saved_email', credentials.email);
    } else {
      this.storageService.remove('saved_email');
    }
    
    this.showNotification('Bienvenido de nuevo', 'success');
    this.navigateToDashboard();
  }
  
  private handleLoginError(error: any): void {
    this.loginAttempts++;
    
    if (this.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      this.lockoutEndTime = Date.now() + this.LOCKOUT_DURATION;
      this.errorMessage.set('Has excedido el número máximo de intentos. Intenta de nuevo más tarde.');
      return;
    }
    
    const errorMsg = error?.error?.message || 'Credenciales incorrectas. Por favor intenta de nuevo.';
    this.errorMessage.set(errorMsg);
    this.showNotification(errorMsg, 'error');
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as any);
      }
    });
  }
  
  private isLockedOut(): boolean {
    return Date.now() < this.lockoutEndTime;
  }
  
  private handleLockout(): void {
    const remainingMinutes = Math.ceil((this.lockoutEndTime - Date.now()) / 60000);
    this.errorMessage.set(`Cuenta bloqueada. Intenta de nuevo en ${remainingMinutes} minutos.`);
    this.showNotification('Cuenta bloqueada temporalmente', 'error');
  }
  
  private handleSessionExpired(): void {
    this.showNotification('Tu sesión ha expirado. Por favor inicia sesión nuevamente.', 'warning');
  }
  
  private handleSuccessfulLogin(): void {
    this.navigateToDashboard();
  }
  
  private navigateToDashboard(): void {
    const returnUrl = this.getReturnUrl();
    this.router.navigateByUrl(returnUrl || '/dashboard');
  }
  
  private getReturnUrl(): string | null {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('returnUrl');
  }
  
  private showNotification(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: type === 'error' ? 0 : 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
  }
  
  togglePasswordVisibility(): void {
    this.hidePassword.update(v => !v);
  }
  
  get f() {
    return this.loginForm.controls;
  }
  
  onRememberMeChange(checked: boolean): void {
    this.rememberMe.set(checked);
  }
}

// === ARCHIVO: src/app/shared/components/error-message/error-message.component.ts ===
import { Component, Input, ChangeDetectionStrategy, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="hasError()" 
      class="error-container" 
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div class="error-icon" aria-hidden="true">!</div>
      <div class="error-content">
        <span class="error-message">{{ errorMessage() }}</span>
        <button 
          *ngIf="dismissible" 
          class="dismiss-button" 
          (click)="dismiss()"
          aria-label="Cerrar mensaje de error">
          ×
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background-color: #fff5f5;
      border: 1px solid #fc8181;
      border-radius: 8px;
      margin: 8px 0;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: #e53e3e;
      color: white;
      font-weight: bold;
      border-radius: 50%;
      flex-shrink: 0;
      font-size: 14px;
    }

    .error-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 8px;
    }

    .error-message {
      color: #c53030;
      font-size: 14px;
      line-height: 1.5;
      word-break: break-word;
    }

    .dismiss-button {
      background: none;
      border: none;
      color: #c53030;
      font-size: 20px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .dismiss-button:hover {
      opacity: 1;
    }

    .dismiss-button:focus {
      outline: 2px solid #e53e3e;
      outline-offset: 2px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() set error(value: string | null | undefined) {
    this._error.set(value ?? null);
  }

  @Input() dismissible = true;

  @Input() set visible(value: boolean) {
    this._visible.set(value);
  }

  private readonly _error: Signal<string | null> = signal(null);
  private readonly _visible: Signal<boolean> = signal(true);

  readonly errorMessage: Signal<string> = computed(() => this._error() ?? '');

  readonly hasError: Signal<boolean> = computed(
    () => this._visible() && !!this._error()
  );

  readonly dismiss = (): void => {
    this._visible.set(false);
  };

  readonly show = (): void => {
    this._visible.set(true);
  };
}

function signal<T>(value: T): Signal<T> {
  return { value } as Signal<T>;
}

// === ARCHIVO: src/tests/unit/interceptors/auth-request.interceptor.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthRequestInterceptor } from '@app/core/interceptors/auth-request.interceptor';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

describe('AuthRequestInterceptor', () => {
  let interceptor: AuthRequestInterceptor;
  let authServiceMock: jest.Mocked<AuthService>;
  let storageServiceMock: jest.Mocked<StorageService>;
  let nextHandler: HttpHandlerFn;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      isTokenValid: jest.fn(),
      refreshToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    storageServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    nextHandler = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => of({} as HttpEvent<unknown>);

    TestBed.configureTestingModule({
      providers: [
        AuthRequestInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    interceptor = TestBed.inject(AuthRequestInterceptor);
  });

  it('debería crear el interceptor correctamente', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept - añadir token a requests', () => {
    it('debería añadir el token de autenticación cuando es válido', () => {
      const mockToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).toHaveBeenCalled();
    });

    it('no debería modificar el header Authorization si no hay token', () => {
      authServiceMock.getToken.mockReturnValue(null);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).toHaveBeenCalled();
    });

    it('debería clonar la request original sin modificar la original', () => {
      const mockToken = 'Bearer mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(mockRequest.headers.has('Authorization')).toBe(false);
    });

    it('debería pasar la request al siguiente handler', (done) => {
      const mockToken = 'Bearer mock-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(true);

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler).subscribe({
        next: () => {
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('intercept - manejo de token expirado antes de request', () => {
    it('debería intentar renovar token si está próximo a expirar', () => {
      const mockToken = 'Bearer expired-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(false);
      authServiceMock.refreshToken.mockReturnValue(of({ access_token: 'new-token', expires_in: 3600 }));

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.refreshToken).toHaveBeenCalled();
    });
  });

  describe('intercept - casos edge', () => {
    it('debería manejar errores en la renovación de token', () => {
      const mockToken = 'Bearer expired-token';
      authServiceMock.getToken.mockReturnValue(mockToken);
      authServiceMock.isTokenValid.mockReturnValue(false);
      authServiceMock.refreshToken.mockReturnValue(throwError(() => new Error('Token refresh failed')));

      const mockRequest = new HttpRequest('GET', '/api/users');
      
      interceptor.intercept(mockRequest, nextHandler).subscribe({
        next: () => {},
        error: (error) => {
          expect(error).toBeDefined();
        },
      });
    });

    it('no debería añadir token a requests de autenticación', () => {
      authServiceMock.getToken.mockReturnValue(null);

      const mockRequest = new HttpRequest('POST', '/api/auth/login', { username: 'test', password: 'test' });
      
      interceptor.intercept(mockRequest, nextHandler);

      expect(authServiceMock.getToken).not.toHaveBeenCalled();
    });
  });
});

// === ARCHIVO: src/tests/unit/interceptors/auth-response.interceptor.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthResponseInterceptor } from '@app/core/interceptors/auth-response.interceptor';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

describe('AuthResponseInterceptor', () => {
  let interceptor: AuthResponseInterceptor;
  let authServiceMock: jest.Mocked<AuthService>;
  let storageServiceMock: jest.Mocked<StorageService>;
  let nextHandler: HttpHandlerFn;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    storageServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    nextHandler = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => of({} as HttpEvent<unknown>);

    TestBed.configureTestingModule({
      providers: [
        AuthResponseInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    interceptor = TestBed.inject(AuthResponseInterceptor);
  });

  it('debería crear el interceptor correctamente', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept - manejo de respuestas exitosas', () => {
    it('debería pasar las respuestas exitosas sin modificación', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      const mockResponse = of({} as HttpEvent<unknown>);
      
      const successHandler = jest.fn(() => mockResponse);

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: (event) => {
          expect(event).toBeDefined();
          done();
        },
        error: done.fail,
      });

      expect(successHandler).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('intercept - manejo de errores 401', () => {
    it('debería intentar renovar token en error 401', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        url: '/api/users',
      });

      const retryHandler = jest.fn(() => of({} as HttpEvent<unknown>));
      authServiceMock.refreshToken.mockReturnValue(of({ access_token: 'new-token', expires_in: 3600 }));

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: (event) => {
          done();
        },
        error: (error) => {
          done.fail('No debería entrar en error cuando la renovación es exitosa');
        },
      });
    });

    it('debería hacer logout si la renovación de token falla', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        url: '/api/users',
      });

      authServiceMock.refreshToken.mockReturnValue(throwError(() => new Error('Refresh failed')));

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('intercept - manejo de errores 403', () => {
    it('debería hacer logout en error 403 Forbidden', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/admin');
      
      const errorResponse = new HttpErrorResponse({
        status: 403,
        statusText: 'Forbidden',
        url: '/api/admin',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('intercept - otros errores', () => {
    it('debería propagar errores sin hacer logout para errores distintos a 401/403', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        url: '/api/users',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: () => {
          expect(authServiceMock.logout).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('debería manejar errores de red correctamente', (done) => {
      const mockRequest = new HttpRequest('GET', '/api/users');
      
      const errorResponse = new HttpErrorResponse({
        status: 0,
        statusText: 'Network Error',
        url: '/api/users',
      });

      const successHandler = jest.fn(() => throwError(() => errorResponse));

      interceptor.intercept(mockRequest, successHandler).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error).toBeDefined();
          done();
        },
      });
    });
  });
});

// === ARCHIVO: src/tests/unit/services/auth.service.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '@app/core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';
import { AuthToken, LoginCredentials } from '@app/core/models/auth.models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageServiceMock: jest.Mocked<StorageService>;

  const mockToken: AuthToken = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'Bearer',
  };

  const mockCredentials: LoginCredentials = {
    username: 'testuser',
    password: 'testpassword',
  };

  beforeEach(() => {
    storageServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<StorageService>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('debería realizar login correctamente y guardar el token', (done) => {
      service.login(mockCredentials).subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCredentials);
      req.flush(mockToken);
    });

    it('debería guardar el token en el storage después del login', (done) => {
      service.login(mockCredentials).subscribe({
        next: () => {
          expect(storageServiceMock.set).toHaveBeenCalledWith('token', mockToken.access_token);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush(mockToken);
    });

    it('debería manejar errores de login correctamente', (done) => {
      service.login(mockCredentials).subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error.status).toBe(401);
          done();
        },
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('logout', () => {
    it('debería limpiar el token del storage al hacer logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      expect(storageServiceMock.remove).toHaveBeenCalledWith('token');
    });

    it('debería limpiar el refresh token del storage al hacer logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      expect(storageServiceMock.remove).toHaveBeenCalledWith('refresh_token');
    });

    it('debería actualizar el estado de autenticación después del logout', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      service.logout();

      service.isAuthenticated$.subscribe((isAuth) => {
        expect(isAuth).toBe(false);
      });
    });
  });

  describe('refreshToken', () => {
    it('debería renovar el token correctamente', (done) => {
      service.refreshToken().subscribe({
        next: (token) => {
          expect(token).toEqual(mockToken);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      expect(req.request.method).toBe('POST');
      req.flush(mockToken);
    });

    it('debería guardar el nuevo token después de la renovación', (done) => {
      service.refreshToken().subscribe({
        next: () => {
          expect(storageServiceMock.set).toHaveBeenCalledWith('token', mockToken.access_token);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      req.flush(mockToken);
    });

    it('debería manejar errores al renovar token', (done) => {
      service.refreshToken().subscribe({
        next: () => {
          done.fail('No debería entrar en next');
        },
        error: (error) => {
          expect(error.status).toBe(401);
          done();
        },
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      req.flush('Token expired', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getToken', () => {
    it('debería obtener el token del storage', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      const token = service.getToken();

      expect(token).toBe('mock-token');
      expect(storageServiceMock.get).toHaveBeenCalledWith('token');
    });

    it('debería retornar null si no hay token', () => {
      storageServiceMock.get.mockReturnValue(null);
      
      const token = service.getToken();

      expect(token).toBeNull();
    });
  });

  describe('isTokenValid', () => {
    it('debería retornar true si el token es válido', () => {
      storageServiceMock.get.mockReturnValue('mock-token');
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(true);
    });

    it('debería retornar false si no hay token', () => {
      storageServiceMock.get.mockReturnValue(null);
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(false);
    });

    it('debería retornar false si el token está expirado', () => {
      storageServiceMock.get.mockReturnValue('expired-token');
      
      const isValid = service.isTokenValid();

      expect(isValid).toBe(false);
    });
  });
});

// === ARCHIVO: README.md ===
# Angular Authentication App

## Descripción del Proyecto

Aplicación Angular que implementa un sistema robusto de autenticación con manejo de tokens de sesión, interceptores HTTP y renovación automática de tokens. El sistema está diseñado para soportar alta carga (1.500 solicitudes/segundo) con latencia inferior a 200ms.

## Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 20.2.0

## Instalación

```bash
# Instalar dependencias del proyecto
npm install

# Verificar instalación de dependencias
npm ls --depth=0
```

## Ejecución del Proyecto

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### Producción

```bash
# Construir aplicación para producción
npm run build

# Los archivos compilados se generarán en dist/angular-authentication-app
```

## Ejecución de Pruebas

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

La cobertura de código se generará en el directorio `coverage/`. Abra `coverage/lcov-report/index.html` en un navegador para ver el reporte detallado.

## Estructura del Proyecto

```
angular-authentication-app/
├── src/
│   ├── app/
│   │   ├── core/                    # Núcleo de la aplicación
│   │   │   ├── interceptors/        # Interceptores HTTP
│   │   │   │   ├── auth-request.interceptor.ts
│   │   │   │   └── auth-response.interceptor.ts
│   │   │   ├── services/            # Servicios principales
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── storage.service.ts
│   │   │   ├── models/              # Modelos de datos
│   │   │   │   └── auth.models.ts
│   │   │   └── utils/               # Utilidades
│   │   │       └── auth.utils.ts
│   │   ├── features/                # Funcionalidades
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   └── login.component.ts
│   │   │       └── auth.module.ts
│   │   ├── shared/                  # Componentes compartidos
│   │   │   └── components/
│   │   │       └── error-message/
│   │   │           └── error-message.component.ts
│   │   ├── app.config.ts            # Configuración de la app
│   │   └── app.routes.ts            # Rutas de la aplicación
│   ├── assets/                      # Recursos estáticos
│   ├── styles.scss                  # Estilos globales
│   ├── index.html                   # Punto de entrada HTML
│   └── main.ts                      # Bootstrap de Angular
├── tests/
│   └── unit/                        # Pruebas unitarias
├── angular.json                     # Configuración de Angular CLI
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias del proyecto
└── README.md                        # Este archivo
```

## Arquitectura del Sistema de Autenticación

### Flujo de Autenticación

1. **Login**: El usuario ingresa credenciales a través del componente de login
2. **AuthService**: Valida credenciales y obtiene token de acceso del backend
3. **StorageService**: Almacena el token de forma segura en el cliente
4. **AuthRequestInterceptor**: Añade el token a todas las solicitudes salientes
5. **AuthResponseInterceptor**: Maneja respuestas y renovación automática de tokens

### Componentes Clave

#### AuthService

Servicio principal que gestiona la autenticación. Proporciona:
- `login(credentials)`: Autentica al usuario y obtiene token
- `logout()`: Cierra sesión y limpia tokens
- `refreshToken()`: Renueva token expirado
- `getToken()`: Obtiene el token actual
- `isTokenValid()`: Valida la vigencia del token

#### Interceptores HTTP

**AuthRequestInterceptor**: Añade el token de autorización a cada solicitud saliente.

**AuthResponseInterceptor**: Maneja respuestas del servidor incluyendo:
- Renovación automática de tokens expirados
- Redirección a login en caso de autenticación fallida
- Manejo de errores de servidor

### Modelos de Datos

El sistema utiliza modelos TypeScript estrictos para garantizar la integridad de los datos de autenticación.

## Configuración de Variables de Entorno

Las variables de configuración se gestionan a través de los archivos de entorno de Angular. Configure las URLs del backend y parámetros de autenticación según el entorno de despliegue.

## Consideraciones de Seguridad

- Los tokens se almacenan de forma segura utilizando sessionStorage o localStorage
- Los interceptores manejan automáticamente la expiración de tokens
- Se implementa renovación automática de tokens antes de su expiración
- Las credenciales nunca se almacenan en texto plano
- Comunicación siempre a través de HTTPS en producción

## Rendimiento

El sistema está optimizado para manejar alta carga:
- Soporta hasta 1.500 solicitudes por segundo
- Latencia de respuesta inferior a 200ms
- Uso eficiente de RxJS para manejo reactivo de flujos
- Interceptores ligeros que minimizan overhead en cada solicitud

## Troubleshooting

### Error: Cannot find module

Ejecute `npm install` para reinstallar todas las dependencias.

### Error: Port 4200 is already in use

Utilice `npm start -- --port <puerto>` para especificar un puerto diferente.

### Pruebas fallan

Verifique que todas las dependencias estén correctamente instaladas y que el entorno de pruebas esté configurado.

## Contribución

Para contribuir al proyecto:
1. Cree una rama desde `main`
2. Realice sus cambios
3. Ejecute las pruebas unitarias
4. Envíe un pull request

## Licencia

Este proyecto es parte del ejercicio de evaluación de habilidades de desarrollo Angular.
```
