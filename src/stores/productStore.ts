import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Producto {
    id: number
    nombre: string
    precio: number
    stock: number
}

export const useProductStore = defineStore('product', () => {
    const productos = ref<Producto[]>([
        { id: 1, nombre: 'Laptop', precio: 1200, stock: 5 },
        { id: 2, nombre: 'Mouse', precio: 25, stock: 20 },
        { id: 3, nombre: 'Teclado', precio: 45, stock: 10 }
    ])

    const valorTotalInventario = computed(() => {
        return productos.value.reduce((total, producto) => {
            return total + (producto.precio * producto.stock)
        }, 0)
    })

    function agregarProducto(nuevoProducto: Producto) {
        productos.value.push(nuevoProducto)
    }

    return {
        productos,
        valorTotalInventario,
        agregarProducto
    }
})