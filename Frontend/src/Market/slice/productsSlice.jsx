import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: null,
    products: [],
    dairy: [],
    beverages: [],
    productsCount: 0,
    resPerPage: 0,
  },
  reducers: {
    productsRequest(state) {
      state.loading = true;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.count;
      state.resPerPage = action.payload.resPerPage;
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    dairyRequest(state) {
      state.loading = true;
    },
    dairySuccess(state, action) {
      state.loading = false;
      state.dairy = action.payload.products;
    },
    dairyFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    beveragesRequest(state) {
      state.loading = true;
    },
    beveragesSuccess(state, action) {
      state.loading = false;
      state.beverages = action.payload.products;
    },
    beveragesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    riceRequest(state) {
      state.loading = true;
    },
    riceSuccess(state, action) {
      state.loading = false;
      state.rice = action.payload.products;
    },
    riceFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    foodcRequest(state) {
      state.loading = true;
    },
    foodcSuccess(state, action) {
      state.loading = false;
      state.foodc = action.payload.products;
    },
    foodcFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    householdRequest(state) {
      state.loading = true;
    },
    householdSuccess(state, action) {
      state.loading = false;
      state.household = action.payload.products;
    },
    householdFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cookingRequest(state) {
      state.loading = true;
    },
    cookingSuccess(state, action) {
      state.loading = false;
      state.cooking = action.payload.products;
    },
    cookingFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    bakeryRequest(state) {
      state.loading = true;
    },
    bakerySuccess(state, action) {
      state.loading = false;
      state.bakery = action.payload.products;
    },
    bakeryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    frozenRequest(state) {
      state.loading = true;
    },
    frozenSuccess(state, action) {
      state.loading = false;
      state.frozen = action.payload.products;
    },
    frozenFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    dryRequest(state) {
      state.loading = true;
    },
    drySuccess(state, action) {
      state.loading = false;
      state.dry = action.payload.products;
    },
    dryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    snacksRequest(state) {
      state.loading = true;
    },
    snacksSuccess(state, action) {
      state.loading = false;
      state.snacks = action.payload.products;
    },
    snacksFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    seedsRequest(state) {
      state.loading = true;
    },
    seedsSuccess(state, action) {
      state.loading = false;
      state.seeds = action.payload.products;
    },
    seedsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    spicesRequest(state) {
      state.loading = true;
    },
    spicesSuccess(state, action) {
      state.loading = false;
      state.spices = action.payload.products;
    },
    spicesFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    healthRequest(state) {
      state.loading = true;
    },
    healthSuccess(state, action) {
      state.loading = false;
      state.health = action.payload.products;
    },
    healthFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    offerRequest(state) {
      state.loading = true;
    },
    offerSuccess(state, action) {
      state.loading = false;
      state.offer = action.payload.products;
    },
    offerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    categoryRequest(state) {
      state.loading = true;
    },
    categorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload.products;
    },
    categoryFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },


    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  clearError,
  dairyFail,
  dairyRequest,
  dairySuccess,
  beveragesFail,
  beveragesRequest,
  beveragesSuccess,
  riceFail,
  riceRequest,
  riceSuccess,
  foodcFail,
  foodcRequest,
  foodcSuccess,
  householdFail,
  householdRequest,
  householdSuccess,
  cookingFail,
  cookingRequest,
  cookingSuccess,
  bakeryFail,
  bakeryRequest,
  bakerySuccess,
  frozenFail,
  frozenRequest,
  frozenSuccess,
  dryFail,
  dryRequest,
  drySuccess,
  snacksFail,
  snacksRequest,
  snacksSuccess,
  seedsFail,
  seedsRequest,
  seedsSuccess,
  spicesFail,
  spicesRequest,
  spicesSuccess,
  healthFail,
  healthRequest,
  healthSuccess,
  offerFail,
  offerRequest,
  offerSuccess,
  categoryFail,
  categoryRequest,
  categorySuccess,





} = productsSlice.actions;

export default productsSlice.reducer;
