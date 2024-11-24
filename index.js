const express = require('express');
const app = express();
app.use(express.json());

let prodArr = [];
let id = 0;

app.post('/product', (req, res) => {
  try {
    const data = req.body;
    data.id = ++id;
    console.log('Received data:', data);
    prodArr.push(data);
    console.log(prodArr);

    res.status(201).json({
      message: 'Data received successfully',
      isSuccess: true,
      product: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      isSuccess: false,
      error: error.message,
    });
  }
});

app.get('/getALLproduct', (req, res) => {
  try {
    res.status(200).json({
      message: 'Data received successfully',
      isSuccess: true,
      data: prodArr,
      count: prodArr.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      isSuccess: false,
      error: error.message,
    });
  }
});

app.delete('/deletprod', (req, res) => {
  try {
    const productId = parseInt(req.query.id, 10);
    prodArr = prodArr.filter((product) => product.id !== productId);
    console.log(prodArr);

    res.status(200).json({
      isSuccess: true,
      id: req.query.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      isSuccess: false,
      error: error.message,
    });
  }
});

app.put('/updateprod', (req, res) => {
  try {
    const productId = parseInt(req.query.id, 10);
    const body = req.body;
    const productIndex = prodArr.findIndex(
      (product) => product.id === productId,
    );

    if (productIndex !== 1) {
      prodArr[productIndex] = { ...prodArr[productIndex], ...body };
      console.log(prodArr);
      res.status(200).json({
        isSuccess: true,
        updatedProd: prodArr[productIndex],
      });
    } else {
      res.status(404).json({
        isSuccess: false,
        message: 'Product not found', 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      isSuccess: false,
      error: error.message,
    });
  }
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});




