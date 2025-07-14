const apiUsers = "http://localhost:3000/users";
const apiEvents = "http://localhost:3000/events";
const apiEnrollments = "http://localhost:3000/enrollments";

// crud for users
export async function addUsers(user) {
  try {
    const res = await fetch(apiUsers, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al crear el usuario (THROW)");

    const data = await res.json();
    console.log("Usuario creado", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}
// crud for updating user information
export async function updateUser(id, updateUser) {
  try {
    const res = await fetch(`${apiUsers}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateUser)
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al actualizar el usuario (THROW)");

    const data = await res.json();
    alert("Usuario actualizado");
    console.log("Usuario actualizado", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}
// function to get user information
export async function getUser() {
  try {
    const res = await fetch(apiUsers);

    if (!res.ok)
      throw new Error("Ocurrio un error al leeer el usuario (THROW)");

    const data = await res.json();
    console.log("Usuario leido", data);
    return data;
  } catch (error) {
    alert("ocurrio un error (CATCH)", error);
    console.log("Oocurrio un error (CATCH)", error);
    return [];
  }
}
// function to delete a user

export async function deleteUser(id) {
  try {
    const res = await fetch(`${apiUsers}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok)
      throw new Error("Ocurrio un error al eliminar el usuario (THROW)");

    console.log("Usuario Eliminado");
    return true;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return false;
  }
}

// crud for events
// function to add an event
export async function addEvent(event) {
  try {
    const res = await fetch(apiEvents, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!res.ok) throw new Error("Ocurrio un error al crear el evento (THROW)");
    const data = await res.json();
    alert("evento creado correctamente");
    console.log("evento creado correctamente", data);
    return data;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}
// function to get all events
export async function getEvent() {
  try {
    const res = await fetch(apiEvents, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Ocurrio un error al leer el evento (THROW)");

    const data = await res.json();
    console.log("eventos actuales:", data);
    return data;
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}
// function to update an event  
export async function updateEvent(id, updateEvent) {
  try {
    const res = await fetch(`${apiEvents}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateEvent),
    });

    if (!res.ok)
      throw new Error(
        "Ocurrio un error inesperado al actualizar el evento (THROW)"
      );

    const data = await res.json();
    console.log("Usuario actualizado correctamente", data);
    alert("Usuario actualizado correctamente", data);
    return data;
  } catch (error) {
    alert("Ocurrio un error (CATCH)", Error);
    console.log("ocurrio un error (CATCH)", error);
    return [];
  }
}
// function to delete an event
export async function deleteEvent(id) {
  try {
    const res = await fetch(`${apiEvents}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Ocurrio un error inesperado (THROW)");
    alert("evento eliminado correctamente");
    console.log("evento eliminado correctamente");
  } catch (error) {
    console.log("ocurrio un error (CATCH)", error);
    alert("ocurrio un error (CATCH)", error);
    return [];
  }
}
// crud for enrollments
// function to add an enrollment
export async function addEnrollment(enrollId) {
  const res = await fetch(apiEnrollments, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enrollId),
  });
  return res.ok;
}