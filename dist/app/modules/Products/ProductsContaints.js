"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchableFields = exports.adminFilterableFields = void 0;
// pick
const adminFilterableFields = [
    'name',
    'category',
    'reviews',
    'productStatus',
    'minPrice',
    'maxPrice',
    'stockStatus',
];
exports.adminFilterableFields = adminFilterableFields;
// searchTerm
const searchableFields = ['name', 'description', 'shop'];
exports.searchableFields = searchableFields;
