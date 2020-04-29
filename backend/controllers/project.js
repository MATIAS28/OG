'use strict'

var Project = require('../models/project')
var fs = require('fs');
var path = require('path');

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: 'soy la home'
    });
  },

  test: function(req, res){
    return res.status(200).send({
      message: 'soy el metodo test'
    });
  },

  saveProject: function(req, res) {
    var project = new Project();
    var params = req.body;

    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((error, projectStored) => {
        if (error) return res.status(500).send({message: error});


        if (!projectStored) return res.status(404).send({message: 'no se ha podido guardar el projecto'});

        return res.status(200).send({project: projectStored});
    });

  },

  getProject: function(req, res) {
    var projectId = req.params.id;

    if (projectId == null) return res.status(404).send({message: 'El projecto no existe'})

    Project.findById(projectId, (err, project) => {
      if (err) return res.status(500).send({message: 'No se ha encontrado el projecto'});

      if (!project) return res.status(404).send({message: 'El projecto no existe'});

      return res.status(200).send({project: project});
    });
  },

  getProjects: function(req, res) {

    Project.find({}).sort('-year').exec((err, projects) => {
      if (err) return res.status(500).send({message: 'Error al devolver los datos'});

      if (!projects) return res.status(404).send({message: 'No hay projectos para mostrar'});

      return res.status(200).send({projects: projects})
    });
  },

  updateProject: function(req, res) {
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
      if (err) return res.status(500).send({message: 'Error al Actualizar'});

      if (!projectUpdated) return res.status(404).send({message: 'El Projecto no existe'});

      return res.status(200).send({project: projectUpdated});
    });

  },

  deleteProject: function(req, res){
    var projectId = req.params.id;


    Project.findByIdAndDelete(projectId, (err, projectoEliminado) => {
      if (err) return res.status(500).send({message: 'Error al Eliminar el Projecto'});

      if (!projectoEliminado) return res.status(404).send({message: 'El Projecto a Eliminar no existe'});

      return res.status(200).send({project: projectoEliminado});
    });
  },


  uploadImage: function(req, res){
    var projectId = req.params.id;
    var fileName = "imagen no subida...";

    if (req.files){
      var filePath = req.files.image.path;
      var fileSplit = filePath.split('\\');
      var fileName = fileSplit[1];
      var extSplit = fileName.split('\.');
      var fileExt = extSplit[1];

      console.log(fileExt);

      if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gift') {
        Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
          if (err) return res.status(500).send({message: 'Error al subir imagen'});

          if (!projectUpdated) return res.status(404).send({message: 'El Projecto no existe'});

          return res.status(200).send({project: projectUpdated})
        });
      }else {
        fs.unlink(filePath, (err) => {
        return res.status(500).send({message: 'Extension no valida'});
        });
      }

  }
},



  getImageFile: function(req, res) {
    var file = req.params.image;
    var path_file = './uploads/'+file;

    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      }else {
          return res.status(200).send({
            message: 'No existe el archivo'
          });
      }
    });
  }


};


module.exports = controller;
