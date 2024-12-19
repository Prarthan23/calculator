const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('./middleware/authMiddleware');

const secretkey = 'your_secret_key_here'; // Replace this with your actual secret key
const userModel = require('./models/userModel');
const Result = require('./models/resultModel');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server Is Running");
});

app.use('/api/protected', isAuthenticated);

app.get('/api/protected/home', (req, res) => {
  res.json({ message: 'Welcome to the protected home page', user: req.user });
});

app.post("/api/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign({ email: user.email, userid: user._id }, secretkey, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });
        return res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) return res.status(400).json({ error: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid password" });
  
      const token = jwt.sign({ email: user.email, userid: user._id }, secretkey, { expiresIn: '1h' });
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
  
      return res.json({ message: "Logged in successfully", token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  
app.post('/api/logout', (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.json({ message: 'Logged out successfully' });
  });

  app.get('/api/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.userid;
        const user = await userModel.findById(userId).select('-password'); 
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
        // console.log(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.post('/api/results',isAuthenticated, async (req, res) => {
   try {
    const { calcTitle, results, inputs } = req.body;
    const userId = req.user.userid; 

    console.log(results);
    console.log(userId);

    if (!calcTitle || !results || !userId || !inputs) {
      return res.status(400).json({ error: 'Bad Request: Missing fields' });
    }

    // Create a new result entry
    const newResult = new Result({ calcTitle, results,inputs , user: userId, });
    await newResult.save();

    res.status(201).json({ message: 'Results saved successfully!', result: newResult });
  } catch (err) {
    console.error('Server error:', err); 
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/results', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userid;
    const results = await Result.find({ user: userId });
    res.json({ results });
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/results/:id', async (req, res) => {
  try {
    const resultId = req.params.id;
    await Result.findByIdAndDelete(resultId);
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete result' });
  }
});

app.post('/api/updateEmail',isAuthenticated, async (req, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user.userid;

    if (!newEmail) {
      return res.status(400).json({ error: 'Bad Request: Missing new email' });
    }

    const user = await userModel.findByIdAndUpdate(userId, { email: newEmail }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Email updated successfully!' });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/updatePassword',isAuthenticated, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userid;

    if (!newPassword) {
      return res.status(400).json({ error: 'Bad Request: Missing new password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Password updated successfully!' });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
