// ExpenseCategoryService.java
package com.example.expense.service;

import com.example.expense.model.ExpenseCategory;
import com.example.expense.repository.ExpenseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseCategoryService {

    @Autowired
    private ExpenseCategoryRepository categoryRepository;

    public List<ExpenseCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<ExpenseCategory> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public ExpenseCategory createCategory(ExpenseCategory category) {
        return categoryRepository.save(category);
    }

    public ExpenseCategory updateCategory(Long id, ExpenseCategory updatedCategory) {
        ExpenseCategory existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));

        existing.setName(updatedCategory.getName());
        existing.setDescription(updatedCategory.getDescription());
        return categoryRepository.save(existing);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
