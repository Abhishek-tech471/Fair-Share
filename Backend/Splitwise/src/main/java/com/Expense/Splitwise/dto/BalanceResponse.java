package com.Expense.Splitwise.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BalanceResponse {

    private Long userId;
    private String name;
    private Double netBalance;


}