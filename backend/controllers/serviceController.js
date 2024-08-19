const db = require('../models'); 
const Service = db.Service; 

const serviceController = {
    createService: async (req, res) => {
        try {
            const { serviceName, servicePrice, serviceDescription } = req.body;
            const service = await Service.create({
                serviceName,
                servicePrice,
                serviceDescription,
            });
            res.status(201).json(service);
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: 'The service is already listed.' });
            } else {
                console.error(err);
                res.status(500).json({ error: 'There was an error during creation' });
            }
        }
    },
  getServices: async (req,res)=>{
    try{
        const services = await Service.findAll();
        res.status(200).json(services);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Error fetching the services' });
    }
},

getSingleService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.findByPk(serviceId);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json(service);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching the service' });
    }
  },

deleteService: async (req, res) => {
    try {
        const serviceIdToDelete = req.params.id; 
        const service = await Service.findByPk(serviceIdToDelete);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        await service.destroy();
        res.status(204).json("Deletion Successfull"); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'There was an error during deletion' });
    }
}, 
updateService: async (req, res) => {
    try {
        const serviceIdToUpdate = req.params.id; 
        const { serviceName, servicePrice, serviceDescription } = req.body;
        const service = await Service.findByPk(serviceIdToUpdate);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        if (serviceName) {
            service.serviceName = serviceName;
        }
        if (servicePrice) {
            service.servicePrice = servicePrice;
        }
        if (serviceDescription) {
            service.serviceDescription = serviceDescription;
        }
        await service.save();
        
        res.status(200).json({ message: "Update successful", service });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'There was an error during update' });
    }
}

};



module.exports = serviceController;
