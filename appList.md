# DevsTinder API Structure

## AuthRouter
 - POST /signup
 - POST /login
 - POST /logout
## ProfileRouter
 - GET  /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password
## ConnectionRequestRouter
 - POST /request/send/interested/:userid
 - POST /request/send/ignored/:userid
 - POST /request/review/accepted/:requestid
 - POST /reject/review/rejected/:requestid
## UserRouter
- GET /user/feed
- GET /user/connections
- GET /user/requests
