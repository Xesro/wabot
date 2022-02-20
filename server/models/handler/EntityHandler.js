// const logger = require('../../logger/logger.js')

class entityHandler{
    updateById(fields, id) {
        this.entity.update(
            fields,
            {where: {id : id}}
        )/*.catch(err => {
            logger.error("error while updating" +  this.entity)
        })*/
    }
}

module.exports = entityHandler
