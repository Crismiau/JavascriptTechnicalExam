// Importamos las funciones del CRUD Y NAVIGATE
import { getUser, addUsers, deleteUser, updateUser } from "./crud.js";
import {
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} from "./crud.js";
import { navigate } from "./navigation.js";

// Lógica que se ejecuta al mostrar el formulario de login
export function setupLoginForm() {
  const form = document.getElementById("login-spa"); // Formulario de login

  if (!form) return; // Si no se encuentra el formulario, salimos

  // Evento cuando el usuario envía el formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const email = document.getElementById("email").value; // Tomamos el valor del input email
    const password = document.getElementById("password").value; // Tomamos el valor del input password

    const users = await getUser(); // Obtenemos los usuarios desde el backend o JSON

    // Buscamos si existe un usuario con el mismo email y contraseña
    const foundUser = users.find(
      (u) => u.email === email && String(u.password) === password
    );

    if (foundUser) {
      // Si lo encontramos, iniciamos sesión guardando Auth y rol
      localStorage.setItem("Auth", "true");
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem("userId", foundUser.id);
      localStorage.setItem(
        "userName",
        foundUser.name || foundUser.nombre || "Usuario"
      );
      // Actualizamos la información del usuario en el nav
      updateUserInfo();
      // Redirigimos a la vista de productos
      navigate("/events");
    } else {
      alert("Usuario o contraseña incorrectos"); // Mostramos error
    }
  });

  if (foundUser) {
  localStorage.setItem("Auth", "true");
  localStorage.setItem("role", foundUser.role);
  localStorage.setItem("userName", foundUser.name || foundUser.nombre || "Usuario");
  localStorage.setItem("userId", foundUser.id);
  updateUserInfo();
  navigate("/events");
}
}

// Lógica que se ejecuta al mostrar el formulario de nuevo usuario
export function setupNewUserForm() {
  const form = document.querySelector(".new-user-form"); // Formulario de nuevo usuario

  if (!form) return; // Si no se encuentra el formulario, salimos

  // Evento cuando el usuario envía el formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    // Obtenemos todos los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("rol").value;
    const password = document.getElementById("password").value;
    // Validaciones básicas
    if (!nombre || !telefono || !email || !role || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Crear objeto con los datos del usuario
    const user = {
      name: nombre,
      email: email,
      password: password,
      role: role,
      phone: telefono,
    };
    try {
      // Llamar a la función del CRUD para crear el usuario
      const result = await addUsers(user);

      if (result) {
        // Si se creó exitosamente, limpiar el formulario y mostrar mensaje
        form.reset();
        alert("Usuario creado exitosamente");
        // Redirigir a la lista de usuarios
        navigate("/users");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear el usuario. Por favor, intenta de nuevo.", error);
    }
  });
}

