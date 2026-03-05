package com.Expense.Splitwise.repository;

import com.Expense.Splitwise.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.group.id = :groupId AND e.paidBy.id = :userId")
    Double getTotalPaidByUser(@Param("groupId") Long groupId,
                              @Param("userId") Long userId);
    List<Expense> findByGroupId(Long groupId);
}