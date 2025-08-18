package com.example.expense.service;

import com.example.expense.model.Expense;
import com.example.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense createExpense(Expense expense) {
        expense.setStatus("PENDING");
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expenseDetails) {
        expenseDetails.setId(id);
        return expenseRepository.save(expenseDetails);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id).orElse(null);
    }

    public Expense updateExpenseStatus(Long id, String status, String remarks) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isEmpty()) {
            throw new RuntimeException("Expense with ID " + id + " not found");
        }

        Expense expense = optionalExpense.get();

        if (status == null || (!status.equals("APPROVED") && !status.equals("REJECTED") && !status.equals("PENDING"))) {
            throw new IllegalArgumentException("Invalid status value. Allowed: APPROVED, REJECTED, PENDING");
        }

        if (status.equals("REJECTED") && (remarks == null || remarks.trim().isEmpty())) {
            throw new IllegalArgumentException("Remarks are required when rejecting an expense.");
        }

        expense.setStatus(status);
        expense.setRemarks(remarks);

        return expenseRepository.save(expense);
    }
}
