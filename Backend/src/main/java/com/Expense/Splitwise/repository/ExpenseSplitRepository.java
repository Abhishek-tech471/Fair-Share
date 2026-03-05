package com.Expense.Splitwise.repository;

import com.Expense.Splitwise.entity.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {

    @Query("SELECT COALESCE(SUM(es.shareAmount), 0) FROM ExpenseSplit es WHERE es.expense.group.id = :groupId AND es.user.id = :userId")
    Double getTotalOwedByUser(@Param("groupId") Long groupId,
                              @Param("userId") Long userId);

    List<ExpenseSplit> findByExpenseId(Long expenseId);
}