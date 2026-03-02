package com.Expense.Splitwise.dto;

import lombok.Data;

@Data
public class CreateGroupRequest {

    private String name;
    private Long createdByUserId;
}