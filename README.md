# TestingLogin

## ✅ Requisitos para empezar
### 1. Crear una cuenta en GitHub

1. Ir a [https://github.com](https://github.com)
2. Hacer clic en "Sign up" (registrarse).
3. Seguir los pasos para crear tu cuenta gratuita.

### 2. Instalar Git

Si usás Windows:

1. Descargar Git desde [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Ejecutar el instalador con las opciones por defecto.

Si usás macOS:

```bash
brew install git
```

## 📥 Clonar este repositorio

Una vez que tengas Git instalado y tu cuenta de GitHub creada, podés descargar el proyecto a tu computadora.

1. Abrí la terminal o línea de comandos.
2. Elegí una carpeta donde quieras guardar el proyecto.
3. Ejecutá el siguiente comando:

```bash
git clone https://github.com/SabrinaDiLeva/TestingLogin.git
```

4. Entrá a la carpeta del proyecto:
```bash
cd nombre-del-repositorio
```

## 🧑‍💻 Cómo trabajar con el proyecto

### Abrir el proyecto en un editor de código

Se recomienda usar [Visual Studio Code](https://code.visualstudio.com/), pero podés usar cualquier editor de texto que prefieras.

1. Abrí Visual Studio Code.
2. Hacé clic en **Archivo > Abrir carpeta...**.
3. Seleccioná la carpeta del proyecto que clonaste.
4. Una vez abierta, vas a ver los archivos del proyecto listados en el panel lateral.

## ▶️ Cómo ejecutar el proyecto

### ✅ Opción 1: Abrir directamente en el navegador

1. Abrí la carpeta del proyecto.
2. Hacé doble clic en el archivo `index.html`.
3. Se abrirá automáticamente en tu navegador por defecto.

> ⚠️ Esto funciona perfecto para proyectos simples. Cuando empecemos a usar rutas más complejas con JavaScript que necesita un servidor, puede haber limitaciones.

![alt text](img/image.png)

---

### ✅ Opción 2: Usar un servidor local con Visual Studio Code

1. Abrí la carpeta del proyecto con **Visual Studio Code**.
2. Instalá la extensión **Live Server**:
   - Hacé clic en el ícono de extensiones en la barra lateral.
   - Buscá `Live Server` y hacé clic en “Instalar”.

![alt text](img/image-1.png)

3. Abrí el archivo `index.html`.
4. Hacé clic derecho en el editor y seleccioná **“Open with Live Server”**.

![alt text](img/image-2.png)

5. Tu navegador se abrirá automáticamente con la página, y se actualizará cada vez que guardes cambios.

> 💡 Esta es la opción recomendada para desarrollo, porque te permite ver los cambios en tiempo real.

## 🔄 Actualizar el proyecto

Si otras personas hacen cambios en el repositorio, podés traer esos cambios a tu computadora con:

```bash
git pull origin main
```
