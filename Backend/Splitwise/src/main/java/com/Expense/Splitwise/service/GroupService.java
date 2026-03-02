package com.Expense.Splitwise.service;

import com.Expense.Splitwise.dto.BalanceResponse;
import com.Expense.Splitwise.dto.ExpenseHistoryResponse;
import com.Expense.Splitwise.dto.GroupDetailsResponse;
import com.Expense.Splitwise.dto.SettlementResponse;
import com.Expense.Splitwise.entity.Group;
import com.Expense.Splitwise.entity.GroupMember;
import com.Expense.Splitwise.entity.User;
import com.Expense.Splitwise.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.Expense.Splitwise.entity.Expense;


import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;

    private final ExpenseRepository expenseRepository;
    private final ExpenseSplitRepository expenseSplitRepository;

    public Group createGroup(String name, Long createdByUserId) {

        User creator = userRepository.findById(createdByUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = Group.builder()
                .name(name)
                .createdBy(creator)
                .build();

        Group savedGroup = groupRepository.save(group);

        // Automatically add creator as member
        GroupMember groupMember = GroupMember.builder()
                .user(creator)
                .group(savedGroup)
                .build();

        groupMemberRepository.save(groupMember);

        return savedGroup;
    }

    public void addMember(Long groupId, Long userId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (groupMemberRepository.existsByGroupIdAndUserId(groupId, userId)) {
            throw new RuntimeException("User already a member");
        }

        GroupMember groupMember = GroupMember.builder()
                .group(group)
                .user(user)
                .build();

        groupMemberRepository.save(groupMember);
    }

    public List<BalanceResponse> getGroupBalances(Long groupId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<GroupMember> members = groupMemberRepository.findAll()
                .stream()
                .filter(gm -> gm.getGroup().getId().equals(groupId))
                .toList();

        return members.stream().map(member -> {

            Long userId = member.getUser().getId();


            Double totalPaid = expenseRepository.getTotalPaidByUser(groupId, userId);
            Double totalOwed = expenseSplitRepository.getTotalOwedByUser(groupId, userId);

            Double net = totalPaid - totalOwed;

            return BalanceResponse.builder()
                    .userId(userId)
                    .name(member.getUser().getName())
                    .netBalance(net)
                    .build();
        }).toList();
    }

    public List<SettlementResponse> getSettlements(Long groupId) {

        List<BalanceResponse> balances = getGroupBalances(groupId);

        List<SettlementResponse> settlements = new ArrayList<>();

        // Separate creditors and debtors
        List<BalanceResponse> creditors = balances.stream()
                .filter(b -> b.getNetBalance() > 0)
                .sorted((a, b) -> Double.compare(b.getNetBalance(), a.getNetBalance()))
                .toList();

        List<BalanceResponse> debtors = balances.stream()
                .filter(b -> b.getNetBalance() < 0)
                .sorted((a, b) -> Double.compare(a.getNetBalance(), b.getNetBalance()))
                .toList();

        int i = 0, j = 0;

        while (i < creditors.size() && j < debtors.size()) {

            BalanceResponse creditor = creditors.get(i);
            BalanceResponse debtor = debtors.get(j);

            double settleAmount = Math.min(
                    creditor.getNetBalance(),
                    Math.abs(debtor.getNetBalance())
            );

            settlements.add(
                    SettlementResponse.builder()
                            .fromUser(debtor.getName())
                            .toUser(creditor.getName())
                            .amount(settleAmount)
                            .build()
            );

            creditor.setNetBalance(creditor.getNetBalance() - settleAmount);
            debtor.setNetBalance(debtor.getNetBalance() + settleAmount);

            if (creditor.getNetBalance() == 0) i++;
            if (debtor.getNetBalance() == 0) j++;
        }

        return settlements;
    }
    public List<ExpenseHistoryResponse> getExpenseHistory(Long groupId) {

        // Validate group exists
        groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<Expense> expenses = expenseRepository.findByGroupId(groupId);

        return expenses.stream().map(expense -> {

            List<String> participants = expenseSplitRepository
                    .findByExpenseId(expense.getId())
                    .stream()
                    .map(split -> split.getUser().getName())
                    .toList();

            return ExpenseHistoryResponse.builder()
                    .expenseId(expense.getId())
                    .description(expense.getDescription())
                    .amount(expense.getAmount())
                    .paidBy(expense.getPaidBy().getName())
                    .createdAt(expense.getCreatedAt())
                    .participants(participants)
                    .build();
        }).toList();
    }

    public GroupDetailsResponse getGroupDetails(Long groupId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<String> members = groupMemberRepository
                .findByGroupId(groupId)
                .stream()
                .map(gm -> gm.getUser().getName())
                .toList();

        return GroupDetailsResponse.builder()
                .groupId(group.getId())
                .groupName(group.getName())
                .createdBy(group.getCreatedBy().getName())
                .members(members)
                .build();
    }
}