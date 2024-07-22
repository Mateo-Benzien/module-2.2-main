function filterComponent() {
    return {
      categories: [],
      filterItem: 'All categories',
      searchTerm: '',
      error: null,
  
      init() {
        this.fetchCategories();
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
  
      toggleDropdown() {
        const dropDown = document.getElementById('dropdown');
        dropDown.classList.toggle('hidden');
      },
  
      handleFilter(category) {
        this.filterItem = category;
        this.toggleDropdown();
        this.fetchProducts();
      },
  
      async fetchProducts() {
        // Fetch products based on filterItem or other criteria
        // Implement this based on your actual product fetching logic
      },
  
      handleSearch() {
        this.fetchProducts();
      }
    }
  }
  