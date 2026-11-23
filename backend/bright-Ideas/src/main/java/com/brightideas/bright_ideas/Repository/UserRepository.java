package com.brightideas.bright_ideas.Repository;

import com.brightideas.bright_ideas.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>

{

    Optional<User> findByEmail(String email);

}

