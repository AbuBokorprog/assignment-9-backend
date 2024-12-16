"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchableFields = exports.productFilterableFields = void 0;
// pick
const productFilterableFields = [
    'name',
    'category',
    'reviews',
    'productStatus',
    'minPrice',
    'maxPrice',
    'stockStatus',
    'searchTerm',
];
exports.productFilterableFields = productFilterableFields;
// searchTerm
const searchableFields = ['name', 'description'];
exports.searchableFields = searchableFields;
