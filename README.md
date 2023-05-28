# setup/running instructions

## Information about the project

</br>

<p>This project is build with Node.js, in the package.json you can find the minimum supported version.</p>
<p>To run this project, you will need to have npm or pnpm installed in your device.</p>
<p>The entry point of this project is index.js.</p>
<p>The code is vanilla js with JSDoc.</p>
<p>The code is structured following hexagonal architecture pattern with the following directories:</p>

<ul>
    <li>infrastructure: contains the implementation of the external dependencies from the application</li>
    <li>application: contains the core logic and business rules of the application.</li>
    <li>domain: represents the heart of the application. It encapsulates the business logic.</li>
</ul>

<br>
<p>Using hexagonal architecture in the future we can change csv file for a database. </p>

---
</br>

## install dependencies
<p>The following command will install the dependencies:</p>

```
npm i
```

## run tests
<p>The following command will run the tests</p>

```
npm run test
```

## run script
<p>The following command will run the script</p>

```
npm run start
```


# **discussion question**
### Describe how you would approach API design for a backend service to provide sitter and rank data to a client/web frontend.
1. Identify the entities: in this case, the entities will be sitters and clients.
2. Define endpoints: for example: GET: /sitters/{sitter_id}
3. Define Authentication and authorization: (Tokens, OAuth), some endpoints will require a token, for example the endpoint that will return the user logged information.
4. Error handling: use HTTP status codes with custom response to handle errors, for example return a 403 if user is trying to access a page he needs to be logged.
5. Versioning: design the API to support different clients versions (website, app ...), for example we can define endpoints with website/api/{version}/{endpoint}
6. Documentation: document all endpoints (for example with JSDOc)
7. Testing: Define testing methodology (for example with TDD)
8. Architecture (code): define how the code will be structured, for example with a hexagonal architecture (will be a good option to separate the implementation from the logic of the application)
9. Architecture (server): define servers we will need: for example, we can have 2 microservices with two databases, 
the first one will be for sitters with their ranking (this ranking will be aggregated data) and will be better for reading
the second one, will be for all the reviews (here the data will not be aggregated)
the communication between the servers will be with asynchronous events.
10. CI/CD: Define and implement CI/CD (for example with GitHub actions)
11. Data modeling: Define how the data will be stored: 
We can have one table for sitters with aggregated data.
We can have one table for clients.
Finally, can have a table with the reviews (with sitter_id and client_id as foreign keys)

# Evaluation 

### Checklist:
- [*] Have you modeled the data ingested from the CSV in a way that would support storage in a relational database?
In the domain/searchRankingAlgorithm I create 3 arrays that represent 3 tables, the sitters, the owners (clients) and the reviews.
For the sitters and owners the index (primary key for a relation database) I use the email, and for the reviews I use an auto increment.
In the table reviews, I created an auto increment instead of use sitter_id and owner_id, because one sitter can have more than one review from the same owner.
Finally, to work with this data in memory, the sitters and owners have an array (reviewsIds) with the Ids (array index) from the reviews.

- [*] Are Profile, Rating, and Search Scores computed correctly?
Yes.

- [*] Does the output file include all necessary columns, and is it in descending order based on Search Score? 
Yes.

- [*] Does the README include setup/running instructions (ideally for Mac)? 
Yes.

- [*] Does the README include your answer to the Discussion Question? 
Yes.

- [*] Have you included your CLI code, README, **and output file** in the Zip folder?
Yes.

- [*] Have you written tests to verify that your code is working as expected?
Yes.
