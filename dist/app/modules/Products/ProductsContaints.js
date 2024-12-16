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
];
exports.productFilterableFields = productFilterableFields;
// searchTerm
const searchableFields = ['name', 'description', 'shop'];
exports.searchableFields = searchableFields;