export async function setupUsers() {
  // Cargar usuarios reales desde el CRUD
  try {
    const users = await getUser();
    const usersList = document.querySelector(".users-list");

    if (usersList && users.length > 0) {
      // Limpiar la lista actual
      usersList.innerHTML = "";

      // Crear elementos para cada usuario
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="user-info">
            <i class="fas fa-user-circle"></i>
            <span>${user.nombre || user.name || "Usuario"} |</span>
            <span>${user.role || user.role || "Usuario"}   |</span>
            <span>${user.phone || user.phone || "Celular"}</span>
            
            </div>
          <div class="user-actions">
            <button class="admin-btn" onclick="editUser('${user.id}')">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="admin-btn" onclick="deleteUserFromList('${
              user.id
            }')">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        `;
        usersList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

// Función para actualizar la visibilidad de los enlaces de navegación
export function updateNavVisibility() {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";

  // Enlaces que solo deben ver los administradores
  const adminLinks = document.querySelectorAll('[data-admin-only="true"]');

  adminLinks.forEach((link) => {
    if (isAdmin) {
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
  });
}

// Función para actualizar la información del usuario en el nav
export function updateUserInfo() {
  const userNameElement = document.getElementById("user-name");
  const userRoleElement = document.getElementById("user-role");

  if (userNameElement && userRoleElement) {
    const userName = localStorage.getItem("userName") || "Usuario";
    const userRole = localStorage.getItem("role") || "Usuario";

    userNameElement.textContent = userName;
    userRoleElement.textContent = userRole;
  }

  // Actualizar visibilidad de enlaces según el rol
  updateNavVisibility();
}

// Funciones globales para editar y eliminar usuarios
export function setupGlobalFunctions() {
  // Configurar botón de cerrar sesión (disponible globalmente)
  const buttonCloseSession = document.getElementById("close-sesion");
  if (buttonCloseSession) {
    // Remover eventos previos para evitar duplicados
    buttonCloseSession.replaceWith(buttonCloseSession.cloneNode(true));
    const newButtonCloseSession = document.getElementById("close-sesion");

    newButtonCloseSession.addEventListener("click", () => {
      // Mostramos confirmación antes de cerrar sesión
      const confirmarCerrarSesion = confirm(
        "¿Estás seguro que quieres cerrar sesión?"
      );

      if (confirmarCerrarSesion) {
        // Si confirma, eliminamos los datos del usuario del localStorage
        localStorage.setItem("Auth", "false");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId"); // <-- Agregamos esta línea para eliminar el ID del usuario
        // Actualizamos la información del usuario en el nav
        updateUserInfo();
        // Redirigir al login
        navigate("/login");
      }
      // Si no confirma, no hacemos nada y se mantiene en la página actual
    });
  }

  // Función para editar usuario
  window.editUser = async (id) => {
    try {
      // Obtener los datos del usuario a editar
      const users = await getUser();
      // Convertir el ID a número para comparación consistente
      const userToEdit = users.find((user) => user.id == id);

      if (!userToEdit) {
        alert("Usuario no encontrado");
        return;
      }

      // Crear un formulario de edición simple
      const newName = prompt(
        "Nuevo nombre:",
        userToEdit.name || userToEdit.nombre
      );
      const newRole = prompt("Nuevo rol (admin/user):", userToEdit.role);
      const newPhone = prompt(
        "Nuevo teléfono:",
        userToEdit.phone || userToEdit.telefono
      );
      const newEmail = prompt("Nuevo email:", userToEdit.email);
      const newPassword = prompt(
        "Nueva contraseña (dejar vacío para mantener la actual):",
        ""
      );

      // Validar que se ingresaron datos obligatorios
      if (!newName || !newRole || !newPhone || !newEmail) {
        alert("Los campos nombre, rol, teléfono y email son obligatorios");
        return;
      }

      // Crear objeto con los datos actualizados
      const updatedUser = {
        name: newName,
        role: newRole,
        phone: newPhone,
        email: newEmail,
        password: newPassword || userToEdit.password, // Mantener contraseña actual si no se ingresa nueva
      };

      // Llamar a la función del CRUD para actualizar
      const result = await updateUser(id, updatedUser);

      if (result) {
        alert("Usuario actualizado exitosamente");
        // Recargar la lista de usuarios
        setupUsers();
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
      alert("Error al editar el usuario: " + error.message);
    }
  };

  // Función para eliminar usuario
  window.deleteUserFromList = async (id) => {
    const confirmarEliminar = confirm(
      "¿Estás seguro que quieres eliminar este usuario?"
    );

    if (confirmarEliminar) {
      try {
        // Convertir el ID a número para consistencia
        const result = await deleteUser(id);

        if (result) {
          alert("Usuario eliminado exitosamente");
          // Recargar la lista de usuarios
          setupUsers();
        } else {
          alert("Error al eliminar el usuario");
        }
      } catch (error) {
        console.error("Error al eliminar usuarioaaa:", error);
        alert("Error al eliminar el usuariaaaao: " + error.message);
      }
    }
  };
}

export async function setupEvents() {
  const productsGrid = document.getElementById("products-grid");
  const addProductBtn = document.getElementById("add-product-btn");
  const addProductForm = document.getElementById("add-product-form");
  const isAdmin = localStorage.getItem("role") === "admin";

  // Mostrar/ocultar botón y formulario según el rol
  if (!isAdmin && addProductBtn) addProductBtn.style.display = "none";
  if (!isAdmin && addProductForm) addProductForm.style.display = "none";
  if (isAdmin && addProductBtn) addProductBtn.style.display = "";
  if (isAdmin && addProductForm) addProductForm.style.display = "none";

  // Mostrar formulario al hacer clic en el botón
  if (isAdmin && addProductBtn && addProductForm) {
    addProductBtn.onclick = () => {
      addProductForm.style.display = "block";
      addProductBtn.style.display = "none";
    };
  }

  // Manejar el envío del formulario
  if (isAdmin && addProductForm) {
    addProductForm.onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById("product-title").value;
      const description = document.getElementById("product-description").value;
      const date = document.getElementById("product-date").value;
      const capacity = document.getElementById("product-capacity").value;

      if (!name || !description || !date || !capacity) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const newEvent = {
        name,
        description,
        date,
        capacity: Number(capacity),
      };

      await addEvent(newEvent);
      addProductForm.reset();
      addProductForm.style.display = "none";
      addProductBtn.style.display = "";
      await renderEvents(); // Refresca la lista
    };
  }

  // renderizar eventos
  async function renderEvents() {
    const eventos = await getEvent();
    productsGrid.innerHTML = "";
    eventos.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div style="display: flex; align-items: center; width: 100%; padding: 20px; border-bottom: 1px solid #eee;">
          <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-right: 16px;">
            <img src="/src/guatape.png" alt="Imagen ilustrativa del evento ${p.name}" style="max-width: 100%; max-height: 100%; object-fit: cover; display: block;">
          </div>
          <div style="flex: 1;">
            <strong>${p.name}</strong>
          </div>
          <div style="flex: 1.5;">
            <span>${p.description}</span>
          </div>
          <div style="flex: 1;">
            <span>Fecha: ${p.date}</span>
          </div>
          <div style="flex: 1;">
            <span>Capacidad: ${p.capacity}</span>
          </div>
          <div style="flex-shrink: 0; margin-left: 12px;">
            ${
              isAdmin
                ? `
                    <button class="btn-edit" data-id="${p.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${p.id}" title="Eliminar"><i class="fas fa-trash"></i></button>
                  `
                : `
                    <button class="btn-enroll" data-id="${p.id}" title="Agendar evento">
                      <i class="fas fa-calendar-plus"></i> Schedule event
                    </button>
                  `
            }
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Eventos para los botones
    if (isAdmin) {
      productsGrid.querySelectorAll(".btn-edit").forEach((btn) => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          const event = eventos.find((e) => String(e.id) === String(id));
          if (!event) return;

          const newName = prompt("Nuevo nombre del evento:", event.name);
          const newDescription = prompt("Nueva descripción:", event.description);
          const newDate = prompt("Nueva fecha:", event.date);
          const newCapacity = prompt("Nueva capacidad:", event.capacity);

          if (!newName || !newDescription || !newDate || !newCapacity) {
            alert("Todos los campos son obligatorios");
            return;
          }

          await updateEvent(id, {
            name: newName,
            description: newDescription,
            date: newDate,
            capacity: Number(newCapacity),
          });
          await renderEvents();
        };
      });

      productsGrid.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          if (confirm("¿Seguro que quieres eliminar este evento?")) {
            await deleteEvent(id);
            await renderEvents();
          }
        };
      });
    } else {
      // Botón agendar evento para usuarios normales
      productsGrid.querySelectorAll(".btn-enroll").forEach((btn) => {
        btn.onclick = async () => {
          const eventId = btn.getAttribute("data-id");
          await handleEnrollEvent(eventId);
        };
      });
    }
  }

  // Llama a renderevents al cargar
  await renderEvents();
}

import { addEnrollment } from "./crud.js"; 

// Función para agendar un evento
async function handleEnrollEvent(enrollId) {
  const userId = localStorage.getItem("userId"); //  guardar el id del usuario al hacer login
  if (!userId) {
    alert("Debes iniciar sesión para agendar un evento.");
    return;
  }
  try {
    await addEnrollment({ userId, enrollId });
    alert("Evento agendado exitosamente!");
  } catch (error) {
    alert("Error al agendar el evento.");
  }
}
