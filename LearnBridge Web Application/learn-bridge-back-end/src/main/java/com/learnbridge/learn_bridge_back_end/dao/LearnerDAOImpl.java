package com.learnbridge.learn_bridge_back_end.dao;

import com.learnbridge.learn_bridge_back_end.entity.Learner;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class LearnerDAOImpl implements LearnerDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void saveLearner(Learner learner) {
        entityManager.persist(learner);
    }

    @Override
    @Transactional
    public void updateLearner(Learner learner) {
        entityManager.merge(learner);
    }

    @Override
    @Transactional
    public void deleteLearner(Long learnerId) {
        Learner learner = entityManager.find(Learner.class, learnerId);
        entityManager.remove(entityManager.contains(learner) ? learner : entityManager.merge(learner));
    }

    @Override
    public Learner getLearnerById(Long learnerId) {
        return entityManager.find(Learner.class, learnerId);
    }

    @Override
    public Learner getLearnerByFullName(String firstName, String lastName) {
        String sqlStatement = "select l from Learner l where l.firstName = :firstName and l.lastName = :lastName";
        TypedQuery<Learner> query = entityManager.createQuery(sqlStatement, Learner.class);
        query.setParameter("firstName", firstName);
        query.setParameter("lastName", lastName);
        Learner learner = query.getSingleResult();
        return learner;
    }

    @Override
    public List<Learner> findAllLearners() {

        return entityManager.createQuery("from Learner", Learner.class).getResultList();
    }
}
