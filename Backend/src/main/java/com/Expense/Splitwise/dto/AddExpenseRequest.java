package com.Expense.Splitwise.dto;

import lombok.Data;
import java.util.List;

@Data
public class AddExpenseRequest {

    private String description;
    private Double amount;
    private Long groupId;
    private Long paidByUserId;
    private List<Long> participantUserIds;
}