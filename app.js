function productList() {
  return {
    categories: [],
    products: [],
    filteredProducts: [],
    searchTerm: '',
    selectedCategory: '',
    sortOrder: 'asc', // Default sorting order
    isModalOpen: false,
    modalProductDetails: null,
    error: null,
    loading: true,

    init() {
      this.fetchCategories();
      this.fetchProducts();
    },

    async fetchCategories() {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        this.categories = await response.json();
      } catch (error) {
        this.error = 'Failed to fetch categories';
      }
    },

    async fetchProducts() {
      this.loading = true;
      let url = 'https://fakestoreapi.com/products';
      if (this.selectedCategory) {
        url += `/category/${this.selectedCategory}`;
      }
      if (this.searchTerm) {
        url += `?q=${this.searchTerm}`;
      }
      try {
        const response = await fetch(url);
        this.products = await response.json();
        this.applySorting();
        this.filteredProducts = [...this.products];
      } catch (error) {
        this.error = 'Failed to fetch products';
      } finally {
        this.loading = false;
      }
    },

    async fetchProductDetails(productId) {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        this.modalProductDetails = await response.json();
      } catch (error) {
        this.error = 'Failed to fetch product details';
      }
    },

    filterProductsByCategory(category) {
      this.selectedCategory = category;
      this.fetchProducts();
    },

    searchProducts() {
      this.fetchProducts();
    },

    applySorting() {
      if (this.sortOrder === 'default') {
        this.filteredProducts = [...this.products];
        return;
      }

      this.filteredProducts.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.price - b.price;
        } else if (this.sortOrder === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
    },

    sortProducts() {
      this.applySorting();
    },

    openModal(product) {
      this.fetchProductDetails(product.id);
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.modalProductDetails = null;
    },

    resetFiltersAndSorting() {
      this.searchTerm = '';
      this.selectedCategory = '';
      this.sortOrder = 'asc';
      this.fetchProducts(); // Fetch products with default settings
    },

    applySettingsAfterModal() {
      this.fetchProducts(); // Reapply current filters and sorting after modal is closed
    }
  }
}
