const express = require('express');
const app = express();
const port = 8085;
const knex = require('knex')(require('../knexfile.js').development);
const cors = require('cors')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'your-secret-key'


app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/* Main Page */

app.get('/categories', (req, res) => {
  knex('categories')
    .select('*')
    .then(home => res.status(200).json(home))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* Product Information */

app.get('/product', (req, res) => {
  knex('product')
    .select('*')
    .then(home => res.status(200).json(home))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/product', (req, res) => {
  knex('product')
    .insert(req.body)
    .returning('*')
    .then(variant => res.status(201).json(variant))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/product/:product_id', (req, res) => {
    const { product_id } = req.params;

  knex('product')
    .where({ product_id })
        .then(product => {
        if (!product) {
            return res.status(404).json({ error: 'Product not found '});
        }

        res.status(200).json(product);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.patch('/product/:product_id', (req, res) => {
  const { product_id } = req.params;

  knex('product')
  .where({ product_id })
  .update(req.body)
  .returning ('*')
  .then(product => {
    if(!product.length){
      return res.status(404).json({ error: "Product not found"});
    }
    res.status(200).json(product[0]);
  })
  .catch(err => res.status(500).json({ error: err.message }));

});

app.delete('/product/:product_id', (req, res) => {
    const { product_id } = req.params;

    knex('product')
    .where({ product_id })
    .del()
    .then(() => res.status(200).json({ message: 'Product deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/product', (req, res) => {
  knex('product')
    .insert(req.body)
    .returning('*')
    .then(variant => res.status(201).json(variant))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* Users*/

app.post('/api/auth/signup', (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  knex('users')
    .where({ email })
    .first()
    .then(existing => {
      if (existing) {
        return res.status(409).json({ error: 'An account with that email already exists.' });
      }
      return knex('users')
        .insert({ first_name, last_name, email, password })
        .returning(['user_id', 'first_name', 'last_name', 'email'])
        .then(users => {
          if (!users) return;

          const user = users[0];

          const token = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            JWT_SECRET,
            { expiresIn: '1d' }
          );

          res.status(201).json({ user, token });
        });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  knex('users')
    .where({ email })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        {
          id: user.user_id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({
        user: {
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        },
        token
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/users', (req, res) => {
  knex('users')
    .select('*')
    .then(home => res.status(200).json(home))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;

  knex('users')
    .where({ user_id })
        .then(users => {
        if (!users) {
            return res.status(404).json({ error: 'User not found '});
        }

        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.patch('/users/:user_id', (req, res) => {
  const { user_id } = req.params;

  knex('users')
  .where({ user_id })
  .update(req.body)
  .returning ('*')
  .then(user => {
    if(!user.length){
      return res.status(404).json({ error: "User not found"});
    }
    res.status(200).json(user[0]);
  })
  .catch(err => res.status(500).json({ error: err.message }));

});

app.delete('/users/:user_id', (req, res) => {
  const { user_id } = req.params;

  knex('users')
    .where({ user_id })
    .del()
    .then(count => {
      if (!count) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

/* Wishlist */

app.get('/api/wishlist', requireAuth, (req, res) => {
  knex('wishlist')
    .join('product', 'wishlist.product_id', 'product.product_id')
    .where('wishlist.user_id', req.user.id)
    .select('wishlist.wishlist_id', 'wishlist.created_at', 'product.*')
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/api/wishlist', requireAuth, (req, res) => {
  const { product_id } = req.body;

  if (!product_id)
    return res.status(400).json({ error: 'product_id is required' });

  knex('wishlist')
    .insert({ user_id: req.user.id, product_id })
    .returning('*')
    .then(item => res.status(201).json(item[0]))
    .catch(err => {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Already in wishlist' });
      }
      res.status(500).json({ error: err.message });
    });
});

app.delete('/api/wishlist/:product_id', requireAuth, (req, res) => {
  const { product_id } = req.params;

  knex('wishlist')
    .where({ user_id: req.user.id, product_id })
    .del()
    .then(count => {
      if (!count) {
        return res.status(404).json({ error: 'Item not in wishlist' });
      }
      res.status(200).json({ message: 'Removed from wishlist' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});
