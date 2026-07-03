<template>
  <div>
    <h2>📦 Gestión de Productos</h2>

    <div style="background:#f5f5f5;padding:20px;border-radius:8px;margin-bottom:20px;">
      <h3>Agregar Nuevo Producto</h3>
      <form @submit.prevent="agregarProducto">
        <input v-model="nombre" placeholder="Nombre" required />
        <input v-model.number="precio" placeholder="Precio" required />
        <input v-model.number="stock" placeholder="Stock" required />
        <button type="submit">➕ Agregar</button>
      </form>
    </div>

    <div>
      <h3>Lista de Productos ({{ productos.length }})</h3>
      <table border="1" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#4CAF50;color:white;">
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>${{ producto.precio }}</td>
            <td>{{ producto.stock }}</td>
            <td>${{ producto.precio * producto.stock }}</td>
          </tr>
        </tbody>
      </table>

      <div style="background:#e8f5e9;padding:15px;border-radius:8px;margin-top:20px;">
        <p><strong>💰 Valor Total del Inventario:</strong> ${{ totalInventario }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore, type Producto } from '../stores/productStore'

// Usar el store
const store = useProductStore()

// ✅ Usar storeToRefs para mantener reactividad y evitar errores de TypeScript
const { productos } = storeToRefs(store)

// 🔥 Computed local para calcular el total
const totalInventario = computed(() => {
  return productos.value.reduce((total, producto) => {
    return total + (producto.precio * producto.stock)
  }, 0)
})

// Variables del formulario
const nombre = ref('')
const precio = ref(0)
const stock = ref(0)

// Función para agregar
const agregarProducto = () => {
  if (nombre.value.trim() === '' || precio.value <= 0 || stock.value < 0) {
    alert('Completa todos los campos correctamente.')
    return
  }

  const nuevoProducto: Producto = {
    id: productos.value.length + 1,
    nombre: nombre.value,
    precio: precio.value,
    stock: stock.value,
  }

  store.agregarProducto(nuevoProducto)

  nombre.value = ''
  precio.value = 0
  stock.value = 0
}
</script>

<style scoped>
button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #45a049;
}
input {
  margin: 5px;
  padding: 8px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background: #4CAF50;
  color: white;
}
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
</style>