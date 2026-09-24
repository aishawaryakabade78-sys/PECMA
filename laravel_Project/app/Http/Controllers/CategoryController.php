<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET ALL CATEGORIES
    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json([
            'categories' => $categories
        ]);
    }


    // ADD CATEGORY
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'status' => 'nullable|boolean',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status ?? true,
        ]);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category
        ], 201);
    }


    // GET SINGLE CATEGORY
    public function show(Category $category)
    {
        return response()->json([
            'category' => $category
        ]);
    }


    // UPDATE CATEGORY
    public function update(
        Request $request,
        Category $category
    ) {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'status' => 'nullable|boolean',
        ]);

        $category->update([
            'name' => $request->name,
            'status' => $request->status ?? $category->status,
        ]);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category
        ]);
    }


    // DELETE CATEGORY
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}