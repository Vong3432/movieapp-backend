# Movieapp-backend
This is the backend server for my SwiftUI side project. [View Movie app](https://github.com/Vong3432/MovieApp).

### Setup guide (if interested)
- Install packages
```
npm install
```

- Add environment variables to ``.env.development.local`` file locally.
```
# PORT
PORT = 3000

# TOKEN
SECRET_KEY = 
STRIPE_SECRET_KEY = 
STRIPE_PUBLISHABLE_KEY = 


# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true

```

- Run the server
```
npm run dev
```