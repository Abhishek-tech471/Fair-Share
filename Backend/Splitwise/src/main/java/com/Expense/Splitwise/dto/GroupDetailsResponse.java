package com.Expense.Splitwise.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class GroupDetailsResponse {

    private Long groupId;
    private String groupName;
    private String createdBy;
    private List<String> members;
}