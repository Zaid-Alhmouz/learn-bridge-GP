package com.learnbridge.learn_bridge_back_end.dao;

import com.learnbridge.learn_bridge_back_end.entity.User;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class UserDAOImp implements UserDAO {

    // define field for entity manager
    private EntityManager entityManager;


    // inject entity manager using constructor
    @Autowired
    public UserDAOImp(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void insertUser(User user) {

    }

    @Transactional
    @Override
    public void updateUser(User user) {

    }

    @Override
    public void deleteUser(User user) {

    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return List.of();
    }
}
