# Guía Explicativa del Proyecto: Red Social con React y Vite

## 1. Arquitectura General y Enrutamiento (React Router v6)
El proyecto pasó de ser un conjunto de páginas estáticas HTML a una **Single Page Application (SPA)** usando React. Para lograr la navegación sin recargar la página, implementamos **React Router DOM**.

*   **`main.jsx`**: Es el punto de entrada. Aquí envolvemos toda la aplicación en un `<BrowserRouter>` (habilita el sistema de rutas) y el `<AuthProvider>` (provee el estado del usuario logueado a toda la app).
*   **`App.jsx`**: Es el "mapa" de la aplicación. Usamos el componente `<Routes>` para definir qué componente se renderiza según la URL:
    *   **Rutas Públicas**: `/login` y `/registro`.
    *   **Rutas Anidadas y Privadas**: Utilizamos una ruta padre sin path que renderiza el `<Layout />`. Todas las rutas hijas (como `/`, `/perfil`, etc.) se insertan dentro del Layout.
    *   **Ruta 404 (`*`)**: Atrapa cualquier URL que no exista y muestra el componente `NotFound`.

## 2. Protección de Rutas (El componente `ProtectedRoute`)
El profesor pidió rutas restringidas. Para esto creamos un componente "Guardián":
*   **`ProtectedRoute.jsx`**: Recibe un componente hijo (por ejemplo, el contenido de `<Home />`). Primero verifica si el usuario está autenticado (leyendo nuestro `AuthContext`).
    *   Si **no está autenticado**: Retorna un componente `<Navigate to="/login" />`, que intercepta y redirige automáticamente al login.
    *   Si **está autenticado**: Retorna el `children`, permitiendo que el navegador renderice la página solicitada.

## 3. Estados Globales (Context API)
En React, si necesitas que información (como el usuario logueado o los likes de un post) esté disponible en muchas páginas sin pasar *props* manualmente por cada nivel, se usa el **Context API**.

*   **`AuthContext.jsx`**: Simula el "Backend" y la Base de Datos.
    *   Usa `localStorage` para que la sesión y los usuarios registrados no se pierdan al recargar la pestaña o cerrar el navegador.
    *   Provee variables y funciones: `user` (datos del usuario logueado), `isAuthenticated` (booleano), `login()`, `register()`, `logout()`.
*   **`PostContext.jsx`**: Almacena el estado global de la publicación de prueba (likes, shares, comentarios). *Nota: Se separó del archivo `App.jsx` original porque Vite requiere que los contextos y los componentes estén en archivos distintos para poder inyectar cambios en vivo sin romper la página (el error de Fast Refresh que solucionamos).*

## 4. Componentes Compartidos (Estructura de la Interfaz)
Para no copiar y pegar el menú y el pie de página en cada una de las 7 vistas, los unificamos:
*   **`Layout.jsx`**: Funciona como un "molde". Renderiza el `Navbar` arriba, el `Footer` abajo, y en el medio pone un componente de React Router llamado `<Outlet />`. React Router inyecta la página activa (Home, Perfil, etc.) justo por el hueco que deja el `Outlet`.
*   **`Navbar.jsx`**: Es un menú dinámico. Consume el `AuthContext`. Si el usuario está logueado, muestra los enlaces a Perfil, Chat, etc., el nombre del usuario y el botón de Cerrar Sesión. Si no, solo muestra Login y Registro. Usamos `<NavLink>` en lugar de enlaces normales `<a>` porque este componente añade automáticamente la clase CSS `active` si la ruta actual coincide con la suya.

## 5. Conversión de Páginas HTML a JSX (Carpeta `pages`)
Transformamos cada archivo `.html` del profesor en un componente funcional (`.jsx`):
*   **Cambios técnicos principales**: 
    *   Atributos como `class` pasaron a `className`.
    *   Etiquetas sin cerrar (como `<img ... >` o `<input>`) se cerraron como exige JSX (`<img />`).
    *   Estilos en línea pasaron de strings (`style="max-width:1400px"`) a objetos de JavaScript (`style={{ maxWidth: '1400px' }}`).
*   **`Login.jsx` y `Registro.jsx`**: Convertimos los formularios estáticos a **"Componentes Controlados"**. Esto significa que los valores de los inputs están atados en tiempo real al estado (`useState`) de React. Al enviar el formulario (`onSubmit`), prevenimos que la página se recargue (`e.preventDefault()`) y ejecutamos la lógica del `AuthContext`.
*   **`Chat.jsx`**: Pasó de ser visualmente falso a tener una funcionalidad básica. Se le agregó un `useState` para leer lo que el usuario tipea y una lista reactiva (`conversation`) que crece usando el *spread operator* (`[...conversation, newMessage]`) para que el mensaje nuevo aparezca en pantalla instantáneamente.
*   **`Configuracion.jsx`**: Se eliminó el JavaScript tradicional (*Vanilla JS* con `document.getElementById`) del profesor. Ahora usamos "El Modo React": creamos un estado `activeTab` que guarda el nombre de la pestaña que queremos ver. React se encarga de mostrar u ocultar los `div` automáticamente basándose en ese estado (`display: activeTab === 'General' ? 'block' : 'none'`).

---

## 💡 Tip Final para tu exposición
Si el profesor te pregunta *"¿Cómo lograste restringir el acceso a las páginas protegidas?"*, le puedes responder con mucha seguridad:

> *"Implementé Context API (`AuthContext`) para manejar el estado global de la sesión persistiendo los datos en el `localStorage`. Luego, creé un componente superior llamado `ProtectedRoute` que envuelve las rutas protegidas en `App.jsx`. Cuando el usuario intenta entrar a una ruta, este guardián verifica en el Contexto si hay un usuario válido. Si no lo hay, intercepta la carga y hace una redirección imperativa a la vista de Login mediante el componente `<Navigate>` de React Router."*
