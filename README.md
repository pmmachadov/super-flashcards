# 📚 Flashcards App - Adaptada para DAW (IOC Barcelona)

Aplicación de flashcards mejorada y optimizada para estudiar el **Grado Superior de Desarrollo de Aplicaciones Web (DAW)** en la IOC de Barcelona.

## 🎯 Características Principales

### ✅ Implementaciones Completadas

#### 1. **Módulos DAW Completos**

Se han añadido todos los módulos del ciclo formativo con 3 flashcards de ejemplo cada uno:

- **M01 - Sistemas Informáticos** (198h) - Hardware, BIOS/UEFI, RAID
- **M02 - Bases de Datos** (198h) - SQL, NoSQL, normalización, SGBD
- **M03A - Programación** (99h) - Java, fundamentos, estructuras de datos
- **M03B - Programación Orientada a Objetos** (99h) - POO, herencia, polimorfismo, patrones
- **M04 - Lenguaje de Marcas y Sistemas de Gestión de Información** (132h) - XML, JSON, YAML, XPath
- **M05 - Entornos de Desarrollo** (99h) - IDEs, Git, testing, depuración
- **M06 - Desarrollo Web en el Entorno Cliente** (165h) - JavaScript, React, DOM, Event Loop
- **M07 - Desarrollo Web en el Entorno Servidor** (198h) - HTTP, REST, API, autenticación
- **M08 - Despliegue de Aplicaciones Web** (99h) - Docker, CI/CD, servidores
- **M09 - Diseño de Interfaces Web** (165h) - CSS, Flexbox, Grid, accesibilidad
- **M10 - Formación y Orientación Laboral** (99h) - Contratos, nóminas, PRL
- **M11 - Empresa e Iniciativa Emprendedora** (66h) - Sociedades, plan empresa, marketing

#### 2. **Sistema de Estadísticas Avanzado**

- **Progreso por módulo**: Visualización del porcentaje completado
- **Tracking detallado**:
  - Tarjetas dominadas ✓
  - Tarjetas en estudio 📚
  - Tarjetas sin empezar ⏳
  - Total de intentos
- **Historial de sesiones de estudio**
- **Sistema de PACs**: Guarda resultados de exámenes simulados

#### 3. **🎓 Modo Examen / Simulación PAC**

- Exámenes con tiempo límite configurable
- Número de preguntas personalizable (3-50)
- Preguntas aleatorias del módulo actual
- Evaluación automática con porcentaje
- Guardado de resultados históricos
- Indicador visual de tiempo restante con alertas

#### 4. **🏷️ Sistema de Tags por Unidad Formativa**

Todas las flashcards incluyen tags para filtrar por:

- Unidad Formativa (UF1, UF2, UF3...)
- Temática específica (fundamentos, avanzado, práctica...)
- Tipo de contenido (teoría, código, ejercicios...)

**Filtrado inteligente**:

- Muestra contador de dominadas/totales por tag
- Resetea la navegación al cambiar filtro
- Permite ver todas o filtrar por tema específico

#### 5. **💻 Resaltado de Sintaxis Multilenguaje**

Detección automática y resaltado mejorado para:

- **JavaScript/TypeScript**: keywords, functions, classes, promises
- **Java**: tipos, modificadores, POO
- **Python**: decorators, self, keywords específicos
- **PHP**: variables ($), tags (<?php), echo/print
- **SQL**: SELECT, JOIN, WHERE, funciones agregadas
- **HTML**: tags, atributos
- **CSS**: propiedades, valores, unidades

Colores optimizados para mejor legibilidad con efectos de glow.

#### 6. **📊 Vista de Progreso**

Panel dedicado que muestra:

- Código del módulo y horas lectivas
- Barra de progreso visual
- Grid con estadísticas desglosadas
- Resumen de intentos totales

#### 7. **🎨 Interfaz Mejorada**

- Pantalla de bienvenida con características destacadas
- 4 vistas principales: Flashcards, Examen, Progreso, Gestión
- Iconos para mejor identificación visual
- Diseño responsive y moderno
- Transiciones suaves

## 🚀 Uso de la Aplicación

### Estudiar con Flashcards

1. Selecciona un módulo DAW
2. Usa los filtros de tags para estudiar UFs específicas
3. Navega entre tarjetas o selecciona aleatoria
4. Marca si recuerdas o no cada concepto

### Modo Examen

1. Accede a "🎓 Modo Examen"
2. Configura número de preguntas y duración
3. Responde visualizando cada pregunta
4. Auto-evalúa tus respuestas
5. Visualiza tus resultados al finalizar

### Seguimiento

1. Entra en "📊 Progreso"
2. Visualiza tu avance por módulo
3. Identifica áreas a reforzar
4. Revisa tu historial de PACs

## 🛠️ Tecnologías

- **React 19** con Hooks
- **Vite** como bundler
- **LocalStorage** para persistencia
- **CSS modular** con variables
- **Playwright** para testing E2E

## 📝 Estructura de Datos

### Flashcards con Tags

```json
{
  "id": 1,
  "question": "¿Qué es un SGBD?",
  "answer": "Un Sistema Gestor de Bases de Datos...",
  "tags": ["UF1", "fundamentos", "teoria"]
}
```

### Subjects con Metadata

```json
{
  "id": "bases-datos",
  "name": "Bases de Datos",
  "code": "M02",
  "hours": 198,
  "color": "#16a085"
}
```

## 🎓 Adaptación al Ciclo DAW

Esta aplicación está específicamente diseñada para:

- Preparar PACs (Pruebas de Evaluación Continua)
- Repasar conceptos clave antes de exámenes
- Estudiar de forma progresiva por UFs
- Practicar con código de múltiples lenguajes
- Hacer seguimiento del progreso en cada módulo

## 🔜 Posibles Mejoras Futuras

- Sincronización en la nube
- Modo colaborativo para compartir flashcards
- Estadísticas comparativas entre módulos
- Recordatorios de estudio
- Exportación de estadísticas a PDF
- Modo oscuro/claro
- Integración con calendario académico IOC

## 📄 Licencia

Proyecto educativo para uso personal.

---

**¡Buena suerte con tu Grado Superior en DAW!** 🚀📚
