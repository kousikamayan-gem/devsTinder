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
 - POST /request/send/:status/:userid
 - POST /request/review/:status/:requestid
## UserRouter
- GET /user/feed
- GET /user/connections
- GET /user/requests/received
