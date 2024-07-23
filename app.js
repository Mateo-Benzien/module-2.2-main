function filterComponent() {
  return {
      categories: [],
      products: [],
      filterItem: 'All categories',
      searchTerm: '',
      selectedSortOrder: 'default',
      selectedProduct: null,
      isModalOpen: false,
      error: null,

      init() {
          this.fetchCategories();
          this.fetchProducts();  // Fetch products on initialization
      },

      async fetchCategories() {
          try {
              const response = await fetch('https://fakestoreapi.com/products/categories');
              const data = await response.json();
              this.categories = data;
          } catch (error) {
              this.error = 'Failed to fetch categories';
          }
      },

      async fetchProducts() {
          let url = 'https://fakestoreapi.com/products';
          if (this.filterItem && this.filterItem !== 'All categories') {
              url += `/category/${this.filterItem}`;
          }
          if (this.searchTerm) {
              url += `?q=${this.searchTerm}`;
          }
          try {
              const response = await fetch(url);
              this.products = await response.json();
              this.applySorting();  // Apply sorting after fetching products
          } catch (error) {
              this.error = 'Failed to fetch products';
          }
      },

      handleFilter(category) {
          this.filterItem = category;
          this.fetchProducts();
      },

      handleSearch() {
          this.fetchProducts();
      },

      applySorting() {
          if (this.selectedSortOrder === 'default') {
              return;
          }
          this.products.sort((a, b) => {
              return this.selectedSortOrder === 'low' ? a.price - b.price : b.price - a.price;
          });
      },

      openModal(product) {
          this.selectedProduct = product;
          this.isModalOpen = true;
      },

      closeModal() {
          this.isModalOpen = false;
      },

      toggleDropdown() {
          const dropDown = document.getElementById('dropdown');
          dropDown.classList.toggle('hidden');
      }
  }
}
