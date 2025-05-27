import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters",async({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    limit,
    // material,
    // brand,
},{rejectWithValue})=>{
    const query = new URLSearchParams();
    if(collection) query.append("collection",collection);
    if(size) query.append("size",size);
    if(color) query.append("color",color);
    if(gender) query.append("gender",gender);
    if(minPrice) query.append("minPrice",minPrice);
    if(maxPrice) query.append("maxPrice",maxPrice);
    if(sortBy) query.append("sortBy",sortBy);
    if(search) query.append("search",search);
    if(category) query.append("category",category);
    if(limit) query.append("limit",limit);
    // if(material) query.append("material",material);
    // if(brand) query.append("brand",brand);

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`)
    console.log(response.data)
    return response.data;
})


// async thunk to fetch a single product by id
export const fetchProductDetails = createAsyncThunk("products/productDetails",async({id})=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
    console.log(response.data);
    return response.data;
})

// fetch best seller 
export const getBestSellerProduct = createAsyncThunk("products/bestSeller",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
    return response.data;
})
// async thunk to fetch update product api
export const updateProduct = createAsyncThunk('products/updateProduct',async({id,productData})=>{
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,productData,
        {
            headers:{
                Authorization:`Bearer ${localStorage.getItem('userToken')}`
            }
        }
    )
    console.log(res.data)
    return res.data;
})

const productsSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        selectedProduct:null,// store detail of single product
        bestSellerProduct:null,
        similarProducts:[],
        loading:false,
        error:null,
        filters:{
            collection:"",
            size:"",
            color:"",
            gender:"",
            minPrice:"",
            maxPrice:"",
            sortBy:"",
            search:"",
            category:"",
            limit:"",
            // material:"",
            // brand:"",
        }
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters = {...state.filters, ...action.payload};

        },
        clearFilters:(state)=>{
            state.filters = {

            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsByFilters.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })

        .addCase(getBestSellerProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getBestSellerProduct.fulfilled,(state,action)=>{
            state.loading = false;
             state.bestSellerProduct = action.payload;
        })
        .addCase(getBestSellerProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })


        .addCase(updateProduct.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading = false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product)=>(
                product._id === updateProduct._id
            ))
            if(index !== -1) {
                state.products[index] = updateProduct;
            }
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const {setFilters, clearFilters} = productsSlice.actions;
export default productsSlice.reducer