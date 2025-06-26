const User = require('../models/User');

// Register User 
exports.registerUser = async (req, res) => {
    try {
        console.log('Backend: Registration request received');
        console.log('Request body:', req.body);
        
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        console.log('User registered successfully:', username);
        
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Case-insensitive username search
        const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
        console.log('User found:', user);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        const isPasswordValid = await user.matchPassword(password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};