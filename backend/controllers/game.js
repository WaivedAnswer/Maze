const gamesRouter = require('express').Router()

gamesRouter.get('/', (request, response) => {
    response.json('Hello World')
})

// gameRouter.get('/:id', (request, response, next) =>ß {
//     console.log('Noting')
//     Note.findById(request.params.id)
//         .then(returnedNote => {
//             if (returnedNote) {
//                 response.json(returnedNote)
//             } else {
//                 response.status(404).end()
//             }

//         })
//         .catch(error => {
//             next(error)
//         })
// })

// gameRouter.delete('/:id', (request, response, next) => {
//     Note.findByIdAndDelete(request.params.id).then(
//         response.status(204).end()
//     ).catch(error => next(error))
// })

// gameRouter.post('/', (request, response, next) => {
//     const body = request.body

//     if (body.content === undefined) {
//         return response.status(400).json({
//             error: 'content missing'
//         })
//     }
//     const note = new Note({
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//     })

//     note.save()
//         .then(savedNote => {
//             response.json(savedNote)
//         })
//         .catch(error => next(error))
// })

// gameRouter.put('/:id', (request, response, next) => {
//     const body = request.body

//     const note = {
//         content: body.content,
//         important: body.important,
//     }

//     Note.findByIdAndUpdate(request.params.id, note, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })

module.exports = gamesRouter