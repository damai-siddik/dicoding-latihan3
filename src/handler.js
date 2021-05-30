const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  //masukkan nilai2 ke dala array
  notes.push(newNote);

  //cek newNote sudah masuk ke array notes
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  //tentukan response isSuccess
  if(isSuccess) {
    const response = h.response({
        status: 'success',
        message: 'note is created',
        data: {
            noteId: id,
        },
    });
    response.code(201);
    return response;
  }

//   const response = h.response({
//       status: 'fail',
//       message: 'note failed to add',
//   });
//   response.code(500);
//   return response;

  const response = h.respon({
      error: false,
      message: 'Catatan berhasil ditambahkan'
  });
  response.header('Access-Control-Allow-Origin', '*');
  return response;
};

const getAllHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (req, h) => {
    const {id} = req.params;

    const note = notes.filter((n) => n.id === id) [0];

    //memastikan note tidak bernilai undefine
    if(note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (req, h) => {
    const {id} = req.params;

    const {title, tags, body} = req.payload;
    const updatedAt = new Date().toISOString();

    //find note by id
    const index = notes.findIndex((note) => note.id === id);

    //cek data ketemu atau tidak dalam array
    if(index !== -1) {
        notes[index] = {
            ...notes[index],
            title, tags, body, updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }
    
    //jika gagal
    const response = h.response({
        status: 'fail',
        message: 'gagal diperbaharui. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (req, h) => {
    const {id} = req.params;

    const index = notes.findIndex((note) => note.id === id);

    //sek data dan hapus dengan splice
    if(index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'succes',
            message: 'catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    //jika gagal
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {
    addNoteHandler,
    getAllHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};
