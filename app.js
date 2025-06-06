const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require("path");

const bookingRoutes = require('./routes/bookingRoutes'); // will create later

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const apiLimiter = require('./middlewares/rateLimiter');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(apiLimiter);

// Swagger Docs
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes

app.use('/api/auth', authRoutes);

app.use('/api/bookings', bookingRoutes); // example route



app.use('/api/admin', adminRoutes);

app.use('/api/users', userRoutes);

app.use('/api/upload', uploadRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.get('/', (req, res) => {
  res.send('Booking API is running');
});

module.exports = app;
