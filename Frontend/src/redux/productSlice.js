import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    categories: [],
    subCategories: [],
    products: [],  // All products from the API
    filteredProducts: [],  // Search results
    currentPageProducts: [],  // Products displayed on the UI
    totalPages: 1,
    searchQuery: "",
    currentPage: 1,
    limit: 10
}

const productSlice = createSlice({
    name: "product",
    initialState: initialValue,
    reducers: {
        setCategories: (state, action) => {
            state.categories = [...action.payload]
        },
        setSubCategories: (state, action) => {
            state.subCategories = [...action.payload]
        },
        setProducts: (state, action) => {
            state.products = [...action.payload];
            state.filteredProducts = [...action.payload];  // Initially, filtered = all
            state.totalPages = Math.ceil([...action.payload].length / state.limit);
            state.currentPage = 1;
            state.currentPageProducts = [...state.filteredProducts].slice(0, state.limit); // Show first 10 products
        },
        searchProducts: (state, action) => {
            state.searchQuery = action.payload.toLowerCase();
            state.currentPage = 1; // Reset to first page on search

            // Filter products for search
            state.filteredProducts = [...state.products].filter(product =>
                product.name.toLowerCase().includes(state.searchQuery)
            );

            // Update total pages & show first 10 search results
            state.totalPages = Math.ceil([...state.filteredProducts].length / state.limit);
            state.currentPageProducts = [...state.filteredProducts].slice(0, state.limit);
        },
        setPage: (state, action) => {
            state.currentPage = action.payload;
            const startIndex = (state.currentPage - 1) * state.limit;
            state.currentPageProducts = [...state.filteredProducts].slice(startIndex, startIndex + state.limit);
        },
        addProduct: (state, action) => {
            state.products = [action.payload, ...state.products];
            state.filteredProducts = [action.payload, ...state.filteredProducts];

            // Recalculate total pages
            state.totalPages = Math.ceil([...state.filteredProducts].length / state.limit);

            // Refresh the first page products
            state.currentPage = 1;
            state.currentPageProducts = [...state.filteredProducts].slice(0, state.limit);
        },
        updateProduct: (state, action) => {
            state.products = [...state.products].map(product =>
                product._id === action.payload._id ? action.payload : product
            );
            state.filteredProducts = [...state.filteredProducts].map(product =>
                product._id === action.payload._id ? action.payload : product
            );
            state.currentPageProducts = [...state.filteredProducts].slice((state.currentPage - 1) * state.limit, state.currentPage * state.limit);
        },
        deleteProduct: (state, action) => {
            state.products = [...state.products].filter(product => product._id !== action.payload);
            state.filteredProducts = [...state.filteredProducts].filter(product => product._id !== action.payload);
            state.totalPages = Math.ceil([...state.filteredProducts].length / state.limit);
            state.currentPageProducts = [...state.filteredProducts].slice((state.currentPage - 1) * state.limit, state.currentPage * state.limit);
        }
    }
});

export const { setCategories, setSubCategories, setProducts, searchProducts, addProduct, updateProduct, deleteProduct, setPage } = productSlice.actions;
export default productSlice.reducer;