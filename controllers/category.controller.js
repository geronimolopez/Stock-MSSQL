const sql = require('mssql');
const CategoryService = require('../services/category.service');

module.exports = {
    
        get: async function (req, res) {
    
           return  CategoryService.get()
           .then(function(categories) {
                return res.status(200).json(categories)
            })
            .catch(function(err) {
                return res.status(400).json({error: err.message})
            });
       },
    
   create:  async (req, res) => {
    return CategoryService.create(req.body)
    .then(function(data) {
    return res.status(201).json({stock : data})
    })
    .catch(function(err) {
      console.log(err)
        return res.status(500).json({message: err})
    });
    },

    ProductosPorCategoria: async function (req, res) {
        const minimo = req.params.minimo;
        try {
          const categories = await CategoryService.ProductosPorCategoria(minimo);
          return res.status(200).json(categories);
        } catch (err) {
          console.error('Error al obtener la información:', err);
          return res.status(500).json({ error: 'Ocurrió un error al obtener la información' });
        }
      }
      
      


}
    


