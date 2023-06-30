import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProduct,
  fetchAllProductByFilter,
  fetchBrands,
  fetchCategories,
  fetchCount,
  fetchProductById,
  updateProduct,
} from "./ProductApi";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct: null,
  status: "idle",
};

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByFilterAsynce = createAsyncThunk(
  "product/fetchproductsbyfilter",
  async ({ filter, sort, pagination ,admin}) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination,admin);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createProductAsynce = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsynce = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product", //chenged...
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFilterAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFilterAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
        state.selectedProduct = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(createProductAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsynce.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsynce.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;

export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const { clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
