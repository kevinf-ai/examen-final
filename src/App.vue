<template>
  <div id="app">
    <header>
      <h1>🏪 Sistema de Gestión Dinámico</h1>
    </header>
    <main>
      <ProductList />
    </main>
  </div>
</template>

<script setup lang="ts">
import ProductList from './components/ProductList.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
}
</style>