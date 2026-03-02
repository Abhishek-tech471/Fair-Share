package com.Expense.Splitwise.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ExpenseHistoryResponse {

    private Long expenseId;
    private String description;
    private Double amount;
    private String paidBy;
    private LocalDateTime createdAt;
    private List<String> participants;
}