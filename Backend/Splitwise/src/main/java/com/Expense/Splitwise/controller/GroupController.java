package com.Expense.Splitwise.controller;

import com.Expense.Splitwise.dto.*;
import com.Expense.Splitwise.entity.Group;
import com.Expense.Splitwise.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public Group createGroup(@RequestBody CreateGroupRequest request) {
        return groupService.createGroup(
                request.getName(),
                request.getCreatedByUserId()
        );
    }

    @PostMapping("/{groupId}/members")
    public String addMember(@PathVariable Long groupId,
                            @RequestBody AddMemberRequest request) {

        groupService.addMember(groupId, request.getUserId());
        return "Member added successfully";
    }

    @GetMapping("/{groupId}/balances")
    public List<BalanceResponse> getBalances(@PathVariable Long groupId) {
        return groupService.getGroupBalances(groupId);
    }

    @GetMapping("/{groupId}/settlements")
    public List<SettlementResponse> getSettlements(@PathVariable Long groupId) {
        return groupService.getSettlements(groupId);
    }

    @GetMapping("/{groupId}/expenses")
    public List<ExpenseHistoryResponse> getExpenseHistory(@PathVariable Long groupId) {
        return groupService.getExpenseHistory(groupId);
    }

    @GetMapping("/{groupId}")
    public GroupDetailsResponse getDetails(@PathVariable Long groupId) {
        return groupService.getGroupDetails(groupId);
    }
}