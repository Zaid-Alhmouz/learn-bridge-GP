package com.learnbridge.learn_bridge_back_end.dao;

import com.learnbridge.learn_bridge_back_end.entity.User;

import java.util.List;

public interface UserDAO {
    // CRUD operations

    public void insertUser(User user);

    public void updateUser(User user);

    public void deleteUser(User user);

    public User findUserByEmail(String email);

    public List<User> findAllUsers();
}
