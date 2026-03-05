package com.Expense.Splitwise.repository;

import com.Expense.Splitwise.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}