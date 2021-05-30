const {
    addNoteHandler, 
    getAllHandler, 
    getNoteByIdHandler, 
    editNoteByIdHandler, 
    deleteNoteByIdHandler
} = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,

    // // mengaktifkan CORS pada route tertentu
    // options: {
    //     cors: {
    //         origin: ['*'],
    //     },
    // },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
