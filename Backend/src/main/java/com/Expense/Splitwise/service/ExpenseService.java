package com.Expense.Splitwise.service;

import com.Expense.Splitwise.entity.*;
import com.Expense.Splitwise.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseSplitRepository expenseSplitRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    public void addExpense(String description,
                           Double amount,
                           Long groupId,
                           Long paidByUserId,
                           List<Long> participantIds) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User paidBy = userRepository.findById(paidByUserId)
                .orElseThrow(() -> new RuntimeException("Payer not found"));

        // Validate participants belong to group
        for (Long userId : participantIds) {
            if (!groupMemberRepository.existsByGroupIdAndUserId(groupId, userId)) {
                throw new RuntimeException("User " + userId + " is not part of this group");
            }
        }

        Expense expense = Expense.builder()
                .description(description)
                .amount(amount)
                .group(group)
                .paidBy(paidBy)
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        // Equal split calculation
        Double splitAmount = amount / participantIds.size();

        for (Long userId : participantIds) {

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            ExpenseSplit split = ExpenseSplit.builder()
                    .expense(savedExpense)
                    .user(user)
                    .shareAmount(splitAmount)
                    .build();

            expenseSplitRepository.save(split);
        }
    }
}