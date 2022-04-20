# AuthPoint

## What is AuthPoint?
- AuthPoint is a web application built on OAuth 2.0. which allows clients(other website owners) to get information of users for authorization from server with the approval of resource owner(user) without sharing any credentials. 

- The Authorization Code grant type is used by clients(mostly having frontend + backend).

- Client will request for authorization code so it will direct the user to our main server for approval. When a user clicks, the backend will create authorization code, link it to that user and send it to the client through a query string.

- After that user returns to the client via the redirect URL,now the client has authorization code,which can be further used to request for an access token.
Further Client can request for user information for exchange of access tokens.

## Tech stack
Node.js
React.js
Express.js
MongoDb
Tailwind CSS

## Motive
Main motive is to implement authorization server using OAuth-2.0 standards for passwordless authentication across various web applications.

## Report
[Link](https://drive.google.com/file/d/1A1mnQ2-XqWXUbscccZKzRDg2p8enkqJd/view?usp=sharing)
