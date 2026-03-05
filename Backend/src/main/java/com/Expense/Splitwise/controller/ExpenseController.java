package com.Expense.Splitwise.controller;

import com.Expense.Splitwise.dto.AddExpenseRequest;
import com.Expense.Splitwise.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public String addExpense(@RequestBody AddExpenseRequest request) {

        expenseService.addExpense(
                request.getDescription(),
                request.getAmount(),
                request.getGroupId(),
                request.getPaidByUserId(),
                request.getParticipantUserIds()
        );

        return "Expense added successfully";
    }
}