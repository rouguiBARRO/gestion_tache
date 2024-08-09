const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

var tasks = [];

//afficher toutes les taches
app.get('/tasks',function (req, res) {
    res.json(tasks);
});

//Créer une tache
app.post('/tasks', function (req, res) {
    var task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    tasks.push(task);
    res.status(201).json(task);
});

//Mettre à jour une tache
app.patch('/tasks/:id', function (req, res) {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        res.status(200).json(task);
    }
    else {
        res.status(404).json({message: 'Tache non trouvée! '});
    }
});

//Supprimer une tache
app.delete('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    var task = tasks.find(t => t.id === taskId);
    if (task) {
        tasks.splice(tasks.indexOf(task), 1);
        res.status(204).end();
    }
    else {
        res.status(404).json({message:'Cette tache n"existe pas dans le tableau'});
    }
});
app.listen(8086, function (){
    console.log('L"application écoute sur le port: 8086');
});