package com.Expense.Splitwise.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SettlementResponse {

    private String fromUser;
    private String toUser;
    private Double amount;
}