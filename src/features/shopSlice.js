import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk("categories/GetCategories", async (val) => {
    try {
        const res = await axios.get('http://localhost:4000/category')
        const data = res.data.filter(obj => obj.gender === val)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getSubcategories = createAsyncThunk("subcategories/GetSubcategories", async (val) => {
    try {
        const res = await axios.get('http://localhost:4000/subcategory')
        const data = res.data.filter(obj => obj.categoryId === val)
        return data
    } catch (error) {
        console.log(error);
    }
})

export const addCategory = createAsyncThunk("categories/addCategory", async (val) => {
    try {
        const res = await axios.post("http://localhost:4000/category", { img: val.categoryimg, gender: val.addCategoryGender, name: val.addCategoryName })
        const data = res.data
    } catch (error) {
        console.log(error);
    }
})
export const addSubcategory = createAsyncThunk("categories/addsubcategory", async (val) => {
    try {
        const res = await axios.post("http://localhost:4000/subcategory", { categoryId: val.categoryValue, name: val.addCategoryName })
        const data = res.data
    } catch (error) {
        console.log(error);
    }
})
export const getProducts = createAsyncThunk("products/GetProducts", async (val) => {
    try {
        const res = await axios.get('http://localhost:4000/products')
        const data = res.data.filter(obj => obj.subId === val)
        return data
    } catch (error) {
        console.log(error);
    }
})
export const filterProducts = createAsyncThunk("products/filterProducts", async (val) => {
    try {
        const res = await axios.get('http://localhost:4000/products')
        if (val.filterProduct === "all") {
            const data = res.data.filter(obj => obj.price >= val.filterValue[0] && obj.price <= val.filterValue[1])
            return data
        } else {
            const data = res.data.filter(obj => obj.price >= val.filterValue[0] && obj.price <= val.filterValue[1] && obj.subId === val.subcategoryValue)
            return data
        }
    } catch (error) {
        console.log(error);
    }
})
export const addProduct = createAsyncThunk("products/addProduct", async (val) => {
    try {
        const res = await axios.post('http://localhost:4000/products', { subId: val.subcategoryValue, name: val.addProductName, price: val.addProductPrice, img: val.productImg })
        const data = res.data
    }
    catch (error) {
        console.log(error)
    }
})
export const searchProduct = createAsyncThunk("products/searchProducts", async (val) => {
    try {
        const res = await axios.get('http://localhost:4000/products')
        const data = res.data.filter(obj => obj.name.toLowerCase() === val.toLowerCase())
        return data
    } catch (error) {
        console.log(error)
    }
})

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        categories: [],
        subcategories: [],
        products: [],
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(getSubcategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getSubcategories.fulfilled, (state, action) => {
                state.subcategories = action.payload
                state.loading = false
            })
            .addCase(getSubcategories.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(addCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(addSubcategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addSubcategory.fulfilled, (state, action) => {
                state.subcategories = action.payload
                state.loading = false
            })
            .addCase(addSubcategory.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(filterProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(addProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
            .addCase(searchProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "Error"
            })
    }
})

export default shopSlice.reducer