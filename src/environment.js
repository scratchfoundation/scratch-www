var Environment = {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    API_HOST: JSON.stringify(process.env.API_HOST || 'https://api-staging.scratch.mit.edu')
};

module.exports = Environment;
