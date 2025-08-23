// src/main/java/com/example/expense/service/ExpenseService.java
package com.example.expense.service;

import com.example.expense.model.Expense;
import com.example.expense.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<Expense> getExpensesByEmployee(Long employeeId) {
        return expenseRepository.findByEmployeeId(employeeId);
    }

    public Expense createExpense(Expense expense) {
        expense.setStatus("PENDING"); // Default status
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isEmpty()) {
            throw new RuntimeException("Expense with ID " + id + " not found");
        }

        Expense expense = optionalExpense.get();
        expense.setEmployeeId(expenseDetails.getEmployeeId());
        expense.setAmount(expenseDetails.getAmount());
        expense.setDescription(expenseDetails.getDescription());
        expense.setDate(expenseDetails.getDate());
        expense.setCategory(expenseDetails.getCategory());
        expense.setRemarks(expenseDetails.getRemarks());

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new RuntimeException("Expense with ID " + id + " not found");
        }
        expenseRepository.deleteById(id);
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense with ID " + id + " not found"));
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

    public String exportCsvAll() {
        List<Expense> list = expenseRepository.findAll();
        return toCsv(list);
    }

    public String exportCsvForEmployee(Long employeeId) {
        List<Expense> list = expenseRepository.findByEmployeeId(employeeId);
        return toCsv(list);
    }

    private String toCsv(List<Expense> list) {
        DateTimeFormatter fmt = DateTimeFormatter.ISO_DATE;
        String header = "ID,EmployeeID,Amount,Description,Date,Category,Status,Remarks";
        String rows = list.stream().map(e -> String.join(",",
                safe(e.getId()), safe(e.getEmployeeId()),
                safe(e.getAmount()), csvEscape(e.getDescription()),
                e.getDate() != null ? e.getDate().format(fmt) : "",
                csvEscape(e.getCategory()),
                csvEscape(e.getStatus()),
                csvEscape(e.getRemarks())
        )).collect(Collectors.joining("\n"));
        return header + "\n" + rows;
    }

    private String safe(Object o) { return o == null ? "" : o.toString(); }
    private String csvEscape(String s) {
        if (s == null) return "";
        String out = s.replace("\"", "\"\"");
        if (out.contains(",") || out.contains("\"") || out.contains("\n")) {
            return "\"" + out + "\"";
        }
        return out;
    }
}
