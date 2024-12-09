"use strict";
// pagination helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (Number(options.page) - 1) * Number(limit) || 0;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return { page, limit, sortBy, sortOrder, skip };
};
exports.paginationHelpers = { calculatePagination };
