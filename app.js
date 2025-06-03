const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bookingRoutes = require('./routes/bookingRoutes'); // will create later

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Swagger Docs
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes

app.use('/api/auth', authRoutes);

app.use('/api/bookings', bookingRoutes); // example route



app.use('/api/admin', adminRoutes);



app.get('/', (req, res) => {
  res.send('Booking API is running');
});

module.exports = app;
