// ExpenseCategoryController.java
package com.example.expense.controller;

import com.example.expense.model.ExpenseCategory;
import com.example.expense.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/categories")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService categoryService;

    @GetMapping
    public List<ExpenseCategory> getAll() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ExpenseCategory getById(@PathVariable Long id) {
        return categoryService.getCategoryById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }

    @PostMapping
    public ExpenseCategory create(@RequestBody ExpenseCategory cat) {
        return categoryService.createCategory(cat);
    }

    @PutMapping("/{id}")
    public ExpenseCategory update(@PathVariable Long id, @RequestBody ExpenseCategory cat) {
        return categoryService.updateCategory(id, cat);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
