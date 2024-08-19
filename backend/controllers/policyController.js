const db = require('../models');
const Policy = db.Policies;

const policyController = {

    createPolicy:async (req,res)=>{
        try{
        const {policyName, policyDescription} = req.body
        const policy = await Policy.create({
            policyName,
            policyDescription
        })
        res.status(201).json(policy);
        }catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: 'The policy already exists.' });
            } else {
                console.error(err);
                res.status(500).json({ error: 'There was an error during creation' });
            }
        }
    },

    getPolicy: async (req, res) => {
        try {
          const policies = await Policy.findAll();
          res.status(200).json(policies);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error fetching policies' });
        }
      },
      
      getSinglePolicy: async (req, res) => {
        try {
          const policyId = req.params.id;
          const policy = await Policy.findByPk(policyId);
    
          if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
          }
    
          res.status(200).json(policy);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error fetching the policy' });
        }
      },

      deletePolicy: async (req, res) => {
        try {
          const policyIdToDelete = req.params.id;
          const policy = await Policy.findByPk(policyIdToDelete);
      
          if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
          }
      
          await policy.destroy();
          res.status(204).json('Deletion successful');
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'There was an error during deletion' });
        }
      },
      
      updatePolicy: async (req, res) => {
        try {
          const policyIdToUpdate = req.params.id;
          const { policyName, policyDescription } = req.body;
          const policy = await Policy.findByPk(policyIdToUpdate);
      
          if (!policy) {
            return res.status(404).json({ error: 'Policy not found' });
          }
      
          if (policyName) {
            policy.policyName = policyName;
          }
      
          if (policyDescription) {
            policy.policyDescription = policyDescription;
          }
      
          await policy.save();
          res.status(200).json({ message: 'Update successful', updatedPolicy: policy });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'There was an error during update' });
        }
      }
      

}




module.exports = policyController;